import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AudioService } from 'src/app/shared/services/audio.service';
import { Pbvs, DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-values-set1',
  templateUrl: './values-set1.component.html',
  styleUrls: ['./values-set1.component.scss'],
  providers: [AudioService],
})
export class ValuesSet1Component implements OnInit {
  @Input() culture: string;
  @Output() openingEnded: EventEmitter<boolean> = new EventEmitter<boolean>();
  subtitle: string;
  imgLink: string = null;
  stage = 1;
  $audio: Subscription;
  /**
   * stages:
   * 1 - opening
   * 2 - val3
   * 3 - val2
   * 4 - val6
   * 5 - val7
   * 6 - val8
   * 7 - val1
   * 8 - val0
   * 9 - val4
   * 10 - val5
   * 11 - val9
   */

  constructor(
    private audioService: AudioService,
    public dataService: DataService
  ) {}

  //
  ngOnInit(): void {
    console.log(this.culture);
    console.log(this.dataService.gender);
    this.stage = 1;
    if (this.culture === 'Hebrew') {
      this.subtitle = `עכשיו אנחנו נצא למסע דמיוני -<br>
      מסע בדברים החשובים לך בחיים,<br>
      במטרות שלך ואיך תרצ${
        this.dataService.gender === 'M' ? 'ה' : 'י'
      } לחיות בעתיד`;
      this.audioService.setAudio(
        `../../assets/values-ranking/values_aud/${this.culture}/opening1-${this.dataService.gender}.wav`
      );

      this.audioService.getTimeElapsed().subscribe((res) => {
        if (this.dataService.gender === 'M') {
          this.openingHebMale(res);
        } else {
          this.openingHebFemale(res);
        }
      });

      this.$audio = this.audioService.getPlayerStatus().subscribe((res) => {
        if (res === 'ended') {
          this.stage += 1;
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
    switch (this.stage) {
      case 2: {
        curVal = this.dataService['pbvs'+ (1 + (parseInt('' + this.dataService.appearedpyramid) * 10))];
        break;
      }
      case 3: {
        curVal = this.dataService['pbvs'+ (2 + (parseInt('' + this.dataService.appearedpyramid) * 10))];
        break;
      }
      case 4: {
        curVal = this.dataService['pbvs'+ (3 + (parseInt('' + this.dataService.appearedpyramid) * 10))];
        break;
      }
      case 5: {
        curVal = this.dataService['pbvs'+ (4 + (parseInt('' + this.dataService.appearedpyramid) * 10))];
        break;
      }
      case 6: {
        curVal = this.dataService['pbvs'+ (5 + (parseInt('' + this.dataService.appearedpyramid) * 10))];
        break;
      }
      case 7: {
        curVal = this.dataService['pbvs'+ (6 + (parseInt('' + this.dataService.appearedpyramid) * 10))];
        break;
      }
      case 8: {
        curVal = this.dataService['pbvs'+ (7 + (parseInt('' + this.dataService.appearedpyramid) * 10))];
        break;
      }
      case 9: {
        curVal = this.dataService['pbvs'+ (8 + (parseInt('' + this.dataService.appearedpyramid) * 10))];
        break;
      }
      case 10: {
        curVal = this.dataService['pbvs'+ (9 + (parseInt('' + this.dataService.appearedpyramid) * 10))];
        break;
      }
      case 11: {
        curVal = this.dataService['pbvs'+ (10 + (parseInt('' + this.dataService.appearedpyramid) * 10))];
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

  introduceValues() {
    let curVal: Pbvs;
    switch (this.stage) {
      case 12: {
        return 0;
      }
      default: {
        curVal = this.dataService['pbvs'+ (this.stage-1 + (parseInt('' + this.dataService.appearedpyramid) * 10))];
      }
    }
    this.imgLink = `../../assets/values-ranking/values_img/${curVal.imgLink}`;
    this.audioService.setAudio(
      `../../assets/values-ranking/values_aud/${this.culture}/${curVal.audioLink}`
    );
    this.subtitle = curVal.text;
    return 0;
  }

  openingHebMale(time: string) {
    switch (time) {
      case '00:08': {
        this.imgLink = '../../assets/values-ranking/values_img/kid.png';
        this.subtitle =
          'תאר לך שהילד הזה, עם הכובע המפוספס והבגד האפור, הוא אתה';
        break;
      }
      case '00:14': {
        this.subtitle = 'יכול להיות שקשה לך לדמיין את זה.';
        break;
      }
      case '00:16': {
        this.subtitle = 'אולי בכלל אין לך כובע כזה או בגדים אפורים';
        break;
      }
      case '00:20': {
        this.subtitle = 'אבל זה לא משנה';
        break;
      }
      case '00:21': {
        this.subtitle = 'פשוט נסה לדמיין שזה אתה';
        break;
      }
      case '00:24': {
        this.subtitle = 'עכשיו, חשוב על עצמך. ';
        break;
      }
      case '00:26': {
        this.subtitle = 'איך אתה רוצה להיות כשתהיה גדול?';
        break;
      }
      case '00:28': {
        this.subtitle = 'איזה מטרות אתה רוצה להשיג? ';
        break;
      }
      case '00:31': {
        this.subtitle =
          'עכשיו נראה תמונות של כל מיני דברים שיכול להיות שאתה רוצה להיות';
        break;
      }
      case '00:35': {
        this.subtitle = 'תסתכל על התמונות, אתה תוכל למצוא בהן את הילד הזה';
        break;
      }
      case '00:39': {
        this.subtitle = 'בוא נעבור על התמונות אחת - אחת';
        break;
      }
      case '00:42': {
        this.subtitle =
          'ואתה כבר יכול להתחיל לחשוב מה יותר חשוב ומה פחות חשוב לך בחיים';
        break;
      }
    }
  }

  openingHebFemale(time: string) {
    switch (time) {
      case '00:08': {
        this.imgLink = '../../assets/values-ranking/values_img/kid.png';
        this.subtitle =
          'תארי לך שהילדה הזו, עם הכובע המפוספס והבגד האפור, היא את';
        break;
      }
      case '00:14': {
        this.subtitle = 'יכול להיות שקשה לך לדמיין את זה. ';
        break;
      }
      case '00:16': {
        this.subtitle = 'אולי בכלל אין לך כובע כזה או בגדים אפורים';
        break;
      }
      case '00:20': {
        this.subtitle = 'אבל זה לא משנה';
        break;
      }
      case '00:21': {
        this.subtitle = 'פשוט נסי לדמיין שזו את';
        break;
      }
      case '00:24': {
        this.subtitle = 'עכשיו, חשבי על עצמך ';
        break;
      }
      case '00:26': {
        this.subtitle = 'איך את רוצה להיות כשתהיי גדולה?';
        break;
      }
      case '00:28': {
        this.subtitle = 'איזה מטרות את רוצה להשיג? ';
        break;
      }
      case '00:31': {
        this.subtitle =
          'עכשיו נראה תמונות של כל מיני דברים שיכול להיות שאת רוצה להיות';
        break;
      }
      case '00:35': {
        this.subtitle = 'תסתכלי על התמונות, את תוכלי למצוא בהן את הילדה הזו';
        break;
      }
      case '00:39': {
        this.subtitle = 'בואי נעבור על התמונות אחת - אחת';
        break;
      }
      case '00:42': {
        this.subtitle =
          'ואת כבר יכולה להתחיל לחשוב מה יותר חשוב ומה פחות חשוב לך בחיים';
        break;
      }
    }
  }

  opening(subStage: number) {
    switch (subStage) {
      case 1: {
        this.imgLink = this.dataService.json_data[this.dataService.gender].opening_stages[subStage].imgLink;
        this.subtitle = this.dataService.json_data[this.dataService.gender].opening_stages[subStage].subtitle;
        break;
      }
      case 14: {
        this.$audio = this.audioService.getPlayerStatus().subscribe((res) => {
          if (res === 'ended') {
            this.stage += 1;
            this.introduceValues();
          }
        });
        return 0;
        break;
      }
      default: {
        this.subtitle = this.dataService.json_data[this.dataService.gender].opening_stages[subStage].subtitle;
      }
    }
    this.audioService.setAudio(
      `../../assets/values-ranking/values_aud/${this.culture}/${this.dataService.gender}/${subStage + 1}.mp3`
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
}
