import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'about',
        component: AboutComponent
    }
];

export const appRoutes = RouterModule.forRoot(routes);