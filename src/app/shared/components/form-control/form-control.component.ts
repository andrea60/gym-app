import { AfterContentInit, AfterViewInit, Component, ContentChild, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormControlName } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { map, Observable, startWith } from 'rxjs';
import { EventObservable } from '../../utils/event-observable';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: []
})
export class FormControlComponent implements AfterContentInit {
  @Input()
  label:string = '';
  @Input()
  icon:IconName | null = null;
  @Input()
  class:string = '';


  // Content projected
  @ContentChild(FormControlName, { static:true })
  formControl!: AbstractControl;

  error$ = new Observable<boolean>();
  disabled$ = new Observable<boolean>();
  constructor() {
  }

  ngAfterContentInit(): void {
    if (this.formControl) {
      // intercept form control status
      this.error$ = this.formControl.statusChanges.pipe(
        map(status => status == 'INVALID')
      );

      this.disabled$ = this.formControl.statusChanges.pipe(
        startWith(this.formControl.disabled),
        map(status => status == 'DISABLED') 
      )

    }
  }

}
