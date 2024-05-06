import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { PmoHomeComponent } from './pmo-home/pmo-home.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, POSITION, SPINNER } from 'ngx-ui-loader';

const ngsUiLoader: NgxUiLoaderConfig = {
  fgsColor: '#800080',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 50,
  blur: 0,
  fgsType: SPINNER.threeStrings,
  hasProgressBar: false,
  overlayColor: "rgba(40,40,40,0.12)",
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuBarComponent,
    PmoHomeComponent,
    EmployeeHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngsUiLoader),
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    })
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
