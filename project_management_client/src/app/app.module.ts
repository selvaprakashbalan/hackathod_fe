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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuBarComponent,
    PmoHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
