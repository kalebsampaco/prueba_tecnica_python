import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'cliente'},
    //{path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'home'},
    // Auth routes for guests

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },

    // Landing routes
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component  : LayoutComponent,
        data: {
            layout: 'dense'
        },
        children   : [
            {path: 'cliente', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
            {path: 'producto', loadChildren: () => import('app/modules/landing/comunidad/comunidad.module').then(m => m.ComunidadModule)},
            {path: 'venta', loadChildren: () => import('app/modules/landing/estudiando/estudiando.module').then(m => m.LandingEstudiandoModule)},
            {path: 'childs', loadChildren: () => import('app/modules/landing/childs/childs.module').then(m => m.ChildsModule)},
            {path: 'blogs', loadChildren: () => import('app/modules/landing/historial/historial.module').then(m => m.LandingHistorialModule)},
            {path: 'espiritual', loadChildren: () => import('app/modules/landing/historial/historial.module').then(m => m.LandingHistorialModule)},
            {path: 'soporte', loadChildren: () => import('app/modules/landing/historial/historial.module').then(m => m.LandingHistorialModule)},
            {path: 'consejeria', loadChildren: () => import('app/modules/landing/consejeria/consejeria.module').then(m => m.ConsejeriaModule)},
        ]
    },

    // Admin routes
    {
        path       : '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component  : LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            {path: 'landing', loadChildren: () => import('app/modules/page-landing/index/index.module').then(m => m.IndexModule)},
        ]
    }
];
