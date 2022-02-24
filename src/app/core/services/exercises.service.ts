import { Injectable } from '@angular/core';
import { AgenaStore, TableStore } from 'agena-store';
import { BodyArea } from '../models/body-area.model';
import { Exercise } from '../models/exercise.model';
import * as data from '../data/db/exercise.json';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
@AgenaStore({ idKey:'_id' })
export class ExercisesService extends TableStore<Exercise, {}>{
  byBodyPart$ = (bodyArea:BodyArea) => this.selectMany(f => f.bodyArea == bodyArea);
  all$ = this.selectAll();
  byName$ = (name:string) => this.selectMany(e => e.name.toUpperCase().indexOf(name.toUpperCase()) >= 0);
  favourites$ = this.all$.pipe(map(items => items.slice(0,15)));

  constructor() { 
    super({});
    // @ts-ignore
    const exercises = data.default as Exercise[];
    this.removeAll();
    this.insertMany(exercises);
  }

  load(){
    // do nothing for now since all data is locally stored
    
  }
}
