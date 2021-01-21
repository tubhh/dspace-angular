import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { getMockRequestService } from '../../shared/mocks/request.service.mock';
import { NotificationsService } from '../../shared/notifications/notifications.service';
import { ObjectCacheService } from '../cache/object-cache.service';
import { RestResponse } from '../cache/response.models';
import { CoreState } from '../core.reducers';
import { ExternalSourceEntry } from '../shared/external-source-entry.model';
import { HALEndpointService } from '../shared/hal-endpoint.service';
import { WorkspaceitemDataService } from './workspaceitem-data.service';
import { PostRequest, RestRequest } from '../data/request.models';
import { RequestEntry } from '../data/request.reducer';
import { RequestService } from '../data/request.service';

describe('WorkspaceitemDataService', () => {
  let service: WorkspaceitemDataService;
  const requestService = Object.assign(getMockRequestService(), {
    generateRequestId(): string {
      return scopeID;
    },
    configure(request: RestRequest) {
      // Do nothing
    },
    getByHref(requestHref: string) {
      const responseCacheEntry = new RequestEntry();
      responseCacheEntry.response = new RestResponse(true, 200, 'OK');
      return observableOf(responseCacheEntry);
    },
    removeByHrefSubstring(href: string) {
      // Do nothing
    }
  }) as RequestService;
  const rdbService = jasmine.createSpyObj('rdbService', {
    toRemoteDataObservable: observableOf({})
  });

  const store = {} as Store<CoreState>;
  const objectCache = {} as ObjectCacheService;
  const halEndpointService = {
    getEndpoint(linkPath: string): Observable<string> {
      return cold('a', { a: itemEndpoint });
    }
  } as HALEndpointService;

  const scopeID = '4af28e99-6a9c-4036-a199-e1b587046d39';

  const notificationsService = {} as NotificationsService;
  const http = {} as HttpClient;
  const comparator = {} as any;
  const itemEndpoint = 'https://rest.api/core/items';

  function initTestService() {
    return new WorkspaceitemDataService(
      comparator,
      halEndpointService,
      http,
      notificationsService,
      requestService,
      rdbService,
      objectCache,
      store,
    );
  }

  describe('importExternalSourceEntry', () => {
    let result;

    const externalSourceEntry = Object.assign(new ExternalSourceEntry(), {
      display: 'John, Doe',
      value: 'John, Doe',
      _links: { self: { href: 'http://test-rest.com/server/api/integration/externalSources/orcidV2/entryValues/0000-0003-4851-8004' } }
    });

    beforeEach(() => {
      service = initTestService();
      spyOn(requestService, 'configure');
      result = service.importExternalSourceEntry(externalSourceEntry._links.self.href, 'collection-id');
    });

    it('should configure a POST request', () => {
      result.subscribe(() => expect(requestService.configure).toHaveBeenCalledWith(jasmine.any(PostRequest)));
    });
  });

});
