import { QuestionFormPreviewComponent } from './../views/questions/question-form-preview/question-form-preview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../views/home/home.component';
import { LoginComponent } from '../views/login/login.component';
import { DashboardComponent } from '../views/dashboard/dashboard.component';
import { ReportsComponent } from '../views/reports/reports.component';
import { AuthGuard } from '../guard/auth.guard';
import { RegisterComponent } from '../views/register/register.component';
import { LoggedInAuthGuard } from '../guard/loggedin.guard';
import { QuestionManagementComponent } from '../views/questions/question-management/question-management.component';
import { QuestionFormComponent } from '../views/questions/question-form/question-form.component';
import { UserManagementComponent } from '../views/user/user-management/user-management.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'questionmanagement',
        children:[
          { path: '', component: QuestionManagementComponent },
          { path: ':id/edit', component: QuestionFormComponent},
          { path: ':id/view', component: QuestionFormPreviewComponent},
          { path: 'add', component: QuestionFormComponent }
        ]
       },
      { path: 'reports', component: ReportsComponent },
      { path: 'tests', component: DashboardComponent },
      { path: 'users', component: UserManagementComponent },
    ],
    canActivate: [AuthGuard],
  },
  { path: 'assignments', loadChildren: () => import('../views/assignments/assignments.module').then(m => m.AssignmentsModule)},
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
