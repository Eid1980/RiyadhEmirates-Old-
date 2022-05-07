import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthLayoutComponent } from '@shared/components/auth-layout/auth-layout.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CoreLayoutComponent } from '@shared/components/core-layout/core-layout.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },

      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
    component: AuthLayoutComponent,
  },
  {
    path: 'profile',
    children: [
      {
        path: 'user-profile',
        component: UserProfileComponent,
      },
    ],
    component: CoreLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
