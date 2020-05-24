import {ChangeDetectorRef, Component, DebugElement, EventEmitter, NO_ERRORS_SCHEMA} from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Store } from '@ngrx/store';
import { of as observableOf } from 'rxjs';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { HALEndpointService } from '../../core/shared/hal-endpoint.service';
import { AuthServiceStub } from '../../shared/testing/auth-service.stub';
import { AuthService } from '../../core/auth/auth.service';
import { HALEndpointServiceStub } from '../../shared/testing/hal-endpoint-service.stub';
import { createTestComponent } from '../../shared/testing/utils.test';
import { MyDSpaceNewSubmissionComponent } from './my-dspace-new-submission.component';
import { AppState } from '../../app.reducer';
import { NotificationsService } from '../../shared/notifications/notifications.service';
import { NotificationsServiceStub } from '../../shared/testing/notifications-service.stub';
import { SharedModule } from '../../shared/shared.module';
import { getMockScrollToService } from '../../shared/mocks/scroll-to-service.mock';
import { UploaderService } from '../../shared/uploader/uploader.service';
import { By } from '@angular/platform-browser';
import { EntityTypeService } from '../../core/data/entity-type.service';
import { RemoteData } from '../../core/data/remote-data';
import { PaginatedList } from '../../core/data/paginated-list';
import { ItemType } from '../../core/shared/item-relationships/item-type.model';
import { PageInfo } from '../../core/shared/page-info.model';
import { ResourceType } from '../../core/shared/resource-type';
import { of } from 'rxjs/internal/observable/of';

const authToken = 'fake-auth-token';
const authServiceStub = Object.assign(new AuthServiceStub(), {
  buildAuthHeader: () => authToken
});

describe('MyDSpaceNewSubmissionComponent test', () => {

  const translateService = {
    get: () => of('test-message'),
    instant: () => of('test-message'),
    onLangChange: new EventEmitter(),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter()
  };
  const store: Store<AppState> = jasmine.createSpyObj('store', {
    /* tslint:disable:no-empty */
    dispatch: {},
    /* tslint:enable:no-empty */
    pipe: observableOf(true)
  });
  describe('', () => {
    let testComp: TestComponent;
    let testFixture: ComponentFixture<TestComponent>;

    // synchronous beforeEach
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          SharedModule,
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useClass: translateService
            }
          })
        ],
        declarations: [
          MyDSpaceNewSubmissionComponent,
          TestComponent
        ],
        providers: [
          { provide: AuthService, useValue: authServiceStub },
          { provide: HALEndpointService, useValue: new HALEndpointServiceStub('workspaceitems') },
          { provide: NotificationsService, useValue: new NotificationsServiceStub() },
          { provide: ScrollToService, useValue: getMockScrollToService() },
          { provide: EntityTypeService, useValue: getMockEmptyEntityTypeService()},
          { provide: Store, useValue: store },

          { provide: TranslateService, useValue: translateService },
          ChangeDetectorRef,
          MyDSpaceNewSubmissionComponent,
          UploaderService
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      const html = `
        <ds-my-dspace-new-submission (uploadEnd)="reload($event)"></ds-my-dspace-new-submission>`;

      testFixture = createTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;
      testComp = testFixture.componentInstance;
    });

    afterEach(() => {
      testFixture.destroy();
    });

    it('should create MyDSpaceNewSubmissionComponent', inject([MyDSpaceNewSubmissionComponent], (app: MyDSpaceNewSubmissionComponent) => {

      expect(app).toBeDefined();

    }));
  });

  describe('', () => {
    let submissionComponent: MyDSpaceNewSubmissionComponent;
    let submissionComponentFixture: ComponentFixture<MyDSpaceNewSubmissionComponent>;

    // synchronous beforeEach
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          SharedModule,
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useClass: translateService
            }
          })
        ],
        declarations: [
          MyDSpaceNewSubmissionComponent
        ],
        providers: [
          { provide: AuthService, useValue: authServiceStub },
          { provide: HALEndpointService, useValue: new HALEndpointServiceStub('workspaceitems') },
          { provide: NotificationsService, useValue: new NotificationsServiceStub() },
          { provide: ScrollToService, useValue: getMockScrollToService() },
          { provide: Store, useValue: store },
          { provide: EntityTypeService, useValue: getMockEmptyEntityTypeService()},
          { provide: TranslateService, useValue: translateService },
          ChangeDetectorRef,
          MyDSpaceNewSubmissionComponent,
          UploaderService
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
      submissionComponentFixture = TestBed.createComponent(MyDSpaceNewSubmissionComponent);
      submissionComponent = submissionComponentFixture.componentInstance;
      submissionComponentFixture.detectChanges();
    });

    afterEach(() => {
      submissionComponentFixture.destroy();
    });

    it('should be a single button', inject([MyDSpaceNewSubmissionComponent], (app: MyDSpaceNewSubmissionComponent) => {
      submissionComponentFixture.detectChanges();
      const addDivElement: DebugElement = submissionComponentFixture.debugElement.query(By.css('.add'));
      const addDiv = addDivElement.nativeElement;
      expect(addDiv.innerHTML).toBeDefined();
      const buttonElement: DebugElement = addDivElement.query(By.css('.btn'))
      const button = buttonElement.nativeElement;
      expect(button.innerHTML).toBeDefined();
      const dropdownElement: DebugElement = submissionComponentFixture.debugElement.query(By.css('.dropdown-menu'));
      expect(dropdownElement).toBeNull()
    }));
  });

  describe('', () => {
    let submissionComponent: MyDSpaceNewSubmissionComponent;
    let submissionComponentFixture: ComponentFixture<MyDSpaceNewSubmissionComponent>;

    // synchronous beforeEach
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          SharedModule,
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useClass: translateService
            }
          })
        ],
        declarations: [
          MyDSpaceNewSubmissionComponent
        ],
        providers: [
          { provide: AuthService, useValue: authServiceStub },
          { provide: HALEndpointService, useValue: new HALEndpointServiceStub('workspaceitems') },
          { provide: NotificationsService, useValue: new NotificationsServiceStub() },
          { provide: ScrollToService, useValue: getMockScrollToService() },
          { provide: Store, useValue: store },
          { provide: EntityTypeService, useValue: getMockEntityTypeService()},
          { provide: TranslateService, useValue: translateService },
          ChangeDetectorRef,
          MyDSpaceNewSubmissionComponent,
          UploaderService
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
      submissionComponentFixture = TestBed.createComponent(MyDSpaceNewSubmissionComponent);
      submissionComponent = submissionComponentFixture.componentInstance;
      submissionComponentFixture.detectChanges();
    });

    afterEach(() => {
      submissionComponentFixture.destroy();
    });

    it('should be a dropdown button', inject([MyDSpaceNewSubmissionComponent], (app: MyDSpaceNewSubmissionComponent) => {
      const dropdownElement: DebugElement = submissionComponentFixture.debugElement.query(By.css('.dropdown-menu'));
      const dropdown = dropdownElement.nativeElement;
      submissionComponentFixture.detectChanges();
      expect(dropdown.innerHTML).toBeDefined();
      const dropdownMenuItems: DebugElement[] = dropdownElement.queryAll(By.css('.dropdown-item'));
      expect(dropdownMenuItems.length).toEqual(3);
      expect(dropdownMenuItems[0].nativeElement.innerHTML).toContain('Publication');
      expect(dropdownMenuItems[1].nativeElement.innerHTML).toContain('Journal');
      expect(dropdownMenuItems[2].nativeElement.innerHTML).toContain('DataPackage');
    }));
  });
});

export function getMockEntityTypeService(): EntityTypeService {
  const pageInfo = {elementsPerPage: 20, totalElements: 4, totalPages: 1, currentPage: 0} as PageInfo;
  const type1: ItemType = {
    id: '1',
    label: 'Publication',
    uuid: '1',
    type: new ResourceType('entitytype'),
    _links: undefined
  };
  const type2: ItemType = {
    id: '2',
    label: 'Journal',
    uuid: '2',
    type: new ResourceType('entitytype'),
    _links: undefined
  };
  const type3: ItemType = {
    id: '2',
    label: 'DataPackage',
    uuid: '2',
    type: new ResourceType('entitytype'),
    _links: undefined
  };
  const ret = new RemoteData();
  ret.payload = new PaginatedList(pageInfo, [type1, type2, type3]);
  return jasmine.createSpyObj('entityTypeService', {
    getAllAuthorizedRelationshipType: observableOf(ret)
  });
}

export function getMockEmptyEntityTypeService(): EntityTypeService {
  const pageInfo = {elementsPerPage: 20, totalElements: 4, totalPages: 1, currentPage: 0} as PageInfo;
  const type1: ItemType = {
    id: '1',
    label: 'Publication',
    uuid: '1',
    type: new ResourceType('entitytype'),
    _links: undefined
  };
  const ret = new RemoteData();
  ret.payload = new PaginatedList(pageInfo, [type1]);
  return jasmine.createSpyObj('entityTypeService', {
    getAllAuthorizedRelationshipType: observableOf(ret)
  });
}
// declare a test component
@Component({
  selector: 'ds-test-cmp',
  template: ``
})
class TestComponent {

  reload = (event) => {
    return;
  }
}
