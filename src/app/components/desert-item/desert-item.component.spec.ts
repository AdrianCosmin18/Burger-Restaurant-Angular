import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesertItemComponent } from './desert-item.component';

describe('DesertItemComponent', () => {
  let component: DesertItemComponent;
  let fixture: ComponentFixture<DesertItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesertItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesertItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
