import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credentials } from '../../models';
import { DataService } from '../services/data.service';


interface Religions {
  name: string;
  value: string;
 }

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

  religions: Religions[];

  schoolID;

  childID = new FormControl('', [
    Validators.required,
    (this.dataService.lab === 'texas' || this.dataService.lab === 'EllaDaniel' || this.dataService.lab === 'AyshehSchool' || this.dataService.lab === 'ProjectMapatz' || this.dataService.lab === 'estonianlab') ? Validators.pattern('[A-z]*[0-9]*[٠-٩]*[A-z]*') : Validators.pattern('[0-9]*[٠-٩]*'),
  ]);
  childage = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*[٠-٩]*'),
  ]);
  childageInMonths = new FormControl('', [
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
    lab : 'Aysheh',
    applanguages1:'',
    applanguages2:'',
    attention1:'',
    attention2:'',
    attention3:'',
    prizeDonated: '',
    appearedpyramid:'',
    snakeScore:''
  };
  invalidSchoolIDFlag = false;
  invalidChildIDFlag = false;
  invalidChildAgeFlag = false;
  lab: any;

  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.religions = this.culture !== 'Hebrew' ? [
      {
        name: this.dataService.json_data.start.jewish,
        value: this.dataService.json_data.start.jewish
      },
      {
        name: this.dataService.json_data.start.islam,
        value: this.dataService.json_data.start.islam
      },
      {
        name: this.dataService.json_data.start.christ,
        value: this.dataService.json_data.start.christ
      },
      {
        name: this.dataService.json_data.start.drozi,
        value: this.dataService.json_data.start.drozi
      },
      {
        name: this.dataService.json_data.start.other,
        value: this.dataService.json_data.start.other
      }
     ] :
     [
      {
        value: "יהדות",
        name: "יהדות"
      },
      {
        value: "אסלאם",
        name: "אסלאם"
      },
      {
        value: "נצרות",
        name: "נצרות"
      },
      {
        value: "דרוזית",
        name: "דרוזית"
      },
      {
        value: "אחר",
        name: "אחר"
      }
     ];
  }

  updateFlags(status: boolean){
    this.invalidSchoolIDFlag = status;
    this.invalidChildIDFlag = status;
    this.invalidChildAgeFlag = status;
  }


  onRadioChange(religion: Religions) {
    this.schoolID = religion.value;
  }

  withThreeInputs = ['musuem', 'AyshehSchool', 'ProjectMapatz','estonianlab'];
  withChildNumber = this.withThreeInputs.concat(['texas', 'rotem', 'EllaDaniel']);

  withThreeInputsFlag = this.withThreeInputs.includes(this.dataService.lab) || true; // I added the || true to make it all the time true for now
  withChildNumberFlag = this.withChildNumber.includes(this.dataService.lab);

  start(): Credentials | void {
    this.updateFlags(false);
    if (this.schoolID === undefined) {
      this.invalidSchoolIDFlag = true;
    } else if ((this.withThreeInputsFlag || this.withChildNumberFlag) && !!this.childID.errors || this.childID.value === 0) {
      this.invalidChildIDFlag = true;
    } else if ((!this.withChildNumberFlag || this.withThreeInputsFlag) && (!!this.childage.errors || this.childage.value === 0)){
      this.invalidChildAgeFlag = true;
    } else {
      this.creds.schoolID = this.schoolID;
      this.creds.childID = this.childID.value;
      this.creds.childage = this.childage.value || null;
      this.creds.childageInMonths = this.childageInMonths.value || null;
      if(!this.withChildNumberFlag) {
        this.creds.childID = this.childage.value;
      }
      this.updateFlags(false);
      this.gotCreds.emit(this.creds);
    }
  }
}
