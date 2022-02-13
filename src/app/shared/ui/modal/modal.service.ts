import { Injectable, Type } from '@angular/core';
import { filter, map, Subject, take } from 'rxjs';
import { CloseModalArgs, ModalChangeEvent, ModalConfig, OpenModalArgs } from './modal-change.model';
import { ModalContent } from './modal-content.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  /** Default settings */
  defaultModalOptions:ModalConfig = Object.freeze({
    closeOnBackdrop:true,
    position:'bottom'
  });

  private _change = new Subject<ModalChangeEvent<any>>();
  change$ = this._change.asObservable();


  constructor() { }

  openModal<T extends ModalContent>(title:string, component:Type<T>, inputs?:Partial<T>, config:Partial<ModalConfig> = {}){
    
    let actualConfig = { ...this.defaultModalOptions, ...config };

    this._change.next({
      operation:'open',
      args:{
        component,
        inputs: inputs ?? {},
        title,
        ...actualConfig
      }
    });

    return this.change$.pipe(
      take(1),
      filter(change => change.operation == 'close'),
      map(change => change.args as CloseModalArgs),
      map(args => (args.reason, args.data))
    )
  }
  closeActiveModal(result:CloseModalArgs){
    this._change.next({operation:'close', args: result });
  }


  
}


