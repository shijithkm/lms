import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { FirebaseService } from './services/firebase.service';

import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { environment } from '../../environments/environment';
import { GoogleLoginProvider, LoginOpt } from 'angularx-social-login';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalService } from './services/global.service';

const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
};

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('429626650320-e436b3o4q1sr9a5nvs5ocv3ve9thfrfh.apps.googleusercontent.com')
  }

]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [],
  imports: [
    // CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    SocialLoginModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  exports: [
    // CommonModule,
    AngularFireDatabaseModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    FirebaseService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    GlobalService
  ]
})
export class SharedModule { }
