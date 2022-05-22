import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Credentials } from 'src/app/models';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-Attention-task3-from',
  templateUrl: './Attention-task3.component.html',
  styleUrls: ['./Attention-task3.component.scss']
})
export class Attentiontask3Component implements OnInit {

    @Output() gotCreds: EventEmitter<Credentials> = new EventEmitter<Credentials>();
     counter = 0;
     creds: Credentials = {
       attention1:'',
       attention2:'',
       attention3:'',
       schoolID: '',
       childID: '',
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
       lab: '',
       applanguages1: '',
       applanguages2: '',
     };
    flag = false;

    constructor(
        public dataService: DataService
       
      ) {}
 
     ngOnInit(): void {
     }
     start() {
        this.flag = true;
        this.gotCreds.emit(this.creds);
     }
    }
