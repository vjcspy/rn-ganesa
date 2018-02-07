import {List} from "immutable";
import {Injectable} from "../../../../general/app";
import {Actions} from "../../../../redux-observable/actions";
import {Store} from "../../../../redux-observable/store";
import {PosEntitiesActions} from "./entities.actions";
import {ProgressActions} from "../progress-bar/actions";
import {PosPullActions} from "./pull.actions";
import {Effect} from "../../../../redux-observable/effect";
import {RetailConfigDB} from "../../database/xretail/db/retail-config";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PosPullEffects {
    constructor(protected actions$: Actions,
                private store: Store<any>,
                private entitiesActions: PosEntitiesActions,
                protected progressBarActions: ProgressActions,
                protected posPullActions: PosPullActions) {
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
                                          let obs = [];

                                          if (pullEntitySuccess.count() === 1 && pullEntitySuccess.first() === RetailConfigDB.getCode()) {

                                          } else {
                                              obs.push(this.progressBarActions.done(true, false));
                                          }
                                          obs.push(this.posPullActions.pullEntitiesFull(false));

                                          return Observable.from(obs);
                                      } else {
                                          let pullObservable                    = [];
                                          let pullingChain: List<string>        = pullState['pullingChain'];
                                          let pullingChainStarted: List<string> = pullState['pullingChainStarted'];

                                          const totalProportionSuccess       = pullEntitySuccess.reduce((t, entityCode) => {
                                              return t + entitiesState[entityCode]['proportion'];
                                          }, 0);
                                          const totalProportionEntityPulling = pullingChain.reduce((t, entityCode) => {
                                              return t + entitiesState[entityCode]['proportion'];
                                          }, 0);
                                          pullObservable.push(this.progressBarActions.updateProgressBar((totalProportionSuccess + 0.01) / (totalProportionSuccess + totalProportionEntityPulling), false));

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
