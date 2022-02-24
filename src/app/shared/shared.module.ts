import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { CardHeaderDirective } from './components/card/card-header.directive';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FormControlComponent } from './components/form-control/form-control.component';
import { ModalRendererComponent } from './ui/modal/modal-renderer/modal-renderer.component';
import { ModalContentDirective } from './ui/modal/modal-content.directive';
import { ExerciseCardComponent } from './components/exercise-card/exercise-card.component';

@NgModule({
  declarations: [
    CardComponent,
    CardHeaderDirective,
    FormControlComponent,
    ModalRendererComponent,
    ModalContentDirective,
    ExerciseCardComponent
  ],
  imports: [
    FontAwesomeModule,
    CommonModule
  ],
  exports:[
    CardComponent,
    FontAwesomeModule,
    FormControlComponent,
    ModalRendererComponent,
    ExerciseCardComponent
  ]
})
export class SharedModule { 
  constructor(library:FaIconLibrary){
    library.addIconPacks(fas, far)
  }
}
