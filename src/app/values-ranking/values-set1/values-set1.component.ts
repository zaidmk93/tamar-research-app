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

  ngOnInit(): void {
    this.stage = 1;
    if (this.culture === 'jewish') {
      this.subtitle = `עכשיו אנחנו נצא למסע דמיוני -<br>
      מסע בדברים החשובים לך בחיים,<br>
      במטרות שלך ואיך תרצ${
        this.dataService.gender === 'M' ? 'ה' : 'י'
      } לחיות בעתיד`;
      this.audioService.setAudio(
        `../../assets/values-ranking/values_aud/${
          this.culture === 'jewish' ? 'heb' : 'arab'
        }/opening1-${this.dataService.gender}.wav`
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
      if (this.dataService.gender === 'M') {
        this.openingArabMale(0);
      } else {
        this.openingArabFemale(0);
      }
    }
  }

  ngOnDestroy(): void {
    this.$audio.unsubscribe();
  }

  introduceValuesHeb() {
    let curVal: Pbvs;
    switch (this.stage) {
      case 2: {
        curVal = this.dataService.pbvs1;
        break;
      }
      case 3: {
        curVal = this.dataService.pbvs2;
        break;
      }
      case 4: {
        curVal = this.dataService.pbvs3;
        break;
      }
      case 5: {
        curVal = this.dataService.pbvs4;
        break;
      }
      case 6: {
        curVal = this.dataService.pbvs5;
        break;
      }
      case 7: {
        curVal = this.dataService.pbvs6;
        break;
      }
      case 8: {
        curVal = this.dataService.pbvs7;
        break;
      }
      case 9: {
        curVal = this.dataService.pbvs8;
        break;
      }
      case 10: {
        curVal = this.dataService.pbvs9;
        break;
      }
      case 11: {
        curVal = this.dataService.pbvs10;
        break;
      }
      case 12: {
        return 0;
      }
    }
    this.imgLink = `../../assets/values-ranking/values_img/${curVal.imgLink}`;
    this.audioService.setAudio(
      `../../assets/values-ranking/values_aud/${
        this.culture === 'jewish' ? 'heb' : 'arab'
      }/${curVal.audioLink}`
    );
    this.subtitle = curVal.text;
    return 0;
  }

  introduceValuesArab() {
    let curVal: Pbvs;
    switch (this.stage) {
      case 2: {
        curVal = this.dataService.pbvs1;
        break;
      }
      case 3: {
        curVal = this.dataService.pbvs2;
        break;
      }
      case 4: {
        curVal = this.dataService.pbvs3;
        break;
      }
      case 5: {
        curVal = this.dataService.pbvs4;
        break;
      }
      case 6: {
        curVal = this.dataService.pbvs5;
        break;
      }
      case 7: {
        curVal = this.dataService.pbvs6;
        break;
      }
      case 8: {
        curVal = this.dataService.pbvs7;
        break;
      }
      case 9: {
        curVal = this.dataService.pbvs8;
        break;
      }
      case 10: {
        curVal = this.dataService.pbvs9;
        break;
      }
      case 11: {
        curVal = this.dataService.pbvs10;
        break;
      }
      case 12: {
        return 0;
      }
    }
    this.imgLink = `../../assets/values-ranking/values_img/${curVal.imgLink}`;
    this.audioService.setAudio(
      `../../assets/values-ranking/values_aud/${
        this.culture === 'jewish' ? 'heb' : 'arab'
      }/${curVal.audioLink}`
    );
    this.subtitle = curVal.text;
    return 0;
  }

  openingHebMale(time: string) {
    switch (time) {
      case '00:10': {
        this.imgLink = '../../assets/values-ranking/values_img/kid.png';
        this.subtitle =
          'תאר לך שהילד הזה, עם הכובע המפוספס והבגד האפור, הוא אתה';
        break;
      }
      case '00:16': {
        this.subtitle = 'יכול להיות שקשה לך לדמיין את זה.';
        break;
      }
      case '00:19': {
        this.subtitle = 'אולי בכלל אין לך כובע כזה או בגדים אפורים';
        break;
      }
      case '00:23': {
        this.subtitle = 'אבל זה לא משנה';
        break;
      }
      case '00:25': {
        this.subtitle = 'פשוט נסה לדמיין שזה אתה';
        break;
      }
      case '00:28': {
        this.subtitle = 'עכשיו, חשוב על עצמך. ';
        break;
      }
      case '00:31': {
        this.subtitle = 'איך אתה רוצה להיות כשתהיה גדול?';
        break;
      }
      case '00:34': {
        this.subtitle = 'איזה מטרות אתה רוצה להשיג? ';
        break;
      }
      case '00:37': {
        this.subtitle =
          'עכשיו נראה תמונות של כל מני דברים שיכול להיות שאתה רוצה להיות';
        break;
      }
      case '00:43': {
        this.subtitle = 'תסתכל על התמונות, אתה תוכל למצוא בהן את הילד הזה';
        break;
      }
      case '00:47': {
        this.subtitle = 'בוא נעבור על התמונות אחת - אחת';
        break;
      }
      case '00:51': {
        this.subtitle =
          'ואתה כבר יכול להתחיל לחשוב מה יותר חשוב ומה פחות חשוב לך בחיים';
        break;
      }
    }
  }

  openingHebFemale(time: string) {
    switch (time) {
      case '00:10': {
        this.imgLink = '../../assets/values-ranking/values_img/kid.png';
        this.subtitle =
          'תארי לך שהילדה הזו, עם הכובע המפוספס והבגד האפור, היא את';
        break;
      }
      case '00:16': {
        this.subtitle = 'יכול להיות שקשה לך לדמיין את זה. ';
        break;
      }
      case '00:19': {
        this.subtitle = 'אולי בכלל אין לך כובע כזה או בגדים אפורים';
        break;
      }
      case '00:23': {
        this.subtitle = 'אבל זה לא משנה';
        break;
      }
      case '00:25': {
        this.subtitle = 'פשוט נסי לדמיין שזו את';
        break;
      }
      case '00:27': {
        this.subtitle = 'עכשיו, חשבי על עצמך ';
        break;
      }
      case '00:30': {
        this.subtitle = 'איך את רוצה להיות כשתהיי גדולה?';
        break;
      }
      case '00:33': {
        this.subtitle = 'איזה מטרות את רוצה להשיג? ';
        break;
      }
      case '00:35': {
        this.subtitle =
          'עכשיו נראה תמונות של כל מני דברים שיכול להיות שאת רוצה להיות';
        break;
      }
      case '00:41': {
        this.subtitle = 'תסתכלי על התמונות, את תוכלי למצוא בהן את הילדה הזו';
        break;
      }
      case '00:46': {
        this.subtitle = 'בואי נעבור על התמונות אחת - אחת';
        break;
      }
      case '00:49': {
        this.subtitle =
          'ואת כבר יכולה להתחיל לחשוב מה יותר חשוב ומה פחות חשוב לך בחיים';
        break;
      }
    }
  }

  openingArabMale(subStage: number) {
    switch (subStage) {
      case 0: {
        this.subtitle = `سننطلق الآن في رحلة خيالية،<br>
        رحلة حول الأشياء المهمة بالنسبة لك في الحياة،<br>
        مثل: ما هي أهدافك؟ وكيف تريد أن تكون في المستقبل؟`;
        break;
      }
      case 1: {
        this.imgLink = '../../assets/values-ranking/values_img/kid.png';
        this.subtitle =
          'تخيل أن الفتى الذي في الصورة والذي يلبس القبعة المخططة واللباس الرمادي - تخيل أنه أنت.';
        break;
      }
      case 2: {
        this.subtitle = 'قد يصعب عليك أن تتخيل ذلك!';
        break;
      }
      case 3: {
        this.subtitle =
          'من الممكن أنك لا تملك قبعة أو حتى ملابس رمادية كتلك التي في الصورة.';
        break;
      }
      case 4: {
        this.subtitle = 'ولكن هذا غير مهم';
        break;
      }
      case 5: {
        this.subtitle = 'ببساطة،حاول أن تتخيل أنه أنت!';
        break;
      }
      case 6: {
        this.subtitle = 'والآن، فكر في نفسك';
        break;
      }
      case 7: {
        this.subtitle = 'كيف تريد أن تكون عندما تكبر؟';
        break;
      }
      case 8: {
        this.subtitle = 'ما هي الأهداف التي تريد تحقيقها؟';
        break;
      }
      case 9: {
        this.subtitle =
          'الآن سنشاهد معًا صورًا عديدة ومن الممكن أنك تريد أن تكون مثلها';
        break;
      }
      case 10: {
        this.subtitle = 'أنظر إلى الصور';
        break;
      }
      case 11: {
        this.subtitle = 'من الممكن أن تجد فيها الفتى الذي تريد أن تكون مثله';
        break;
      }
      case 12: {
        this.subtitle = 'هيا نمر على الصور، صورةً صورة';
        break;
      }
      case 13: {
        this.subtitle =
          'يمكنك من الآن أن تفكر في الأشياء الأكثر أهمية لك في الحياة وفي الأشياء الأقل أهمية.';
        break;
      }
      case 14: {
        this.$audio = this.audioService.getPlayerStatus().subscribe((res) => {
          if (res === 'ended') {
            this.stage += 1;
            this.introduceValuesArab();
          }
        });
        return 0;
      }
    }
    this.audioService.setAudio(
      `../../assets/values-ranking/values_aud/arab/M/${subStage + 1}.mp3`
    );
    setTimeout(() => {
      this.$audio = this.audioService.getPlayerStatus().subscribe((res) => {
        if (res === 'ended') {
          this.$audio.unsubscribe();
          subStage += 1;
          this.openingArabMale(subStage);
        }
      });
    }, 500);
  }

  openingArabFemale(subStage: number) {
    switch (subStage) {
      case 0: {
        this.subtitle = `سننطلق الآن في رحلة خيالية،<br>
        رحلة حول الأشياء المهمة بالنسبة لك في الحياة،<br>
        مثل: ما هي أهدافكِ؟ وكيف تريدين أن تكوني في المستقبل؟`;
        break;
      }
      case 1: {
        this.imgLink = '../../assets/values-ranking/values_img/kid.png';
        this.subtitle =
          'تخيلي أن الفتاة التي في الصورة والتي تَلْبَسْ القبعة المخططة واللباس الرمادي، تخيلي أنها أنت.';
        break;
      }
      case 2: {
        this.subtitle = 'قد يصعب عليكِ أن تتخيلي ذلك';
        break;
      }
      case 3: {
        this.subtitle =
          'من الممكن أنك لا تملكين قبعة أو حتى ملابس رمادية كما تلك التي في الصورة.';
        break;
      }
      case 4: {
        this.subtitle = 'ولكن هذا غير مهم';
        break;
      }
      case 5: {
        this.subtitle = 'ببساطة،حاولي أن تتخيلي أنها أنت!';
        break;
      }
      case 6: {
        this.subtitle = 'والآن، فكّري في نفسك';
        break;
      }
      case 7: {
        this.subtitle = 'كيف تريدين أن تكوني عندما تكبرين؟';
        break;
      }
      case 8: {
        this.subtitle = 'ما هي الأهداف التي تريدين تحقيقها؟';
        break;
      }
      case 9: {
        this.subtitle =
          'الآن سنشاهد معًا صورًا عديدة ومن الممكن أنك تريدين أن تكوني مثلها';
        break;
      }
      case 10: {
        this.subtitle = 'أنظري إلى الصور';
        break;
      }
      case 11: {
        this.subtitle =
          'من الممكن أن تجدي فيها الفتاة التي تريدين أن تكوني مثلها';
        break;
      }
      case 12: {
        this.subtitle = 'هيا نمر على الصور، صورةً صورة';
        break;
      }
      case 13: {
        this.subtitle =
          'يمكنك من الآن أن تفكري في الأشياء الأكثر أهمية لك في الحياة وفي الأشياء الأقل أهمية';
        break;
      }
      case 14: {
        this.$audio = this.audioService.getPlayerStatus().subscribe((res) => {
          if (res === 'ended') {
            this.stage += 1;
            this.introduceValuesArab();
          }
        });
        return 0;
      }
    }
    this.audioService.setAudio(
      `../../assets/values-ranking/values_aud/arab/F/${subStage + 1}.mp3`
    );
    setTimeout(() => {
      this.$audio = this.audioService.getPlayerStatus().subscribe((res) => {
        if (res === 'ended') {
          this.$audio.unsubscribe();
          subStage += 1;
          this.openingArabFemale(subStage);
        }
      });
    }, 500);
  }
}
