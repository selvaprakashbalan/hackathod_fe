import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { PmoHomeComponent } from './pmo-home/pmo-home.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';

const routes: Routes = [
  { path: '', 
    component: LoginComponent 
  },
  { path: 'menu', 
  component: MenuBarComponent 
  },
  {
    path: 'pmo',
    component: PmoHomeComponent
  },
  {
    path: 'employee',
    component: EmployeeHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
