import {PosEntitiesActions} from "./entities.actions";
import {List} from "immutable";
import {RetailConfigDB} from "../../database/xretail/db/retail-config";
import {Observable} from "rxjs/Observable";
import {PosPullActions} from "./pull.actions";
import {Injectable} from "../../../../general/app";
import {Actions} from "../../../../redux-observable/actions";
import {Store} from "../../../../redux-observable/store";
import {Effect} from "../../../../redux-observable/effect";

@Injectable()
export class PosPullEffects {
    constructor(protected actions$: Actions, private store: Store<any>, private entitiesActions: PosEntitiesActions) {
    }

    @Effect() pullEntities$ = this.actions$
                                  .ofType(
                                      PosPullActions.ACTION_PULL_ENTITIES,
                                      // Repeat after each entity pull successful
                                      PosEntitiesActions.ACTION_PULL_ENTITY_SUCCESS
                                  )
                                  .withLatestFrom(this.store.select('pull'))
                                  .withLatestFrom(this.store.select('entities'),
                                      ([action, pullState], entitiesState) => [action, pullState, entitiesState])
                                  .filter(([action, pullState]) => {
                                      return pullState['isPullingChain'] === true || pullState['pullingChain'].count() > 0;
                                  })
                                  .switchMap(([action, pullState, entitiesState]) => {
                                      const pullEntitySuccess: List<string> = pullState['pullingChainSuccess'];
                                      if (pullState['pullingChain'].count() === 0) {
                                          if (pullEntitySuccess.count() === 1 && pullEntitySuccess.first() === RetailConfigDB.getCode()) {

                                          } else {
                                              // this.progressBar.done(true);
                                          }

                                          return Observable.of({type: PosPullActions.ACTION_PULL_ENTITIES_FULL});
                                      } else {
                                          let pullingChain: List<string>        = pullState['pullingChain'];
                                          let pullingChainStarted: List<string> = pullState['pullingChainStarted'];

                                          const totalProportionSuccess       = pullEntitySuccess.reduce((t, entityCode) => {
                                              return t + entitiesState[entityCode]['proportion'];
                                          }, 0);
                                          const totalProportionEntityPulling = pullingChain.reduce((t, entityCode) => {
                                              return t + entitiesState[entityCode]['proportion'];
                                          }, 0);
                                          // this.progressBar.set(totalProportionSuccess * 100 / (totalProportionSuccess +
                                          // totalProportionEntityPulling));

                                          let pullObservable         = [];
                                          let hasResolveRetailConfig = false;
                                          pullingChain.forEach((entity) => {
                                              if (pullingChainStarted.indexOf(entity) === -1) {
                                                  if (entity === RetailConfigDB.getCode()) {
                                                      hasResolveRetailConfig = true;

                                                      return false;
                                                  } else {
                                                      pullObservable.push(this.entitiesActions.pullEntityDataFromServer(entity, false));
                                                  }
                                              }
                                          });

                                          if (!hasResolveRetailConfig) {
                                              return Observable.from(pullObservable);
                                          } else {
                                              return Observable.of(this.entitiesActions.pullEntityDataFromServer(RetailConfigDB.getCode(), false));
                                          }
                                      }
                                  });
}
