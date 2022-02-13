import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, merge, startWith, switchMap } from 'rxjs';
import { BodyPart } from 'src/app/core/models/excercise.model';
import { ExcercisesService } from 'src/app/core/services/excercises.service';
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
    debounceTime(1000), // typeahead
    distinctUntilChanged(), // avoid duplicates,
    startWith(null)
  )
  byBodyPart$ = (bodyPart:BodyPart) => this.excercisesSrv.selectMany(e => e.bodyPart == bodyPart);
  constructor(private excercisesSrv:ExcercisesService) { }
  onModalOpen(): void {
  }
  onModalClose(): void {
  }

  ngOnInit(): void {
  }

}
