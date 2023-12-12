import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SeccionesComponent} from './secciones.component';

describe('BoardAdminComponent', () => {
  let component: SeccionesComponent;
  let fixture: ComponentFixture<SeccionesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
