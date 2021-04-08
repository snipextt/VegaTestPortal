import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../views/home/home.component';
import { LoginComponent } from '../views/login/login.component';
import { DashboardComponent } from '../views/dashboard/dashboard.component';
import { ReportsComponent } from '../views/reports/reports.component';
import { AuthGuard } from '../guard/auth.guard';
import { LoggedInAuthGuard } from '../guard/loggedin.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInAuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'tests', component: DashboardComponent },
      { path: 'users', component: DashboardComponent },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
