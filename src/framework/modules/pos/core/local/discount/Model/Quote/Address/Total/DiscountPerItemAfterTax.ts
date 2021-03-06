import * as _ from "lodash";
import {Quote} from "../../../../../../framework/quote/Model/Quote";
import {Address} from "../../../../../../framework/quote/Model/Quote/Address";
import {Total} from "../../../../../../framework/quote/Model/Quote/Address/Total";
import {Customer} from "../../../../../../framework/customer/Model/Customer";
import {CommonTaxCollector} from "../../../../../../framework/tax/Model/Sales/Total/Quote/CommonTaxCollector";
import {Store} from "../../../../../../framework/store/Model/Store";
import {DataObject} from "../../../../../../framework/General/DataObject";
import {Item} from "../../../../../../framework/quote/Model/Quote/Item";
import {DiscountPerItemHelper} from "../../../../Helper/DiscountPerItemHelper";

export class DiscountPerItemAfterTax extends CommonTaxCollector {
    protected _totalSortOrder = 66;
    protected _store: Store;
    protected discountPerItemHelper: DiscountPerItemHelper;
    private _roundingDeltas   = {};
    private _parentItemsPrice = {};

    constructor() {
        super();
        this.setCode("retail_discount_per_item");
        this._canAddAmountToAddress = true;
        this._canSetAddressAmount   = true;
    }

    collect(quote: Quote, address: Address, total: Total = null): DiscountPerItemAfterTax {
        let applyTaxAfterDiscount = quote.getSetting().getConfig('tax', 'apply_tax_after_discount');

        if (applyTaxAfterDiscount)
            return this;

        super.collect(quote, address, total);

        let customer: Customer = quote.getCustomer();
        this.getCalculator().setCustomer(customer);
        this._store = quote.getStore();

        let request = this.getCalculator()
                          .getRateRequest(address,
                                          address.getQuote().getBillingAddress(),
                                          customer.getCustomerTaxClassId(),
                                          this._store);


        let totalBaseDiscount = this._prepareDiscountForTaxAmount(address, request);

        if (totalBaseDiscount == 0 || !totalBaseDiscount) {
            return this;
        }

        let discount = this._store.convertPrice(totalBaseDiscount);
        this._addAmount(-discount);
        this._addBaseAmount(-totalBaseDiscount);
        address.setData('retail_discount_per_item', -discount);

        return this;
    }

    protected _prepareDiscountForTaxAmount(address: Address, request: DataObject): number {
        let baseTotalDiscount = 0;
        let items             = address.getItems();
        if (_.size(items) == 0)
            return 0;
        this.calParentItemsPrice(items);

        _.forEach(items, (item: Item) => {
            if (item.getParentItem())
                return true;

            request.setData('product_class_id', item.getProduct().getTaxClassId());
            let rate: number = this.getCalculator().getRate(request);

            let inclTax = item.getData('is_price_incl_tax');

            if (item.getHasChildren() && item.isChildrenCalculated()) {
                let baseItemDiscount = item.getQty() * this.getDiscountPerItemHelper().getItemDiscount(item);
                let childDiscount    = 0;
                _.forEach(item.getChildren(), (child: Item) => {
                    let inclTax          = child.getData('is_price_incl_tax');
                    let baseItemPrice    = item.getQty() *
                                           (child.getQty() * this.getDiscountPerItemHelper().getItemBaseDiscountCalculationPrice(child));
                    let itemBaseDiscount = Math.min(
                        baseItemPrice,
                        this._deltaRound(baseItemDiscount * baseItemPrice / this._parentItemsPrice[item.getData('id')], item.getData('id')));

                    if (baseItemPrice <= 0.001 || itemBaseDiscount <= 0.001)
                        return true;

                    let itemDiscount = this._store.convertPrice(itemBaseDiscount);

                    child.setData('retail_discount_per_items_base_discount', itemBaseDiscount)
                         .setData('retail_discount_per_items_discount', itemDiscount);

                    childDiscount += itemDiscount;
                    /*
                     * IMPORTANCE
                     * Vì yêu cầu là tính discount/rule/promotin của magento sau discount per item nên sẽ sửa lại giá tính discount của promotion.
                     * Set lại giá tính discount
                     */

                    let promotionPriceCalculation = this.getDiscountPerItemHelper().getItemBaseDiscountCalculationPrice(child) -
                                                    this._round(itemBaseDiscount / child.getQty());
                    if (inclTax == this.getTaxConfig().discountTax()) {
                        child.setData('discount_calculation_price', this._store.convertPrice(promotionPriceCalculation));
                        child.setData('base_discount_calculation_price', promotionPriceCalculation);
                    } else if (inclTax) {
                        let baseTaxAmountOfDiscountPerItem = this.getCalculator().calcTaxAmount(itemBaseDiscount, rate, inclTax, false);
                        let discountPerItemExclTax         = this._round((itemBaseDiscount - baseTaxAmountOfDiscountPerItem) / child.getQty());
                        promotionPriceCalculation          =
                            this.getDiscountPerItemHelper().getItemBaseDiscountCalculationPrice(child) - discountPerItemExclTax;
                        child.setData('discount_calculation_price', this._store.convertPrice(promotionPriceCalculation));
                        child.setData('base_discount_calculation_price', promotionPriceCalculation);
                    } else if (this.getTaxConfig().discountTax()) {
                        let baseTaxAmountOfDiscountPerItem = this.getCalculator().calcTaxAmount(itemBaseDiscount, rate, inclTax, false);
                        let discountPerItemInclTax         = this._round((itemBaseDiscount + baseTaxAmountOfDiscountPerItem) / child.getQty());
                        promotionPriceCalculation          =
                            this.getDiscountPerItemHelper().getItemBaseDiscountCalculationPrice(child) - discountPerItemInclTax;
                        child.setData('discount_calculation_price', this._store.convertPrice(promotionPriceCalculation));
                        child.setData('base_discount_calculation_price', promotionPriceCalculation);
                    }

                    baseTotalDiscount += itemBaseDiscount;
                });
                item.setData('retail_discount_per_items_discount', childDiscount);
            }
            else {
                let baseItemPrice    = item.getQty() * this.getDiscountPerItemHelper().getItemBaseDiscountCalculationPrice(item);
                let itemBaseDiscount = Math.min(this.getDiscountPerItemHelper().getItemDiscount(item) * item.getQty(), baseItemPrice);

                if (baseItemPrice <= 0.001 || itemBaseDiscount <= 0.001)
                    return true;

                let itemDiscount = this._store.convertPrice(itemBaseDiscount);
                item.setData('retail_discount_per_items_base_discount', itemBaseDiscount);
                item.setData('retail_discount_per_items_discount', itemDiscount);

                /*
                 * IMPORTANCE
                 * Vì yêu cầu là tính discount/rule/promotin của magento sau discount per item nên sẽ sửa lại giá tính discount của promotion.
                 * Set lại giá tính discount
                 */

                let promotionPriceCalculation = this.getDiscountPerItemHelper().getItemBaseDiscountCalculationPrice(item) -
                                                this._round(itemBaseDiscount / item.getQty());
                if (inclTax == this.getTaxConfig().discountTax()) {
                    item.setData('discount_calculation_price', this._store.convertPrice(promotionPriceCalculation));
                    item.setData('base_discount_calculation_price', promotionPriceCalculation);
                } else if (inclTax) {
                    let baseTaxAmountOfDiscountPerItem = this.getCalculator().calcTaxAmount(itemBaseDiscount, rate, inclTax, false);
                    let discountPerItemExclTax         = this._round((itemBaseDiscount - baseTaxAmountOfDiscountPerItem) / item.getQty());
                    promotionPriceCalculation          =
                        this.getDiscountPerItemHelper().getItemBaseDiscountCalculationPrice(item) - discountPerItemExclTax;
                    item.setData('discount_calculation_price', this._store.convertPrice(promotionPriceCalculation));
                    item.setData('base_discount_calculation_price', promotionPriceCalculation);
                } else if (this.getTaxConfig().discountTax()) {
                    let baseTaxAmountOfDiscountPerItem = this.getCalculator().calcTaxAmount(itemBaseDiscount, rate, inclTax, false);
                    let discountPerItemInclTax         = this._round((itemBaseDiscount + baseTaxAmountOfDiscountPerItem) / item.getQty());
                    promotionPriceCalculation          =
                        this.getDiscountPerItemHelper().getItemBaseDiscountCalculationPrice(item) - discountPerItemInclTax;
                    item.setData('discount_calculation_price', this._store.convertPrice(promotionPriceCalculation));
                    item.setData('base_discount_calculation_price', promotionPriceCalculation);
                }

                baseTotalDiscount += itemBaseDiscount;
            }
        });
        return baseTotalDiscount;
    }

    getDiscountPerItemHelper(): DiscountPerItemHelper {
        if (typeof this.discountPerItemHelper == "undefined") {
            this.discountPerItemHelper = new DiscountPerItemHelper();
        }
        return this.discountPerItemHelper;
    }

    protected _deltaRound(price: number, parentId: number, type = 'regular') {
        if (price) {
            let rate = parentId + "";
            if (!this._roundingDeltas.hasOwnProperty(type))
                this._roundingDeltas[type] = {};
            let delta                        = typeof this._roundingDeltas[type][rate] != "undefined" ? this._roundingDeltas[type][rate] : 0.000001;
            price += delta;
            this._roundingDeltas[type][rate] = price - this._round(price);
            price                            = this._round(price);
        }
        return price;
    }

    protected _round(price): number {
        return this._store.roundPrice(price);
    }

    calParentItemsPrice(items: Item[]) {
        _.forEach(items, (item: Item) => {
            if (item.getParentItem())
                return true;

            if (item.getHasChildren() && item.isChildrenCalculated()) {
                this._parentItemsPrice[item.getData('id')] = 0;
                _.forEach(item.getChildren(), (child: Item) => {
                    this._parentItemsPrice[item.getData('id')] +=
                        item.getQty() * (child.getQty() * this.getDiscountPerItemHelper().getItemBaseDiscountCalculationPrice(child));
                });
            }
        });
    }
}