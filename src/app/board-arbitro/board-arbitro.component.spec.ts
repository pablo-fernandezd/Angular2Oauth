import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BoardArbitroComponent} from './board-arbitro.component';

describe('BoardUserComponent', () => {
  let component: BoardArbitroComponent;
  let fixture: ComponentFixture<BoardArbitroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardArbitroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardArbitroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
