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
     };
    flag = false;
    playerSubscription$: Subscription;

    constructor(
        public dataService: DataService,
        private audioService: AudioService,
        private route: ActivatedRoute,
      ) {}
     
          
     ngOnInit(): void {
      if(this.isJewishCulture()){
        this.audioService.setAudio("../../assets/attention.task3.audio/How many bees.m4a");
      }
      else{
        this.audioService.setAudio("../../assets/attention.task3.audio/How many bees-Arabic.m4a");
      }
      this.playerSubscription$ = this.audioService.getPlayerStatus().subscribe();
      this.route.queryParams.subscribe((params) => {
        
      });
   }
   
   isJewishCulture() : boolean{
    return this.culture == 'Hebrew'
  }

  isArabicCulture() : boolean{
   return this.culture == 'Arabic'
 }
     

     ngOnDestroy(): void {
      this.playerSubscription$.unsubscribe();
    }

     start() {
        
        this.flag = true;
        this.gotCreds.emit(this.creds);
     }
    }
    
