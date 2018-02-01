import {DataObject} from "../../../core/framework/General/DataObject";

export class OutletDB extends DataObject {
  id: number;
  name: string;
  is_active: string;
  warehouse_id: string;
  registers: Object[];
  cashier_ids: string;
  enable_guest_checkout: string;
  tax_calculation_based_on: string;
  paper_receipt_template_id: string;
  street: string;
  city: string;
  country_id: string;
  region_id: string;
  postcode: string;
  telephone: string;
  
  static getFields(): string {
    return "id,name,warehouse_id,is_active,registers,cashier_ids,enable_guest_checkout,tax_calculation_based_on,paper_receipt_template_id,street,city,country_id,region_id,postcode,telephone ";
  }
  
  static getCode(): string {
    return 'outlet';
  }
  
  save(outlet: any = null): Promise<any> {
    return new Promise((resolve, reject) => {
      window['retailDB'].outlet.put(outlet === null ? this : outlet).then((result) => {
        return resolve();
      }).catch((error) => {
        return reject(error);
      });
    });
  }
  
  delete(id: number, key: string = 'id') {
    return new Promise((resolve, reject) => {
      window['retailDB'].outlet
                        .where(key).equals(id)
                        .delete()
                        .then((deleteCount) => {
                          return resolve();
                        })
                        .catch((e) => {
                          return reject(e);
                        });
    });
  }
}
