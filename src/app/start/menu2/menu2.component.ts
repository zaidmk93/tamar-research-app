import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Credentials } from 'src/app/models';

@Component({
  selector: 'app-menu2',
  templateUrl: './menu2.component.html',
  styleUrls: ['./menu2.component.scss']
})
export class Menu2Component implements OnInit {
  @Output() gotCreds: EventEmitter<Credentials> = new EventEmitter<Credentials>();
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
  
  constructor() { }

  ngOnInit(): void {
  }
  clicked1(){
    this.creds.applanguages2 = "Christian"
    this.gotCreds.emit(this.creds);
  }
  clicked2(){
    this.creds.applanguages2 = "Druze"
      this.gotCreds.emit(this.creds);
  }
  clicked3(){
    this.creds.applanguages2 = "Muslim"
      this.gotCreds.emit(this.creds);
  }
}

