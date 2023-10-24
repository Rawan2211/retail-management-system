import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './pages/customers/customers/customers.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClient, HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigService } from './core/services/config.service';
import { TokenInterceptorService } from './core/auth/login-interceptor.service';
import { LoginComponent } from './pages/auth/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table'
import { AuthService } from './core/auth/auth.service';



export function configServiceFactory(
  config: ConfigService
): () => Promise<boolean> {
  return (): Promise<boolean> => config.load();
}
@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    HttpClientModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
    ],
  providers: [
    AuthService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigService],
      multi: true,

    }
    ,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
