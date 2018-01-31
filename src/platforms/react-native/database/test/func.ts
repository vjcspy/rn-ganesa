import {DB} from "../index";
import * as _ from "lodash";

export function insertCar(numberOfDummy = 1) {
    DB.run((realm) => {
        realm.write(() => {
            for (let i = 0; i < numberOfDummy; i++) {
                realm.create('Car', {
                    model: Math.random().toString(36).substring(7),
                    miles: parseInt(Math.random() * 100 + '')
                });
            }
        });

        realm.close();
    });
}

export function countCar() {
    DB.run((realm) => {
        console.log(realm.objects('Car').length);
        realm.close();
    });
}