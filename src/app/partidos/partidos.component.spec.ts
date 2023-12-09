import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {Input } from '@angular/core'; // First, import Input

import {PartidosComponent} from './partidos.component';

describe('BoardAdminComponent', () => {
  let component: PartidosComponent;
  let fixture: ComponentFixture<PartidosComponent>;
  // tslint:disable-next-line:label-position
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PartidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
