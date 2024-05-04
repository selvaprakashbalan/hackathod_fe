import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';

const routes: Routes = [
  { path: '', 
    component: LoginComponent 
  },
  { path: 'menu', 
  component: MenuBarComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
