import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragableFileComponent } from './dragable-file.component';

describe('DragableFileComponent', () => {
  let component: DragableFileComponent;
  let fixture: ComponentFixture<DragableFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragableFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragableFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
