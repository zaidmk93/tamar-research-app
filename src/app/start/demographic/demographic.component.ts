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


export class DemographicComponent{
   
  @Input() culture: string;
  @Output() gotCreds: EventEmitter<Credentials> = new EventEmitter<Credentials>();

  childgender = new FormControl('', [
    Validators.required
  ]);
  parents = new FormControl('', [
    Validators.required
  ]);
  parentage = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  childage = new FormControl('', [
    Validators.required,

  ]);
  monthchild = new FormControl('', [
    Validators.required,

  ]);
  classs = new FormControl('', [
    Validators.required,

  ]);
  living = new FormControl('', [
    Validators.required,

  ]);
  education1 = new FormControl('', [
    Validators.required
  ]);
  profession1 = new FormControl('', [
    Validators.required,
  ]);
  levelofreligiousty = new FormControl('', [
    Validators.required,

  ]);
  education2 = new FormControl('', [
    Validators.required
  ]);
  profession2 = new FormControl('', [
    Validators.required,
  ]);
  languages = new FormControl('', [
    Validators.required
  ]);
  extralanguage = new FormControl('', [
    Validators.required
  ]);
    economic_level = new FormControl('', [
    Validators.required,
  ]);
  
  creds: Credentials = {
    schoolID: '',
    childID: 'a',
    gender: 'M',
    childgender: '',
    parents: '',
    parentage: '',
    childage: '',
    monthchild: '',
    classs: '',
    living: '',
    education1: '',
    profession1: '',
    levelofreligiousty: '',
    education2: '',
    profession2: '',
    languages: '',
    extralanguage: '',
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
345
   
   
   isJewishCulture() : boolean{
    return this.culture == 'Hebrew'
  }

  isArabicCulture() : boolean{
   return this.culture == 'Arabic'
 }

 start(){
   if(this.childgender.errors || this.parents.errors || this.parentage.errors 
    || this.childage.errors || this.monthchild.errors || this.classs.errors || 
    this.living.errors || this.education1.errors || this.profession1.errors || this.levelofreligiousty.errors 
    || this.education2.errors || this.profession2.errors || this.languages.errors || this.extralanguage.errors || this.economic_level.errors){
     
   }
   else{
    this.creds.parentage = this.parentage.value;
    this.creds.extralanguage = this.extralanguage.value;
    console.log(this.creds.childage)
    console.log(this.creds.monthchild)
    this.creds.profession1 = this.profession1.value;
    this.creds.profession2 = this.profession2.value;
    this.creds.living = this.living.value;
    this.gotCreds.emit(this.creds);
  }
}

}


