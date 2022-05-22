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
  @Output() gotCreds: EventEmitter<Credentials> = new EventEmitter<Credentials>();

  parentage = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  childage = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  classs = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  living = new FormControl('', [
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
  profession2 = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
    economic_level = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);

  creds: Credentials = {
    schoolID: '',
    childID: 'a',
    gender: 'M',
    childgender: '',
    parents: '',
    parentage: '',
    childage: '',
    classs: '',
    living: '',
    education1: '',
    profession1: '',
    levelofreligiousty: '',
    education2: '',
    profession2: '',
    languages: '',
    economic_level: '',
    lab: 'Aysheh',
    applanguages1: '',
    applanguages2: '',
    attention1: '',
    attention2: '',
    attention3:'',
  };
  
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

 start(){
   this.creds.parentage = this.parentage.value;
  //  this.creds.childage = this.childage.value
  
   this.creds.profession1 = this.profession1.value;
   this.creds.profession2 = this.profession2.value;
   this.creds.living = this.living.value;
   this.gotCreds.emit(this.creds);
}

}


