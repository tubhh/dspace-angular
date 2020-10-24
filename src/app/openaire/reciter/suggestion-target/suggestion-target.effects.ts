import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';
import {
  AddTargetAction, AddUserSuggestionsAction,
  RetrieveAllTargetsAction,
  RetrieveAllTargetsErrorAction,
  SuggestionTargetActionTypes,
} from './suggestion-target.actions';

import { SuggestionTargetObject } from '../../../core/openaire/reciter-suggestions/models/suggestion-target.model';
import { PaginatedList } from '../../../core/data/paginated-list';
import { SuggestionTargetsService } from './suggestion-target.service';
import { NotificationsService } from '../../../shared/notifications/notifications.service';
import { AuthActionTypes, RetrieveAuthenticatedEpersonSuccessAction } from '../../../core/auth/auth.actions';

/**
 * Provides effect methods for the Suggestion Targets actions.
 */
@Injectable()
export class SuggestionTargetEffects {

  /**
   * Retrieve all Suggestion Targets managing pagination and errors.
   */
  @Effect() retrieveAllTarget$ = this.actions$.pipe(
    ofType(SuggestionTargetActionTypes.RETRIEVE_ALL_TARGETS),
    withLatestFrom(this.store$),
    switchMap(([action, currentState]: [RetrieveAllTargetsAction, any]) => {
      return this.suggestionTargetService.getTargets(
        action.payload.elementsPerPage,
        action.payload.currentPage
      ).pipe(
        map((targets: PaginatedList<SuggestionTargetObject>) =>
          new AddTargetAction(targets.page, targets.totalPages, targets.currentPage, targets.totalElements)
        ),
        catchError((error: Error) => {
          if (error) {
            console.error(error.message);
          }
          return observableOf(new RetrieveAllTargetsErrorAction())
        })
      )
    })
  );

  /**
   * Show a notification on error.
   */
  @Effect({ dispatch: false }) retrieveAllTargetsErrorAction$ = this.actions$.pipe(
    ofType(SuggestionTargetActionTypes.RETRIEVE_ALL_TARGETS_ERROR),
    tap(() => {
      this.notificationsService.error(null, this.translate.get('reciter.suggestion.target.error.service.retrieve'))
    })
  );

  /**
   * Show a notification on error.
   */
  @Effect() retrieveUserTargets$ = this.actions$.pipe(
    ofType(AuthActionTypes.RETRIEVE_AUTHENTICATED_EPERSON_SUCCESS),
    switchMap((action: RetrieveAuthenticatedEpersonSuccessAction) => {
      return this.suggestionTargetService.retrieveCurrentUserSuggestions(action.payload).pipe(
        map((suggestions: SuggestionTargetObject) => new AddUserSuggestionsAction(suggestions))
      )
    }));

  /**
   * Initialize the effect class variables.
   * @param {Actions} actions$
   * @param {Store<any>} store$
   * @param {TranslateService} translate
   * @param {NotificationsService} notificationsService
   * @param {SuggestionTargetsService} SuggestionTargetService
   */
  constructor(
    private actions$: Actions,
    private store$: Store<any>,
    private translate: TranslateService,
    private notificationsService: NotificationsService,
    private suggestionTargetService: SuggestionTargetsService
  ) { }
}
