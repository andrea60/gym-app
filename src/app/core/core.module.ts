import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsLayoutComponent } from './layout/tabs-layout/tabs-layout.component';
import { EmptyLayoutComponent } from './layout/empty-layout/empty-layout.component';
import { TabsNavigatorComponent } from './layout/tabs-navigator/tabs-navigator.component';
import { RouterModule } from '@angular/router';
import { routes } from './core.routing';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './data/auth/auth-guard';



@NgModule({
  declarations: [
    TabsLayoutComponent,
    EmptyLayoutComponent,
    TabsNavigatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers:[
    AuthGuard
  ]
})
export class CoreModule { }
