import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesertPageComponent } from './desert-page.component';

describe('DesertPageComponent', () => {
  let component: DesertPageComponent;
  let fixture: ComponentFixture<DesertPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesertPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesertPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
