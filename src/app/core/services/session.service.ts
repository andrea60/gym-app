import { Injectable } from '@angular/core';
import { TableStore } from 'agena-store';
import { WorkoutSession } from '../models/workout-session.model';
import { Set } from '../models/set.model';
import { getUUID } from 'src/app/shared/utils/get-uuid';
import { from, map, of, switchMap } from 'rxjs';

interface SessionState {
  currentSessionId:string | null;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService extends TableStore<WorkoutSession, SessionState> {

  activeSession$ = this.select(s => s.custom.currentSessionId).pipe(
    switchMap(id => id ? this.selectOne(id) : of(null))
  );
  hasActiveSession$ = this.activeSession$.pipe(map(s => !!s));

  constructor() { 
    super({
      currentSessionId:null
    })
  }

  protected get currentSession(){
    return this.value.custom.currentSessionId ? this.getEntity(this.value.custom.currentSessionId) : null;
  }

  getSessions$() {
    this.selectAll();
  }

  startNewSession(){
    if (this.currentSession)
      return;
    const uuid = getUUID();
    this.insertOne({
      _id: uuid,
      begin: new Date(),
      end: null,
      comment: '',
      excercises: []
    });
    
    this.update({ custom: { currentSessionId: uuid }});
  }

  closeCurrentSession(){
    if (!this.currentSession)
      return;

    // set end date to now
    this.updateOne(this.currentSession._id, session => {
      session.end = new Date();
    });
    // clear current session ID
    this.update(s => {
      s.custom.currentSessionId = null;
    })
  }
  addSet(set:Set, sessionId?:string){
    // determine the final ID
    let id:string;
    if (sessionId) 
      id = sessionId;
    else if (this.value.custom.currentSessionId)
      id = this.value.custom.currentSessionId;
    else 
      return; // no valid session to perform action

    // update the store
    this.updateOne(id, sess => {
      sess.excercises.push(set);
    });
    
  }

  removeSet(setId:string, sessionId?:string){
    let id:string;
    if (sessionId)
      id = sessionId;
    else if (this.value.custom.currentSessionId)
      id = this.value.custom.currentSessionId;
    else 
      return; // no valid session to perform action

    // update the store
    this.updateOne(id, e => {
      e.excercises = e.excercises.filter(set => set.id != setId);
    })
  }

  

  
  
}
