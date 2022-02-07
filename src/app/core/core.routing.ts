import { Route } from "@angular/router";
import { AuthGuard } from "./data/auth/auth-guard";
import { EmptyLayoutComponent } from "./layout/empty-layout/empty-layout.component";
import { TabsLayoutComponent } from "./layout/tabs-layout/tabs-layout.component";

const routes:Route[] = [
    { 
        path:'', 
        component:TabsLayoutComponent, 
        canActivate: [AuthGuard],
        children:[
            { path:'sessions', loadChildren:() => import('../sessions/sessions.module').then(m => m.SessionsModule)},
            { path:'', pathMatch:'full', redirectTo:'sessions'}
        ]
    }, 
    {
        path:'',
        component:EmptyLayoutComponent,
        children:[
            { path:'ext', loadChildren:() => import('../external/external.module').then(m => m.ExternalModule) }
        ]
    }
]

export {
    routes
}