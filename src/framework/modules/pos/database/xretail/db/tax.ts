import * as _ from "lodash";
import {GeneralException} from "../../../core/framework/General/Exception/GeneralException";
import {DataObject} from "../../../core/framework/General/DataObject";

export class TaxDB extends DataObject {
  id: number;
  "tax_calculation_id": number;
  "tax_calculation_rate_id": number;
  "customer_tax_class_id": number;
  "tax_class_id": number;
  "tax_calculation_rule_id": number;
  "tax_country_id": string;
  "tax_region_id": number;
  "tax_postcode": string;
  "code": string;
  "rate": number;
  "zip_is_range": string;
  "zip_from": string;
  "zip_to": string;
  "priority": number;
  "position": number;
  "calculate_subtotal": string;
  "product_tax_class_id": number;
  
  static _ratesCache = {};
  private static _RATES: TaxDB[];
  
  static set RATES(value: TaxDB[]) {
    TaxDB._ratesCache = {};
    this._RATES       = value;
  }
  
  static getFields(): string {
    return "id,tax_calculation_id,tax_calculation_rate_id,customer_tax_class_id,tax_class_id,tax_calculation_rule_id,tax_country_id,tax_region_id,tax_postcode,code,rate,zip_is_range,zip_from,zipto,priority,position,calculate_subtotal,product_tax_class_id";
  }
  
  static getCode(): string {
    return 'taxes';
  }
  
  getRateAsync(customerClassId: number, productClassId: number[], countryId: string, regionId: number | string, postcode?: any): TaxDB[] {
    if (typeof  TaxDB._RATES === "undefined") {
      throw new GeneralException("Please assign data taxes to core");
    }
    
    let cacheKey: string = customerClassId + "|" + productClassId.join(",") + "|" + countryId + "|" + regionId + "|" + postcode;
    if (!TaxDB._ratesCache.hasOwnProperty(cacheKey)) {
      TaxDB._ratesCache[cacheKey] =
        _.filter(TaxDB._RATES,
                 (tax: TaxDB) => {
                   if (!regionId) {
                     regionId = 0;
                   }
                   if (!tax.tax_region_id) {
                     tax.tax_region_id = 0;
                   }
                   if (_.findIndex(productClassId, (e: number) => parseInt(e + "") === parseInt(tax.product_tax_class_id + "")) > -1
                       && parseInt(tax.customer_tax_class_id + "") === parseInt(customerClassId + "")
                       && tax.tax_country_id === countryId
                       && _.indexOf([0, parseInt(regionId + "")], parseInt(tax.tax_region_id + "")) > -1
                   ) {
                     // nothing
                   } else {
                     return false;
                   }
                   if (tax.tax_postcode === "*" || tax.tax_postcode === "" || tax.tax_postcode === null) {
                     return true;
                   } else if (postcode !== "*" && postcode !== "" && postcode !== null) {
                     let postcodeIsNumeric = _.isNumber(parseInt(postcode + ""));
                     let postcodeIsRange   = false;
                     let originalPostcode  = null;
                     let matches: any;
                     let zipFrom;
                     let zipTo;
                     matches               = postcode.match('/^(.+)-(.+)$/');
                     if (!postcodeIsNumeric && matches) {
                       if (countryId === "US" && _.isNumber(parseInt(matches[2])) && matches[2].length === 4) {
                         postcodeIsNumeric = true;
                         originalPostcode  = parseInt(postcode + "");
                         postcode          = parseInt(matches[1] + "");
                       } else {
                         postcodeIsRange = true;
                         zipFrom         = parseInt(matches[1] + "");
                         zipTo           = parseInt(matches[2] + "");
                       }
                     }
            
                     if (tax.zip_is_range === null) {
                       if (postcodeIsRange && (parseInt(tax.tax_postcode) < zipFrom || parseInt(tax.tax_postcode) > zipTo)) {
                         return false;
                       }
                       if (postcodeIsNumeric && tax.tax_postcode !== postcode) {
                         return false;
                       }
                     } else {
                       if (postcodeIsRange && (parseInt(tax.zip_from) < zipFrom || parseInt(tax.zip_to) > zipTo)) {
                         return false;
                       }
                       if (postcodeIsNumeric && (parseInt(tax.zip_from) > postcode || parseInt(tax.zip_to) < postcode)) {
                         return false;
                       }
                     }
            
                     return true;
                   } else {
                     return true;
                   }
          
                 });
      
      let _rateIds                = [];
      TaxDB._ratesCache[cacheKey] = _.filter(TaxDB._ratesCache[cacheKey], (_rate) => {
        if (_.indexOf(_rateIds, _rate['tax_calculation_rate_id']) > -1) {
          return false;
        } else {
          _rateIds.push(_rate['tax_calculation_rate_id']);
          
          return true;
        }
      });
    }
    return TaxDB._ratesCache[cacheKey];
  }
}
