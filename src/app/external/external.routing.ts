import { Route } from "@angular/router";
import { LoginPageComponent } from "./pages/login-page/login-page.component";

const routes:Route[] = [
    { path:'login', component: LoginPageComponent, pathMatch:'full' },
    { path:'', pathMatch:'full', redirectTo:'login'}
]

export {
    routes
}