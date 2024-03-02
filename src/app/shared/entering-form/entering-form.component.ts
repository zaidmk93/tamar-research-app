import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credentials } from '../../models';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-entering-form',
  templateUrl: './entering-form.component.html',
  styleUrls: ['./entering-form.component.scss'],
})
export class EnteringFormComponent implements OnInit {
  @Input() culture: string;
  @Output() gotCreds: EventEmitter<Credentials> = new EventEmitter<
    Credentials
  >();
  schoolID = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*[٠-٩]*'),
  ]);
  childID = new FormControl('', [
    Validators.required,
    (this.dataService.lab === 'texas' || this.dataService.lab === 'AyshehSchool' || this.dataService.lab === 'ProjectMapatz') ? Validators.pattern('[A-z]*[0-9]*[٠-٩]*[A-z]*') : Validators.pattern('[0-9]*[٠-٩]*'),
  ]);
  childage = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*[٠-٩]*'),
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
    lab : 'Aysheh',
    applanguages1:'',
    applanguages2:'',
    attention1:'',
    attention2:'',
    attention3:'',
    
  };
  invalidSchoolIDFlag = false;
  invalidChildIDFlag = false;
  invalidChildAgeFlag = false;
  lab: any;

  constructor(public dataService: DataService) {}

  ngOnInit(): void {}

  updateFlags(status: boolean){
    this.invalidSchoolIDFlag = status;
    this.invalidChildIDFlag = status;
    this.invalidChildAgeFlag = status;
  }

  withThreeInputs = ['musuem', 'AyshehSchool', 'ProjectMapatz'];
  withChildNumber = this.withThreeInputs.concat(['texas', 'rotem']);

  withThreeInputsFlag = this.withThreeInputs.includes(this.dataService.lab);
  withChildNumberFlag = this.withChildNumber.includes(this.dataService.lab);

  start(): Credentials | void {
    this.updateFlags(false);
    if (!!this.schoolID.errors || this.schoolID.value === 0) {
      this.invalidSchoolIDFlag = true;
    } else if (!!this.childID.errors || this.childID.value === 0) {
      this.invalidChildIDFlag = true;
    } else if (this.withThreeInputsFlag && !!this.childage.errors || this.childage.value === 0){
      this.invalidChildAgeFlag = true;
    } else {
      this.creds.schoolID = this.schoolID.value;
      this.creds.childID = this.childID.value;
      this.creds.childage = this.childage.value || null;
      this.updateFlags(false);
      this.gotCreds.emit(this.creds);
    }
  }
}
