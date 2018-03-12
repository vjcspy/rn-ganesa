import {posEntitiesStateFactory, PosEntitiesStateRecord} from "./entities.state";
import {PosEntitiesActions} from "./entities.actions";
import {List} from "immutable";
import {ProductDB} from "../../database/xretail/db/product";
import {EntityRecord} from "./entities.model";
import * as _ from "lodash";
import {mergeSliceReducers} from "../../../../redux/reducer";
import {AccountActions} from "../../../account/R/actions";

const entitiesMainReducer = (state: PosEntitiesStateRecord, action: any) => {
    switch (action.type) {

        case  PosEntitiesActions.ACTION_GET_ENTITY_DATA_FROM_DB:
            const data       = action.payload['data'];
            const entityCode = action.payload['entityCode'];
            let mergeData    = {};
            if (!!data['pageSize']) {
                mergeData['pageSize'] = data['pageSize'];
            }
            if (!!data['currentPage']) {
                mergeData['currentPage'] = data['currentPage'];
            }
            if (!!data['isFinished']) {
                mergeData['isFinished'] = data['isFinished'];
            }

            let listItems = List.of();
            listItems     = listItems.push(...data['items']);
            return state.setIn([entityCode, 'items'],
                // Have one case, Order has been place and pushed to entities and DB, then user go to order list-> pull from DB ->
                // duplicate because include order has been pushed before
                listItems)
                        .setIn([entityCode, 'isLoadedFromDB'], true)
                        .setIn([entityCode, 'additionData'], data['additionData'])
                        .mergeIn([entityCode], mergeData);

        case PosEntitiesActions.ACTION_PULL_ENTITY_PAGE_SUCCESS:
            return state.updateIn([action.payload['entityCode'], 'currentPage'], (currentPage) => ++currentPage)
                        .updateIn([action.payload['entityCode'], 'additionData'],
                            (additionData) => Object.assign({}, {...additionData}, action.payload['additionData']))
                        .updateIn([action.payload['entityCode'], 'items'],
                            (list) => list.push(..._.map(action.payload.items, (p) => (new ProductDB()).addData(p))));

        case PosEntitiesActions.ACTION_FILTERED_PRODUCTS:
            return state.setIn([ProductDB.getCode(), 'itemFiltered'], action.payload['productsFiltered']);

        case PosEntitiesActions.ACTION_PULL_ENTITY_NEXT_PAGE:
            return state.setIn([action.payload['entityCode'], 'query'], action.payload['query']);

        case PosEntitiesActions.ACTION_ENTITY_IN_DB_NOT_VALID:
        case PosEntitiesActions.ACTION_DELETE_ENTITY:
            return state.update(action.payload['entityCode'], (entity: EntityRecord) => {
                return entity.set('items', List.of())
                             .set('currentPage', 0)
                             .set('isLoadedFromDB', false)
                             .set('isFinished', false);
            });

        case AccountActions.ACTION_LOGOUT:
            // Not need beacause we are support pull again when data not valid, thought this code improve ux
            return posEntitiesStateFactory();

        case PosEntitiesActions.ACTION_PULL_ENTITY_SUCCESS:
            return state.setIn([action.payload['entityCode'], 'isFinished'], true);

        default:
            return state;
    }
};

export const entitiesReducer = mergeSliceReducers(posEntitiesStateFactory(), entitiesMainReducer/*, orderCountReducer, realtimeReducer, entityReducer*/);
