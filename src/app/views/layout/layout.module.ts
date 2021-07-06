import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { VegaMaterialModule } from 'src/app/core/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    ChangePasswordComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    VegaMaterialModule,
    SharedModule
  ],
  exports : [

  ]
})
export class LayoutModule { }
