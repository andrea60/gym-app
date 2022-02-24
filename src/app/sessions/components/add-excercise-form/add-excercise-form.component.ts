import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest, debounceTime, distinctUntilChanged, filter, iif, map, merge, startWith, switchMap, take } from 'rxjs';
import { BodyArea } from 'src/app/core/models/body-area.model';
import { ExercisesService } from 'src/app/core/services/exercises.service';
import { ModalContent } from 'src/app/shared/ui/modal/modal-content.interface';

@Component({
  selector: 'app-add-excercise-form',
  templateUrl: './add-excercise-form.component.html',
  styleUrls: []
})
export class AddExcerciseFormComponent implements OnInit, ModalContent {

  searchForm = new FormGroup({
    name: new FormControl(null)
  });

  searchQuery$ = this.searchForm.valueChanges.pipe(
    filter(() => this.searchForm.valid), // only if it's valid
    map(form => form.name as string),
    debounceTime(1000), // typeahead
    distinctUntilChanged(), // avoid duplicates,
    startWith('')
  )
  isSearching$ = this.searchQuery$.pipe(map(s => !!s));

  exercises$ = combineLatest([this.isSearching$, this.searchQuery$]).pipe(
    switchMap(([search, query]) =>  { 
      if (search) 
        return this.excercisesSrv.byName$(query);
      else 
        return this.excercisesSrv.favourites$;
    }),
    
  )



  constructor(private excercisesSrv:ExercisesService) { }
  onModalOpen(): void {
    this.excercisesSrv.load();
  }
  onModalClose(): void {
  }

  ngOnInit(): void {
  }

}
