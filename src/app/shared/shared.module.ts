import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { CardHeaderDirective } from './components/card/card-header.directive';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FormControlComponent } from './components/form-control/form-control.component';



@NgModule({
  declarations: [
    CardComponent,
    CardHeaderDirective,
    FormControlComponent
  ],
  imports: [
    FontAwesomeModule,
    CommonModule
  ],
  exports:[
    CardComponent,
    FontAwesomeModule,
    FormControlComponent
  ]
})
export class SharedModule { 
  constructor(library:FaIconLibrary){
    library.addIconPacks(fas, far)
  }
}
