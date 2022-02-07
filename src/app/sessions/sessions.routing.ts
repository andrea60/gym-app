import { Route } from "@angular/router";
import { AddExcerciseFormComponent } from "./components/add-excercise-form/add-excercise-form.component";
import { SessionsListPageComponent } from "./components/sessions-list-page/sessions-list-page.component";


const routes:Route[] = [
    { path:'', component: SessionsListPageComponent },
    { path: 'add', component:AddExcerciseFormComponent },
]

export {
    routes
}