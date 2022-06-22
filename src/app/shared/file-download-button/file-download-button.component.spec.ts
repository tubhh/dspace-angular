import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { AuthorizationDataService } from 'src/app/core/data/feature-authorization/authorization-data.service';
import { Bitstream } from 'src/app/core/shared/bitstream.model';
import { Item } from 'src/app/core/shared/item.model';
import { TranslateLoaderMock } from '../mocks/translate-loader.mock';
import { SharedModule } from '../shared.module';

import { FileDownloadButtonComponent } from './file-download-button.component';

describe('FileDownloadButtonComponent', () => {
  let component: FileDownloadButtonComponent;
  let fixture: ComponentFixture<FileDownloadButtonComponent>;

  let authorizationService: AuthorizationDataService;

  let bitstream: Bitstream;
  let item: Item;

  function init() {
    authorizationService = jasmine.createSpyObj('authorizationService', {
      isAuthorized: jasmine.createSpy('isAuthorized')
    });
    bitstream = Object.assign(new Bitstream(), {
      uuid: 'bitstreamUuid',
      _links: {
        self: { href: 'obj-selflink' }
      }
    });
    item = Object.assign(new Item(), {
      uuid: 'itemUuid',
      _links: {
        self: { href: 'obj-selflink' }
      }
    });
  }


  beforeEach(async () => {

    init();

    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateLoaderMock
          }
        })],
      declarations: [FileDownloadButtonComponent],
      providers: [
        { provide: AuthorizationDataService, useValue: authorizationService },
      ]
    })
      .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(FileDownloadButtonComponent);
    component = fixture.componentInstance;
    component.canDownload$ = of(true);
    component.bitstreamPath$ = of({
      routerLink: 'test',
      queryParams: {}
    });
    component.bitstream = bitstream;
    component.item = item;
    component.ngOnInit();
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should show download button', () => {
    component.canDownload$ = of(true);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('[data-test="download"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-test="requestACopy"]'))).toBeFalsy();
  });

  xit('should show can request a copy button', () => {
    component.canDownload$ = of(false);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('[data-test="download"]'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('[data-test="requestACopy"]'))).toBeTruthy();
  });

});
