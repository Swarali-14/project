import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingLeaves } from './pending-leaves';

describe('PendingLeaves', () => {
  let component: PendingLeaves;
  let fixture: ComponentFixture<PendingLeaves>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingLeaves]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingLeaves);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
