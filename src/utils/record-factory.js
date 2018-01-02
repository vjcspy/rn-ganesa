import {Record} from "immutable";

export function makeRecordFactory(value: Object) {
  let record = Record(value);
  
  return new record(value);
}
