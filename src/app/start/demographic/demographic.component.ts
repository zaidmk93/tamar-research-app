import { Component, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Credentials } from 'src/app/models';
import { FormControl, Validators } from '@angular/forms';
import { fromEvent } from "rxjs";
import { debounceTime, take } from "rxjs/operators";


@Component({
  selector: 'app-demographic',
  templateUrl: './demographic.component.html',
  styleUrls: ['./demographic.component.scss'],
})


export class DemographicComponent{
   
  constructor(
    private el: ElementRef,
  ){

  }
  @Input() culture: string;
  @Output() gotCreds: EventEmitter<Credentials> = new EventEmitter<Credentials>();

  triedToSubmit: boolean = false;
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
  education2 = new FormControl('', [Validators.required]);
  profession2 = new FormControl('', []);
  languages = new FormControl('', []);
  extralanguage = new FormControl('', []);
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
    childageInMonths: '',
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
    prizeDonated: '',
    appearedpyramid:'',
    snakeScore:''
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
  this.triedToSubmit = true;
   if(this.childgender.errors || this.parents.errors || this.parentage.errors 
    || this.childage.errors || this.monthchild.errors || this.classs.errors || 
    this.living.errors || this.education1.errors || this.profession1.errors || this.levelofreligiousty.errors 
    || this.economic_level.errors){
      this.scrollToFirstInvalidControl();
   }
   else{
    this.creds.parentage = this.parentage.value;
    this.creds.extralanguage = this.extralanguage.value;
    this.creds.profession1 = this.profession1.value;
    this.creds.profession2 = this.profession2.value;
    this.creds.living = this.living.value;
    this.gotCreds.emit(this.creds);
  }
}
 
private getTopOffset(controlEl: HTMLElement): number {
  const labelOffset = 50;
  return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
}

private scrollToFirstInvalidControl() {
  const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
    ".ng-invalid"
  );

  window.scroll({
    top: this.getTopOffset(firstInvalidControl),
    left: 0,
    behavior: "smooth"
  });

  fromEvent(window, "scroll")
    .pipe(
      debounceTime(100),
      take(1)
    )
    .subscribe(() => firstInvalidControl.focus());
}

}


