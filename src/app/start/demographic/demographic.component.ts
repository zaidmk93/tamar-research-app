import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-demographic',
  templateUrl: './demographic.component.html',
  styleUrls: ['./demographic.component.scss'],
})
export class DemographicComponent implements OnInit {
    culture: string;
//   @Output() gotCreds: EventEmitter<Credentials> = new EventEmitter<
//     Credentials
//   >();
//   schoolID = new FormControl('', [
//     Validators.required,
//     Validators.pattern('[0-9]*'),
//   ]);
//   childID = new FormControl('', [
//     Validators.required,
//     Validators.pattern('[0-9]*'),
//   ]);
//   creds: Credentials = {
//     schoolID: '',
//     childID: 'a',
//     gender: 'M',
//   };
//   invalidSchoolIDFlag = false;
//   invalidChildIDFlag = false;

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
}

//   start(): Credentials | void {
//     if (!!this.schoolID.errors || this.schoolID.value === 0) {
//       this.invalidSchoolIDFlag = true;
//     } else if (!!this.childID.errors || this.childID.value === 0) {
//       this.invalidSchoolIDFlag = false;
//       this.invalidChildIDFlag = true;
//     } else {
//       this.creds.schoolID = this.schoolID.value;
//       this.creds.childID = this.childID.value;
//       this.invalidSchoolIDFlag = false;
//       this.invalidChildIDFlag = false;
//       this.gotCreds.emit(this.creds);
//     }
//   }
// }
