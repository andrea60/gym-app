import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from 'src/app/core/models/exercise.model';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: []
})
export class ExerciseCardComponent implements OnInit {

  @Input()
  exercise!:Exercise;
  
  constructor() { }

  ngOnInit(): void {
  }

}
