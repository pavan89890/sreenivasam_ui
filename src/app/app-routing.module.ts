import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactsComponent } from './contacts/contacts.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { MytableComponent } from './mytable/mytable.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: '' ,component:DashboardComponent,pathMatch: 'full' , canActivate: [AuthGuard]},
  {path:"dashboard",component:DashboardComponent,pathMatch: 'full' , canActivate: [AuthGuard]},
  {path: 'login' , component: LoginComponent},
  {path: 'register' , component: RegisterComponent},
  {path: 'profile' , component: ProfileComponent},
  {path: 'contacts' , component: ContactsComponent,pathMatch: 'full' , canActivate: [AuthGuard]},
  {path: 'mytable' , component: MytableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
