import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Credentials } from 'src/app/models';
import { DataService } from '../../shared/services/data.service';
import { AudioService } from 'src/app/shared/services/audio.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Attention-task3-from',
  templateUrl: './Attention-task3.component.html',
  styleUrls: ['./Attention-task3.component.scss'],
  template: `
    culture: {{culture}}
  `
})
export class Attentiontask3Component implements OnInit {
    @Input() culture: string;
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
       extralanguage:'',
       economic_level: '',
       lab: '',
       applanguages1: '',
       applanguages2: '',
       prizeDonated: '',
       appearedpyramid:'',
       snakeScore:''
     };
    flag = false;
    playerSubscription$: Subscription;
    displayErrorMessage: boolean = false;

    constructor(
        public dataService: DataService,
        private audioService: AudioService,
        private route: ActivatedRoute,
      ) {}
     
          
    ngOnInit(): void {
      this.audioService.setAudio(`../../assets/values-ranking/attention/${this.culture}/Bees.mp3`);      
      this.playerSubscription$ = this.audioService.getPlayerStatus().subscribe();
      this.route.queryParams.subscribe((params) => {
        
      });
   }
   
   isJewishCulture() : boolean{
    return this.culture == 'Hebrew'
  }

  isNotJewishCulture() : boolean{
   return this.culture !== 'Hebrew'
 }
     

  ngOnDestroy(): void {
    this.playerSubscription$.unsubscribe();
  }

  start() {
    if (this.creds.attention3){
      this.flag = true;
      this.gotCreds.emit(this.creds);
    } else {
      this.displayErrorMessage = true;
    }
  }
}
    
