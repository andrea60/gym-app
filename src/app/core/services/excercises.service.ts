import { Injectable } from '@angular/core';
import { TableStore } from 'agena-store';
import { Excercise, BodyPart } from '../models/excercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExcercisesService extends TableStore<Excercise, {}>{
  byBodyPart$ = (bodyPart:BodyPart) => this.selectMany(f => f.bodyPart == bodyPart);
  all$ = this.selectAll();
  constructor() { 
    super({});
  }
}
