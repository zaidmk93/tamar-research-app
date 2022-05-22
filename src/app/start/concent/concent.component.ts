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
  culture: string;
  creds : Credentials;
  @Output() gotCreds: EventEmitter<Credentials> = new EventEmitter<Credentials>();


constructor(
    private route: ActivatedRoute,
  ) {}

   ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
        this.culture = ['jewish', 'druze', 'christian', 'muslim'].includes(
          params.culture
        )
          ? params.culture
          : 'jewish';
      });
   }

   isJewishCulture() : boolean{
     return this.culture == 'jewish'
   }

   isArabicCulture() : boolean{
    return this.culture == 'muslim' || this.culture == 'druze'|| this.culture == 'christian'
  }

  start() {
      this.gotCreds.emit(this.creds);
   }
}

