import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'
import { Credentials } from 'src/app/models';

@Component({
  selector: 'app-concent-from',
  templateUrl: './concent.component.html',
  styleUrls: ['./concent.component.scss']
})
export class ConcentComponent implements OnInit {
  @Input() culture: string;
  creds : Credentials;

  @Output() gotCreds: EventEmitter<Credentials> = new EventEmitter<Credentials>();


constructor(
    private route: ActivatedRoute,
  ) {}

   ngOnInit(): void {
    
   }

   isJewishCulture() : boolean{
     return this.culture == 'Hebrew'
   }

   isArabicCulture() : boolean{
    return this.culture == 'Arabic'
  }

  start() {
      this.gotCreds.emit(this.creds);
   }
}

