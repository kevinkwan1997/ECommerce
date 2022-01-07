import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';


describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let title: string;
  let subtitle: string;
  let statement: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    title = "Mock E-Commerce App";
    subtitle = "Using Angular + FakeStoreAPI + Angular Material";
    statement = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut voluptate quibusdam vero beatae itaque praesentium soluta aperiam vel ab maiores labore quia nulla debitis commodi perferendis expedita, asperiores excepturi alias."
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    expect(component.title).toEqual(title);
    expect(component.subtitle).toEqual(subtitle);
    expect(component.statement).toEqual(statement);
  })
});
