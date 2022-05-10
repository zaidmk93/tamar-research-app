import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Credentials } from 'src/app/models';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-demographic',
  templateUrl: './demographic.component.html',
  styleUrls: ['./demographic.component.scss'],
})


export class DemographicComponent implements OnInit {
    
  @Input() culture: string;
  @Output() gotCreds: EventEmitter<Credentials> = new EventEmitter<
    Credentials
  >();
  childgender = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  parents = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  parentage = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  childage = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  class = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  living = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  education1 = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  profession1 = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  levelofreligiousty = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  education2 = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  profession2 = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  languages = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  economic_level = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  
  invalidchildgenderFlag = false;
  invalidparentsFlag = false;
  invalidparentageFlag = false;
  invalidchildageFlag = false;
  invalidclassFlag = false;
  invalidlivingFlag = false;
  invalideducation1Flag = false;
  invalidprofession1Flag = false;
  invalidlevelofreligioustyFlag = false;
  invalideducation2Flag = false;
  invalidlprofession2Flag = false;
  invalidlanguagesFlag = false;
  invalideconomic_levelFlag = false;
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
