import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { CustomersComponent } from './pages/customers/customers/customers.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'customer',component:CustomersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
