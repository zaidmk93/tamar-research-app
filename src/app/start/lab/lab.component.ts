import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Credentials } from 'src/app/models';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit {
  @Output() gotCreds: EventEmitter<Credentials> = new EventEmitter<Credentials>();
  constructor() { }
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

  ngOnInit(): void {
  }

  clicked1(){
    this.creds.lab = "Aysheh"
    this.gotCreds.emit(this.creds);
  }

  clicked2(){
    this.creds.lab = "Texas"
    this.gotCreds.emit(this.creds);
  }


}
