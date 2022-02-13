import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { from } from 'rxjs/internal/observable/from';
import { DbService } from 'src/app/core/data/db/db.service';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-sessions-list-page',
  templateUrl: './sessions-list-page.component.html',
  styleUrls: []
})
export class SessionsListPageComponent implements OnInit {

  constructor(private sessionService:SessionService) { 
    
  }

  ngOnInit(): void {
  }

}
