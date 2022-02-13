import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, AfterViewInit, QueryList, Type, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, Observable, shareReplay, switchMap, take, tap } from 'rxjs';
import { OpenModalArgs } from '../modal-change.model';
import { ModalContentDirective } from '../modal-content.directive';
import { ModalContent } from '../modal-content.interface';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal-renderer',
  templateUrl: './modal-renderer.component.html',
  styleUrls: []
})
@UntilDestroy()
export class ModalRendererComponent implements OnInit, AfterViewInit {

  @ViewChildren(ModalContentDirective)
  contentContainers!:QueryList<ModalContentDirective>;
  viewContainer$!: Observable<ViewContainerRef | undefined>;

  change$ = this.modalSrv.change$.pipe(shareReplay(1));

  open$ = this.change$.pipe(map(c => c.operation == 'open'));

  args$ = this.change$.pipe(
    filter(c => c.operation == 'open'),
    map(c => c.args as OpenModalArgs<any>))

  constructor(private modalSrv:ModalService) { }

  ngAfterViewInit(): void {
    // create an obs that emits when the viewContainer change (after rendering *ngIf)
    this.viewContainer$ = this.contentContainers.changes.pipe(
      untilDestroyed(this),
      map((v:QueryList<ModalContentDirective>) => v),
      map(query => query.length == 1 ? query.get(0)?.viewContainerRef : undefined),
      // must be replayed so if someone subscribes after it has emitted it still can get the last value
      shareReplay(1)
    );
  }

  ngOnInit(): void {
    // subscribe to the change in the rendering arguments
    this.args$.pipe(
      untilDestroyed(this),
      // fetch the viewcontainer
      switchMap(
        () => this.viewContainer$.pipe(filter(v => v != undefined), take(1)), // only when it's ready
        (args, viewContainer) => ({args,viewContainer}))
    ).subscribe(({args, viewContainer}) => {
      // when both arguments and viewContainers are ready, perform the render
      this.openWithComponent(args.component, args.inputs, viewContainer!);
    })
  }


  openWithComponent(component:Type<ModalContent>, inputs:any, viewContainerRef:ViewContainerRef){
    const instance:ModalContent = this.render(component, viewContainerRef);
    
    for(let prop in inputs)
      instance[prop as keyof ModalContent] = inputs[prop];

    instance.onModalOpen();
  }
  render(component:Type<ModalContent>, viewContainerRef:ViewContainerRef){
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(component);

    return componentRef.instance;
  }

  cancel(){
    this.modalSrv.closeActiveModal({
      data:null,
      reason:'cancel'
    })
  }

}
