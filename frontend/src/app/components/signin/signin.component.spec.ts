import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SigninComponent } from "./signin.component";
import { AuthService } from "../../services/auth.service";

import { Router } from "@angular/router";
import { NgxSpinnerService, NgxSpinnerModule } from "ngx-spinner";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "src/app/app-routing.module";

/* Mock service */
class MockAuthService extends AuthService {
  authenticated = false;

  isAuthenticated() {
    return this.authenticated;
  }
}

describe("SigninComponent", () => {
  /* ASSERT */
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let service: MockAuthService;
  let router: Router;
  let http: HttpClient;
  let spinner: NgxSpinnerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SigninComponent],
      imports: [
        NgxSpinnerModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule
      ],
      providers: [MockAuthService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    service = new MockAuthService(http, router);
    component = new SigninComponent(service, router, spinner);
  });

  afterEach(() => {
    service = null;
    spinner = null;
    component = null;
    router = null;
    http = null;
  });

  /* ACT */

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  /* 
  it("canLogin returns true when the user is authenticated", () => {
    service.authenticated = true;
    expect(component.signIn()).toBeTruthy();
  });
   */
});
