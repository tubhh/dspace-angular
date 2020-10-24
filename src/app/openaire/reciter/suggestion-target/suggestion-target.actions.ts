import { Action } from '@ngrx/store';
import { type } from '../../../shared/ngrx/type';
import { SuggestionTargetObject } from '../../../core/openaire/reciter-suggestions/models/suggestion-target.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const SuggestionTargetActionTypes = {
  ADD_TARGETS: type('dspace/integration/suggestion/target/ADD_TARGETS'),
  RETRIEVE_ALL_TARGETS: type('dspace/integration/suggestion/target/RETRIEVE_ALL_TARGETS'),
  RETRIEVE_ALL_TARGETS_ERROR: type('dspace/integration/suggestion/target/RETRIEVE_ALL_TARGETS_ERROR'),
  ADD_USER_SUGGESTIONS: type('dspace/integration/suggestion/target/ADD_USER_SUGGESTIONS'),
  MARK_USER_SUGGESTIONS_AS_VISITED: type('dspace/integration/suggestion/target/MARK_USER_SUGGESTIONS_AS_VISITED')
}

/* tslint:disable:max-classes-per-file */

/**
 * An ngrx action to retrieve all the Suggestion Targets.
 */
export class RetrieveAllTargetsAction implements Action {
  type = SuggestionTargetActionTypes.RETRIEVE_ALL_TARGETS;
  payload: {
    elementsPerPage: number;
    currentPage: number;
  };

  /**
   * Create a new RetrieveAllTargetsAction.
   *
   * @param elementsPerPage
   *    the number of targets per page
   * @param currentPage
   *    The page number to retrieve
   */
  constructor(elementsPerPage: number, currentPage: number) {
    this.payload = {
      elementsPerPage,
      currentPage
    };
  }
}

/**
 * An ngrx action for retrieving 'all Suggestion Targets' error.
 */
export class RetrieveAllTargetsErrorAction implements Action {
  type = SuggestionTargetActionTypes.RETRIEVE_ALL_TARGETS_ERROR;
}

/**
 * An ngrx action to load the Suggestion Target  objects.
 */
export class AddTargetAction implements Action {
  type = SuggestionTargetActionTypes.ADD_TARGETS;
  payload: {
    targets: SuggestionTargetObject[];
    totalPages: number;
    currentPage: number;
    totalElements: number;
  };

  /**
   * Create a new AddTargetAction.
   *
   * @param targets
   *    the list of targets
   * @param totalPages
   *    the total available pages of targets
   * @param currentPage
   *    the current page
   * @param totalElements
   *    the total available Suggestion Targets
   */
  constructor(targets: SuggestionTargetObject[], totalPages: number, currentPage: number, totalElements: number) {
    this.payload = {
      targets,
      totalPages,
      currentPage,
      totalElements
    };
  }

}

/**
 * An ngrx action to load the user Suggestion Target object.
 * Called by the ??? effect.
 */
export class AddUserSuggestionsAction implements Action {
  type = SuggestionTargetActionTypes.ADD_USER_SUGGESTIONS;
  payload: {
    suggestions: SuggestionTargetObject;
  };

  /**
   * Create a new AddUserSuggestionsAction.
   *
   * @param suggestions
   *    the user suggestions target
   */
  constructor(suggestions: SuggestionTargetObject) {
    this.payload = { suggestions };
  }

}
/**
 * An ngrx action to Mark User Suggestions As Visited.
 * Called by the ??? effect.
 */
export class MarkUserSuggestionsAsVisitedAction implements Action {
  type = SuggestionTargetActionTypes.MARK_USER_SUGGESTIONS_AS_VISITED;
}

/* tslint:enable:max-classes-per-file */

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types.
 */
export type SuggestionTargetActions
  = AddTargetAction
  | AddUserSuggestionsAction
  | MarkUserSuggestionsAsVisitedAction
  | RetrieveAllTargetsAction
  | RetrieveAllTargetsErrorAction;
