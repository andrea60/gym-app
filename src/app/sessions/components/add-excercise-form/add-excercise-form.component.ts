import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, merge, startWith, switchMap } from 'rxjs';
import { BodyPart } from 'src/app/core/models/excercise.model';
import { ExcerciseQuery } from 'src/app/core/state/excercise/excercise.query';

@Component({
  selector: 'app-add-excercise-form',
  templateUrl: './add-excercise-form.component.html',
  styleUrls: []
})
export class AddExcerciseFormComponent implements OnInit {
  searchForm = new FormGroup({
    name: new FormControl(null)
  });

  searchQuery$ = this.searchForm.valueChanges.pipe(
    filter(() => this.searchForm.valid), // only if it's valid
    debounceTime(1000), // typeahead
    distinctUntilChanged(), // avoid duplicates,
    startWith(null)
  )
    
  getExcercises$ = (bodyPart:BodyPart) => 
    this.searchQuery$.pipe(
      switchMap(q => this.excQuery.filter(bodyPart, q)))
      
  constructor(protected excQuery:ExcerciseQuery) { }

  ngOnInit(): void {
  }

}
