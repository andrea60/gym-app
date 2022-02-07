import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { share } from 'rxjs';
import { EventObservable } from '../../utils/event-observable';
import { CardHeaderDirective } from './card-header.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: []
})
export class CardComponent implements AfterViewInit {

  @Input()
  highlight:boolean = false;
  @Input()
  class:string = '';
  
  @ViewChild(CardHeaderDirective)
  headerComponent!: CardHeaderDirective;

  hasHeader$ = new EventObservable<boolean>();

  constructor() { }

  ngAfterViewInit(): void {
    // the same old strange fix to avoid ngExpressionHasBeenChangedAfterInit (or something) error
    setTimeout(() => this.hasHeader$.emit(this.headerComponent != null), 0);
  }

}
