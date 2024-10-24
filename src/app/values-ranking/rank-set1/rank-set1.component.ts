import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { AudioService } from 'src/app/shared/services/audio.service';
import { CacheService } from 'src/app/shared/services/cache.service';
import { getCacheData, getCacheKey } from 'src/app/shared/utils';
import { Pbvs, DataService } from '../../shared/services/data.service';
import { PyramidViewComponent } from '../pyramid-view/pyramid-view.component';
import { ValueDialogComponent } from '../value-dialog/value-dialog.component';
import { Time } from '@angular/common';
import { debounceTime, take } from 'rxjs/operators';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-rank-set1',
  templateUrl: './rank-set1.component.html',
  styleUrls: ['./rank-set1.component.scss'],
  providers: [AudioService],
})
export class RankSet1Component implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('valueDialog')
  valueDialog: ValueDialogComponent;
  @ViewChild('pyramidView')
  pyramidView: PyramidViewComponent;
  @Input() culture: string;
  @Output() gotRanking: EventEmitter<boolean> = new EventEmitter<boolean>();
  isMale = true;
  title: string;
  stage = 1;
  calculating = false;
  playerSubscription$: Subscription;
  playerworking$: Subscription;
  idleTimer;
  pyramidElementsStart = 0;
  pbvsArray = [];
  pyramidSubmitted = false;
 
  orderedValues = {
    veryvery: null,
    very1: null,
    very2: null,
    average1: null,
    average2: null,
    average3: null,
    average4: null,
    not1: null,
    not2: null,
    notnot: null,
    // timeset1: null,
    // timeset2:null,
   };

  valuesStages = [
    'veryvery',
    'notnot',
    'very1',
    'very2',
    'not1',
    'not2',
    'average1',
    'average2',
    'average3',
    'average4',
    'dt1',
    'dt2',
    // 'timeset1',
    // 'timeset2',
  ];
  getTime: any;
  // timeset1: number;
  constructor(
    private el: ElementRef,
    private audioService: AudioService,
    public dataService: DataService,
    private cacheService: CacheService
  ) {
    this.stage = this.dataService.currentStage;
    if (this.stage > 1) {
      this.updateValuesFromCache();
    }
  }
  ngAfterViewInit(): void {
    const pyramid_container: HTMLElement = this.el.nativeElement.querySelector(".pyramid-container");
    const stock_container: HTMLElement = this.el.nativeElement.querySelector(".stock-container");
    this.scrollTo(pyramid_container);
    setTimeout(()=> {
      this.scrollTo(stock_container);
    }, this.culture === 'Hebrew'? (this.dataService.currentStage > 2 ? 2000 : 9500) : (this.dataService.currentStage > 2 ? 2000 : 14500));
  }

  ngOnInit(): void {
    this.pyramidElementsStart = parseInt('' + this.dataService.appearedpyramid) * 10;

    for (let i = this.pyramidElementsStart + 1; i <= this.pyramidElementsStart + 10; i++) {
      this.pbvsArray.push(this.dataService['pbvs' + i]);
    }

    this.isMale = this.dataService.gender === 'M';
    this.nextStage();
  }

  get pbvsRows() {
    const rows = [];
    for (let i = 0; i < this.pbvsArray.length; i += 4) {
      rows.push(this.pbvsArray.slice(i, i + 4));
    }
    return rows;
  }


  private getTopOffset(controlEl: HTMLElement): number {
    const labelOffset = 50;
    return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
  }

  private scrollTo(scrollTo: HTMLElement) {
  
    window.scroll({
      top: this.getTopOffset(scrollTo),
      left: 0,
      behavior: "smooth"
    });
  
    fromEvent(window, "scroll")
      .pipe(
        debounceTime(100),
        take(1)
      )
      .subscribe(() => scrollTo.focus());
  }

  ngOnDestroy(): void {
    this.unsubscribe(this.playerSubscription$);
    this.unsubscribe(this.playerworking$);
  }

  nextStage() {
    this.unsubscribe(this.playerSubscription$);
    this.calculating = true;
    this.dataService.currentStage = this.stage;
    this.cacheService.save({
      key: getCacheKey(this.dataService.schoolID, this.dataService.childID),
      data: getCacheData(this.dataService),
    });

    this.playSound();
  }

  unsubscribe(sub: Subscription) {
    if (sub) {
      sub.unsubscribe();
    }
  }

  stepback() {
    this.unsubscribe(this.playerSubscription$);
    this.audioService.setAudio(null);
    this.stage -= 1;
    while (this.stage >= 7) {
      this.stage -= 1;
      this.orderedValues[this.valuesStages[this.stage]].isStock = true;
      this.orderedValues[this.valuesStages[this.stage]].rank = null;
      this.orderedValues[this.valuesStages[this.stage]] = null;
    }
    if (this.stage >= 1) {
      this.orderedValues[this.valuesStages[this.stage - 1]].isStock = true;
      this.orderedValues[this.valuesStages[this.stage - 1]].rank = null;
      this.orderedValues[this.valuesStages[this.stage - 1]] = null;
      this.playSound();
    }
  }


  valueClick(val: Pbvs) {
    if (!this.calculating) {
      val.analytics.last_selected_time = new Date().getTime();

      clearTimeout(this.idleTimer);
      this.unsubscribe(this.playerSubscription$);
      this.valueDialog.open(val);
    }
  }

  valueConfirmed(val: Pbvs) {
    this.calculating = true;
    this.stage += 1;
    val.isStock = false;
    this.orderedValues[this.valuesStages[this.stage - 2]] = val;
    val.rank = this.getRank(this.valuesStages[this.stage - 2]);
    this.calculateReactionTime(val, 'Confirmed');
    this.nextStage();
    const subscription = this.audioService.getPlayerStatus();
    if (this.stage >= 7) {
      // inner delated func
      const stage7 = () => {
        this.playerSubscription$ = subscription.subscribe((res) => {
          if (['ended', 'paused'].includes(res)) {
            this.playerSubscription$.unsubscribe();
            for (let i = this.pyramidElementsStart + 1; i <= this.pyramidElementsStart + 10; i++) {
              if (this.dataService['pbvs' + i].isStock) {
                const value = this.dataService['pbvs' + i];
                this.stage += 1;
                value.isStock = false;
                value.rank = this.getRank(this.valuesStages[this.stage - 2]);
                this.orderedValues[this.valuesStages[this.stage - 2]] = value;
              }
            }
            this.calculating = false;
            this.pyramidView.open(this.orderedValues);
          }
        });
      };
      setTimeout(stage7, 1000);
    } else {
      if ([4, 6].includes(this.stage)) {
        this.calculating = false;
      } else {
        this.playerSubscription$ = subscription.subscribe((res) => {
          if (res === 'ended') {
            this.calculating = false;
          }
        });
      }
    }
  }

  calculateReactionTime(val: Pbvs, reactionValue){
    const rankWithRTime = val.rank.toString() + ' (' + (((new Date().getTime()) - (val.analytics.last_selected_time)) / 1000).toString() + ' , ' + reactionValue + ')';
    if (val.analytics.levels_moved == null)
      val.analytics.levels_moved = rankWithRTime;
    else 
    val.analytics.levels_moved = val.analytics.levels_moved + ',' + rankWithRTime;
  }

  valueCancelled(val: Pbvs){
    val.rank = this.getRank(this.valuesStages[this.stage + 1 - 2]);
    this.calculateReactionTime(val,'cancelled')
    val.rank = 0;
    this.playSound()
  }

  playSound() {
    clearTimeout(this.idleTimer);
    const createSoundLink = (num: number): string => {
      return `../../assets/values-ranking/guidance_aud/${this.culture}/inst-${num}-${this.isMale ? 'M' : 'F'}.mp3`;
    };


    const titles = (num: number): string => {
      const titlesDict = [
        {
          arab: {
            M:
              'برأس الصفحة يمكنك أن ترى أنه مكتوب " مهم جدا “. اختر صورة واحدة هي الأكثر أهمية بالنسبة لك وكيف تود أن تكون في المستقبل. الآن اضغط على تلك الصورة',
            F:
              'برأس الصفحة يمكنكِ أن تري أنه مكتوب " مهم جدا “. اختاري صورة واحدة هي الأكثر أهمية بالنسبة لكِ وكيف تودين أن تكوني في المستقبل. الآن اضغطي على تلك الصورة',
          },
          heb: {
            M:
              'בראש העמוד אתה יכול לראות שרשום "חשוב מאוד". בחר תמונה אחת שהכי חשובה לך ולאיך שתרצה להיות בחייך, ולחץ עליה',
            F:
              'בראש העמוד את יכולה לראות שרשום "חשוב מאוד". בחרי תמונה אחת שהכי חשובה לך ולאיך שתרצי להיות בחייך, ולחצי עליה',
          },
        },
        {
          arab: {
            M:
              'بالتأكيد هنالك أمور وأشياء أخرى غير مهمة أبداً بالنسبة لك “. اختر صورة واحدة أبدا غير مهمة لك وليس لها علاقة بما تود أن تكون في المستقبل',
            F:
              'بالتأكيد هنالك أمور وأشياء أخرى غير مهمة أبداً بالنسبة لكِ. اختاري صورة واحدة أبدا غير مهمة لكِ وليس لها علاقة بما تودين أن تكوني في المستقبل.',
          },
          heb: {
            M:
              'בטח יש דברים שבכלל לא חשובים לך. בחר תמונה שלא חשובה לך בכלל ולא חשובה לאיך שתרצה להיות בעתיד',
            F:
              'בטח יש דברים שבכלל לא חשובים לך. בחרי תמונה שלא חשובה לך בכלל ולא חשובה לאיך שתרצי להיות בעתיד',
          },
        },
        {
          arab: {
            M:
              'وصلنا الآن للسطر الثاني، بالتأكيد هنالك عدة أشياء تعتبر مهمة بالنسبة لك. اختر صورتين فيهما الأشياء المهمة لك.',
            F:
              'وصلنا الآن للسطر الثاني، بالتأكيد هنالك عدة أشياء تعتبر مهمة بالنسبة لكِ. اختاري صورتين فيهما الأشياء المهمة لك.',
          },
          heb: {
            M:
              'עכשיו הגענו לשורה השנייה. בטח יש עוד כמה דברים שחשובים לך. בחר 2 תמונות שמראות משהו שחשוב לך',
            F:
              'עכשיו הגענו לשורה השנייה. בטח יש עוד כמה דברים שחשובים לך. בחרי 2 תמונות שמראות משהו שחשוב לך',
          },
        },
        {
          arab: {
            M:
              'الآن وصلنا للسطر قبل الأخير:  "هذا السطر يتضمن الأشياء الغير مهمة بالنسبة لك . اختر صورتين لهذا السطر.',
            F:
              'الآن وصلنا للسطر قبل الأخير:  "هذا السطر يتضمن الأشياء الغير مهمة بالنسبة لك . اختاري صورتين لهذا السطر.',
          },
          heb: {
            M:
              'עכשיו נגיע לשורה אחת לפני האחרונה. היא שייכת לדברים שלא ממש חשובים לך. בחר עוד 2 תמונות בשביל השורה הזאת',
            F:
              'עכשיו נגיע לשורה אחת לפני האחרונה. היא שייכת לדברים שלא ממש חשובים לך. בחרי עוד 2 תמונות בשביל השורה הזאת',
          },
        },
        {
          arab: {
            M: 'بقي لك 4 صور نضعهم بالسطر الوسط.',
            F: 'بقي لك 4 صور نضعهم بالسطر الوسط.',
          },
          heb: {
            M: 'נשארו לך 4 תמונות. נשים אותן בשורה האמצעית',
            F: 'נשארו לך 4 תמונות. נשים אותן בשורה האמצעית',
          },
        },
      ];
      return titlesDict[num - 1][this.culture === 'Hebrew' ? 'heb' : 'arab'][
        this.isMale ? 'M' : 'F'
      ];
    };
    switch (this.stage) {
      case 1: {
        this.title = titles(1);
        this.audioService.setAudio(createSoundLink(1));
        this.playerSubscription$ = this.audioService
          .getPlayerStatus()
          .subscribe((res) => {
            clearTimeout(this.idleTimer);
            if (res === 'ended') {
              this.calculating = false;
              if (this.dataService.firstPyramidStartTime == 0)
                this.dataService.firstPyramidStartTime = new Date().getTime();
              this.playerSubscription$.unsubscribe();
              this.idleTimer = setTimeout(() => {
                if (this.stage === 1) {
                  this.playSound();
                }
              }, 7000);
            }
          });
        break;
      }
      case 2: {
        this.title = titles(2);
        this.audioService.setAudio(createSoundLink(2));
        this.playerSubscription$ = this.audioService
          .getPlayerStatus()
          .subscribe((res) => {
            clearTimeout(this.idleTimer);
            if (res === 'ended') {
              this.calculating = false;
              this.playerSubscription$.unsubscribe();
              this.idleTimer = setTimeout(() => {
                if (this.stage === 2) {
                  this.playSound();
                }
              }, 7000);
            }
          });
        break;
      }
      case 3: {
        this.audioService.setAudio(createSoundLink(3));
        this.playerSubscription$ = this.audioService
          .getPlayerStatus()
          .subscribe((res) => {
            clearTimeout(this.idleTimer);
            if (res === 'ended') {
              this.calculating = false;
              this.playerSubscription$.unsubscribe();
              this.idleTimer = setTimeout(() => {
                if (this.stage === 3 || this.stage === 4) {
                  this.playSound();
                }
              }, 7000);
            }
          });
      }
      case 4: {
        this.title = titles(3);
        this.calculating = false;
        break;
      }
      case 5: {
        this.audioService.setAudio(createSoundLink(4));
        this.playerSubscription$ = this.audioService
          .getPlayerStatus()
          .subscribe((res) => {
            clearTimeout(this.idleTimer);
            if (res === 'ended') {
              this.calculating = false;
              this.playerSubscription$.unsubscribe();
              this.idleTimer = setTimeout(() => {
                if (this.stage === 5 || this.stage === 6) {
                  this.playSound();
                }
              }, 7000);
            }
          });
      }
      case 6: {
        this.title = titles(4);
        this.calculating = false;
        break;
      }
      case 7: {
        this.title = titles(5);
        this.audioService.setAudio(createSoundLink(5));
        break;
      }
      default: {
        break;
      }
    }
  }
 

  getRank(rank: string) {
    let rankVal: number;
    switch (rank) {
      case 'veryvery': {
        rankVal = 5;
        break;
      }
      case 'very1': {
        rankVal = 4;
        break;
      }
      case 'very2': {
        rankVal = 4;
        break;
      }
      case 'not1': {
        rankVal = 2;
        break;
      }
      case 'not2': {
        rankVal = 2;
        break;
      }
      case 'notnot': {
        rankVal = 1;
        break;
      }
      case 'average1': {
      }
      case 'average2': {
      }
      case 'average3': {
      }
      case 'average4': {
        rankVal = 3;
        break;
      }
    }
    return rankVal;
  }

  updateValuesFromCache() {
    for (let i = 1 + this.pyramidElementsStart; i <= 10 + this.pyramidElementsStart; i++) {
      const value = this.dataService['pbvs' + i];
      if (value.rank !== null) {
        switch (value.rank) {
          case 5:
            this.orderedValues.veryvery = value;
            break;
          case 4:
            if (this.orderedValues.very1 === null) {
              this.orderedValues.very1 = value;
            } else {
              this.orderedValues.very2 = value;
            }
            break;
          case 3:
            if (this.orderedValues.average1 === null) {
              this.orderedValues.average1 = value;
            } else if (this.orderedValues.average2 === null) {
              this.orderedValues.average2 = value;
            } else if (this.orderedValues.average3 === null) {
              this.orderedValues.average3 = value;
            } else {
              this.orderedValues.average4 = value;
            }
            break;
          case 2:
            if (this.orderedValues.not1 === null) {
              this.orderedValues.not1 = value;
            } else {
              this.orderedValues.not2 = value;
            }
            break;
          case 1:
            this.orderedValues.notnot = value;
            break;
        }
      }
    }
  }

  getImgLink(num: number) {
    return `../../assets/values-ranking/values_img/val${num}.png`;
  }

  nextScene() {
    if (this.dataService.firstPyramidStartTime > 0)
      this.dataService.TimeTakenToCompleteFirstPyramid = (((new Date().getTime()) - this.dataService.firstPyramidStartTime) / 1000).toString();
    this.pyramidSubmitted = true;
    this.gotRanking.emit(true);
  }
}
