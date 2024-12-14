import { Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HabitsListComponent } from './habits-list/habits-list.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { IndexComponent } from './index/index.component';

export const routes: Routes = [
    {
        path: 'start',
        component: StartPageComponent,
        canActivate: [LoginGuard],
    },
    {
        path: 'sign-up',
        component: RegistrationComponent,
        canActivate: [LoginGuard],
    },
    {
        path: 'sign-in',
        component: AuthenticationComponent,
        canActivate: [LoginGuard],

    },
    {
        path: 'habits',
        component: HabitsListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        component: IndexComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
