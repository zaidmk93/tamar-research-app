import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Credentials } from 'src/app/models';

@Component({
  selector: 'app-Attention-task-from',
  templateUrl: './Attention-task.component.html',
  styleUrls: ['./Attention-task.component.scss']
})
export class AttentiontaskComponent implements OnInit {

   @Output() openingEnded: EventEmitter<Credentials> = new EventEmitter<Credentials>();
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

    ngOnInit(): void {
    }

    counterUp(){
      this.counter++;
      if(this.counter == 2){
        this.openingEnded.emit(this.creds);
      }
    }
    
}
