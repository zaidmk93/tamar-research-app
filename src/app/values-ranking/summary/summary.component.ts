import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Credentials } from 'src/app/models';
import { AudioService } from 'src/app/shared/services/audio.service';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  @Input() culture: string;
  @Output() gotCreds: EventEmitter<Credentials> = new EventEmitter<Credentials>();
  $audio: Subscription;
  submited = false;

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
    lab : '',
    applanguages1:'',
    applanguages2:'',
    attention1:'',
    attention2:'',
    attention3:'',
    prizeDonated: '',
    appearedpyramid:'',
    snakeScore:''
  };
  
  selectedOption: string;

  constructor(
    private audioService: AudioService,
    public dataService: DataService
  ) {

    
  }

  ngOnInit(): void {
  }

   
  start(){
  }

  ending() {
    this.creds.prizeDonated = this.selectedOption;
    this.dataService.prizeDonated = this.creds.prizeDonated;
    this.gotCreds.emit(this.creds);
    this.submited = true;
  }
}
