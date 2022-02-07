import { Injectable } from '@angular/core';
import * as Realm from 'realm-web'
import { environment } from 'src/environments/environment';
import { Excercise } from '../../models/excercise.model';
import { Session } from '../../models/session.model';
import { Set } from '../../models/set.model';
import { WorkoutPlan } from '../../models/workout-plan.model';
declare type MongoDBCollection<T extends {_id:string}>  = globalThis.Realm.Services.MongoDB.MongoDBCollection<T>;
@Injectable({
  providedIn: 'root'
})
export class DbService {
  readonly app:Realm.App;
  private readonly db:globalThis.Realm.Services.MongoDBDatabase;
  // Data collections: 
  readonly excercises:MongoDBCollection<Excercise>;
  readonly sessions:MongoDBCollection<Session>;
  readonly workoutPlans:MongoDBCollection<WorkoutPlan>
  
  constructor() { 
    this.app = new Realm.App({ id: environment.realmAppId });
    const db = this.app.currentUser?.mongoClient("mongodb-atlas").db("gym-app")
    if (!db)
      throw "Realm Database not found";
    this.db = db;
    this.excercises = db.collection<Excercise>("excercises");
    this.sessions = db.collection<Session>("sessions");
    this.workoutPlans = db.collection<WorkoutPlan>("workout_plans");
    
      
  }
}
