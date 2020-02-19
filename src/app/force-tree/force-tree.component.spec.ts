import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ForceTreeComponent } from './force-tree.component';
import { IterableDiffers } from '@angular/core';
import { ExpectedConditions } from 'protractor';

describe('ForceTreeComponent', () => {
  let component: ForceTreeComponent;
  let fixture: ComponentFixture<ForceTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForceTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders div for d3', () => {
    expect(fixture.nativeElement.querySelector('div')).toBeTruthy();
  })
});
