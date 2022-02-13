import { Component, OnInit } from '@angular/core';
import { AddExcerciseFormComponent } from 'src/app/sessions/components/add-excercise-form/add-excercise-form.component';
import { ModalService } from 'src/app/shared/ui/modal/modal.service';

@Component({
  selector: 'app-tabs-navigator',
  templateUrl: './tabs-navigator.component.html',
  styleUrls: ['./tabs-navigator.component.scss']
})
export class TabsNavigatorComponent implements OnInit {

  constructor(private modalSrv:ModalService) { }

  ngOnInit(): void {
  }
  addExercise(){
    this.modalSrv.openModal('Prova modal', AddExcerciseFormComponent)
  }
}
