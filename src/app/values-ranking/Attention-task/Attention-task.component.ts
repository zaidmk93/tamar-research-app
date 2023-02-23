import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Credentials } from 'src/app/models';
import { AudioService } from 'src/app/shared/services/audio.service';

@Component({
  selector: 'app-Attention-task-from',
  templateUrl: './Attention-task.component.html',
  styleUrls: ['./Attention-task.component.scss']
})
export class AttentiontaskComponent implements OnInit {
  @Input() culture: string;
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
      lab: '',
      applanguages1: '',
      applanguages2: '',
    };
    playerSubscription$: Subscription;
    displayErrorMessage: boolean = false;

    constructor(
      private audioService: AudioService,
    ) {}

    ngOnInit(): void {
      if(this.culture == 'Hebrew'){
        this.audioService.setAudio("../../assets/attention.task.audio/How many eggs.m4a");
      }else{
        this.audioService.setAudio("../../assets/attention.task.audio/How many eggs-Arabic.m4a");
      }
      this.playerSubscription$ = this.audioService.getPlayerStatus().subscribe();

    }
    isJewishCulture() : boolean{
      return this.culture == 'Hebrew'
    }
  
    isArabicCulture() : boolean{
     return this.culture == 'Arabic'
   }
    counterUp(){
      if(this.counter == 0){
        if(this.creds.attention1){
          this.counter++;
          this.displayErrorMessage = false;
          if(this.culture == 'Hebrew'){
            this.audioService.setAudio("../../assets/attention.task.audio/How many ducks.m4a");
          }else{
            this.audioService.setAudio("../../assets/attention.task.audio/How many ducks-Arabic.m4a");
          }
          this.playerSubscription$ = this.audioService.getPlayerStatus().subscribe();
        } else {
          this.displayErrorMessage = true;
        }
      }
      else if(this.counter == 1){
        if(this.creds.attention2){
          this.openingEnded.emit(this.creds);
          this.displayErrorMessage = false;
        } else {
          this.displayErrorMessage = true;
        }
      }
    }
    
}
