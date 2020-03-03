import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';

import {AuthService} from "./auth.service";


//////////////////////////////////
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
//////////////////////////////////

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
/////////////////////////////////////
  let service: AuthService;
/////////////////////////////////////
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  ////////////////////////////////////////////////
  beforeEach(() => {

    service = new AuthService();
    component = new SigninComponent(service, Router, NgxSpinnerService);
  });


  it('canLogin returns true when the user is authenticated', () => {
    localStorage.setItem('token', '12345');
    expect(component.signIn()).toBeTruthy();
  });
  ///////////////////////////////////////////////
/*   it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
