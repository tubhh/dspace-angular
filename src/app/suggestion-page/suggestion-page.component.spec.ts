import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionPageComponent } from './suggestion-page.component';
import { OpenaireModule } from '../openaire/openaire.module';

describe('SuggestionPageComponent', () => {
  let component: SuggestionPageComponent;
  let fixture: ComponentFixture<SuggestionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        OpenaireModule
      ],
      declarations: [ SuggestionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
