import {Record} from "immutable";

export function makeRecordFactory(value) {
  let record = Record(value);
  
  return new record(value);
}
