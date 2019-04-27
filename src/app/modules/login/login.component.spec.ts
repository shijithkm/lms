import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'angularx-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider, LoginOpt } from 'angularx-social-login';

// https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
const fbLoginOptions: LoginOpt = {
  scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
  return_scopes: true,
  enable_profile_selector: true
};

// https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig
const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
};


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('429626650320-e436b3o4q1sr9a5nvs5ocv3ve9thfrfh.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('561602290896109')
  },
  {
    id: LinkedInLoginProvider.PROVIDER_ID,
    provider: new LinkedInLoginProvider('78iqy5cu2e1fgr')
  }
]);

export function provideConfig() {
  return config;
}



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        AuthService,
        {
          provide: AuthServiceConfig,
          useFactory: provideConfig
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
