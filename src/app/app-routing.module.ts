import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { AuthGuardRole } from './core/guards/authGuardRole.guard';

const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },

    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard, AuthGuardRole]
    },
    {
        path: '',
        loadChildren: () => import('./pointeuse-app/pointeuse-app.module').then(m => m.PointeuseAppModule),
        canActivate: [AuthGuard, AuthGuardRole]
    },
    {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
