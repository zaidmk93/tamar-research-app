import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AudioService } from 'src/app/shared/services/audio.service';
import { Pbvs, DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-values-set2',
  templateUrl: './values-set2.component.html',
  styleUrls: ['./values-set2.component.scss'],
  providers: [AudioService],
})
export class ValuesSet2Component implements OnInit {
  @Input() culture: string;
  @Output() openingEnded: EventEmitter<boolean> = new EventEmitter<boolean>();
  subtitle: string;
  imgLink: string = null;
  vs2Stage = 1;
  $audio: Subscription;
  /**
   * vs2Stages:
   * 1 - opening
   * 2 - val12
   * 3 - val10
   * 4 - val11
   * 5 - val13
   * 6 - val14
   * 7 - val18
   * 8 - val15
   * 9 - val19
   * 10 - val16
   * 11 - val17
   */

  constructor(
    private audioService: AudioService,
    public dataService: DataService
  ) {}

  ngOnInit(): void {
    this.vs2Stage = 1;
    if (this.culture === 'Hebrew') {
      this.subtitle = `כל הכבוד!<br>עכשיו נשחק שוב את המשחק עם תמונות אחרות.<br>נעבור על התמונות אחת - אחת`;
      this.audioService.setAudio(
        `../../assets/values-ranking/values_aud/${this.culture}/opening2-${this.dataService.gender}.wav`
      );

      this.audioService.getTimeElapsed().subscribe((res) => {
        this.openingHeb(res);
      });
      
       

      this.$audio = this.audioService.getPlayerStatus().subscribe((res) => {
        if (res === 'ended') {
          this.vs2Stage += 1;
          this.introduceValuesHeb();
        }
      });
    } else {
      this.opening(0);
    }
  }

  ngOnDestroy(): void {
    this.$audio.unsubscribe();
  }

  introduceValuesHeb() {
    let curVal: Pbvs;
    switch (this.vs2Stage) {
      case 2: {
        curVal = this.dataService.pbvs11;
        break;
      }
      case 3: {
        curVal = this.dataService.pbvs12;
        break;
      }
      case 4: {
        curVal = this.dataService.pbvs13;
        break;
      }
      case 5: {
        curVal = this.dataService.pbvs14;
        break;
      }
      case 6: {
        curVal = this.dataService.pbvs15;
        break;
      }
      case 7: {
        curVal = this.dataService.pbvs16;
        break;
      }
      case 8: {
        curVal = this.dataService.pbvs17;
        break;
      }
      case 9: {
        curVal = this.dataService.pbvs18;
        break;
      }
      case 10: {
        curVal = this.dataService.pbvs19;
        break;
      }
      case 11: {
        curVal = this.dataService.pbvs20;
        break;
      }
      case 12: {
        return 0;
      }
    }
    this.imgLink = `../../assets/values-ranking/values_img/${curVal.imgLink}`;
    this.audioService.setAudio(
      `../../assets/values-ranking/values_aud/${this.culture}/${curVal.audioLink}`
    );
    this.subtitle = curVal.text;
    return 0;
  }

  openingHeb(time: string) {
    switch (time) {
      case '00:06': {
        this.imgLink = '../../assets/values-ranking/values_img/kid.png';
        this.subtitle =
          this.dataService.gender === 'M'
            ? 'דמיין שוב שאתה הילד הזה, עם החולצה האפורה'
            : 'דמייני שוב שאת הילדה הזו, עם החולצה האפורה';
        break;
      }
      case '00:10': {
        this.subtitle =
          this.dataService.gender === 'M'
            ? 'ואתה זה שעושה את כל הדברים האלה'
            : 'ואת זו שעושה את כל הדברים האלה';
        break;
      }
    }
  }

  opening(subStage: number) {
    switch (subStage) {
      case 1: {
        this.imgLink = this.dataService.json_data[this.dataService.gender].opening2_stages[subStage].imgLink;
        this.subtitle = this.dataService.json_data[this.dataService.gender].opening2_stages[subStage].subtitle;
        break;
      }
      case 3: {
        this.$audio = this.audioService.getPlayerStatus().subscribe((res) => {
          if (res === 'ended') {
            this.vs2Stage += 1;
            this.introduceValues();
          }
        });
        return 0;
      }
      default: {
        this.subtitle = this.dataService.json_data[this.dataService.gender].opening2_stages[subStage].subtitle;
      }
    }
    this.audioService.setAudio(
      `../../assets/values-ranking/values_aud/${this.culture}/${this.dataService.gender}/${subStage+31}.mp3`
    );
    setTimeout(() => {
      this.$audio = this.audioService.getPlayerStatus().subscribe((res) => {
        if (res === 'ended') {
          this.$audio.unsubscribe();
          subStage += 1;
          this.opening(subStage);
        }
      });
    }, 500);
  }

  introduceValues() {
    let curVal: Pbvs;
    switch (this.vs2Stage) {
      case 12: {
        return 0;
      }
      default: {
        curVal = this.dataService['pbvs'+ (this.vs2Stage+9)];
      }
    }
    this.imgLink = `../../assets/values-ranking/values_img/${curVal.imgLink}`;
    this.audioService.setAudio(
      `../../assets/values-ranking/values_aud/${this.culture}/${curVal.audioLink}`
    );
    this.subtitle = curVal.text;
    return 0;
  }
}
