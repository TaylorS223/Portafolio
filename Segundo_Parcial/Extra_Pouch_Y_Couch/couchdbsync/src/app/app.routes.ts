import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';

export const routes: Routes = [
  {
    // localhost:4200/user
    path: 'user', component: UserComponent
  }
];
