import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AudioService } from 'src/app/shared/services/audio.service';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  @Input() culture: string;
  @Input() data: any;openingEnded: EventEmitter<boolean> = new EventEmitter<boolean>();
  very1: any = {};
  very2: any = {};
  not1: any = {};
  not2: any = {};
  randomView = true;
  $audio: Subscription;
  counter = 0
  constructor(
    private audioService: AudioService,
    public dataService: DataService
  ) {
    for (let i = 1; i <= 10; i++) {
      const curVal = this.dataService['pbvs' + i];
      if (curVal.rank === 5) {
        this.very1 = curVal;
      } else if (curVal.rank === 1) {
        this.not1 = curVal;
      }
    }
    for (let i = 11; i <= 20; i++) {
      const curVal = this.dataService['pbvs' + i];
      if (curVal.rank === 5) {
        this.very2 = curVal;
      } else if (curVal.rank === 1) {
        this.not2 = curVal;
      }
    }
  }

  ngOnInit(): void {
    this.randomView = Math.random() > 0.5;
    this.explenation();
  }

  explenation() {
    this.audioService.setAudio(
      `../../assets/values-ranking/guidance_aud/${
        this.culture === 'jewish' ? 'heb' : 'arab'
      }/inst-end-explenation-${this.dataService.gender}.mp3`
    );
    setTimeout(() => {
      this.$audio = this.audioService.getPlayerStatus().subscribe((res) => {
        if (res === 'ended') {
          this.$audio.unsubscribe();
          this.ending(1);
        }
      });
    }, 500);
  }
  counterUp(){
    this.counter++;
    if(this.counter == 2){
      this.openingEnded.emit(true);
      window.close(); 
    }
  }
  ending(subStage: number) {
    if(subStage == 3){
      return;
    }

    console.log( `../../assets/values-ranking/guidance_aud/${
      this.culture === 'jewish' ? 'heb' : 'arab'
    }/inst-${subStage}-${this.dataService.gender}-exit.${
      this.culture === 'jewish' && subStage === 2 ? 'mpeg' : 'mp3'
    }`);

    this.audioService.setAudio(
      `../../assets/values-ranking/guidance_aud/${
        this.culture === 'jewish' ? 'heb' : 'arab'
      }/inst-${subStage}-${this.dataService.gender}-exit.${
        this.culture === 'jewish' && subStage === 2 ? 'mpeg' : 'mp3'
      }`
    );
    setTimeout(() => {
      this.$audio = this.audioService.getPlayerStatus().subscribe((res) => {
        if (res === 'ended') {
          this.$audio.unsubscribe();
          subStage += 1;
          this.ending(subStage);
        }
      });
    }, 500);
  }
}
