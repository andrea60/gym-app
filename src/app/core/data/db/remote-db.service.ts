import { Injectable } from '@angular/core';
import * as Realm from 'realm-web'
import { environment } from 'src/environments/environment';
import { Exercise } from '../../models/exercise.model';
import { WorkoutSession } from '../../models/workout-session.model';
import { Set } from '../../models/set.model';
import { WorkoutPlan } from '../../models/workout-plan.model';
declare type MongoDBCollection<T extends {_id:string}>  = globalThis.Realm.Services.MongoDB.MongoDBCollection<T>;
@Injectable({
  providedIn: 'root'
})
export class RemoteDbService {
  readonly app:Realm.App;
  private db?:globalThis.Realm.Services.MongoDBDatabase;
  // Data collections: 
  sessions?:MongoDBCollection<WorkoutSession>;
  workoutPlans?:MongoDBCollection<WorkoutPlan>
  
  constructor() { 
    this.app = new Realm.App({ id: environment.realmAppId });
    
    
      
  }

  initialize(){
    const db = this.app.currentUser?.mongoClient("mongodb-atlas").db("gym-app")
    this.db = db;
    this.sessions = db?.collection<WorkoutSession>("sessions");
    this.workoutPlans = db?.collection<WorkoutPlan>("workout_plans");
  }
}
