export class BasicData {
  dataSavedFlag = false;
  schoolID: string;
  childID: string;
  gender: 'M' | 'F' = 'M';
  culture: 'jewish' | 'druze' | 'christian' | 'muslim' = 'jewish';
  pbvs1: Pbvs = {
    valNum: 3,
    text: '',
    imgLink: 'val3.png',
    audioLink: '',
    rank: null,
    isStock: true,
  };
  pbvs2: Pbvs = {
    valNum: 2,
    text: 'להצליח יותר מאחרים',
    imgLink: 'val2.png',
    audioLink: 'val2.mp3',
    rank: null,
    isStock: true,
  };
  pbvs3: Pbvs = {
    valNum: 6,
    text: 'להנות מהחיים',
    imgLink: 'val6.png',
    audioLink: 'val6.mp3',
    rank: null,
    isStock: true,
  };
  pbvs4: Pbvs = {
    valNum: 7,
    text: 'לעשות דברים מרגשים',
    imgLink: 'val7.png',
    audioLink: 'val7.mp3',
    rank: null,
    isStock: true,
  };
  pbvs5: Pbvs = {
    valNum: 8,
    text: 'ללמוד לבד דברים חדשים',
    imgLink: 'val8.png',
    audioLink: 'val8.mp3',
    rank: null,
    isStock: true,
  };
  pbvs6: Pbvs = {
    valNum: 1,
    text: 'לשמור על עצמי',
    imgLink: 'val1.png',
    audioLink: 'val1.mp3',
    rank: null,
    isStock: true,
  };
  pbvs7: Pbvs = {
    valNum: 0,
    text: 'לשמור על הכללים',
    imgLink: 'val0.png',
    audioLink: 'val0.mp3',
    rank: null,
    isStock: true,
  };
  pbvs8: Pbvs = {
    valNum: 4,
    text: 'להתפלל לאלוהים',
    imgLink: 'val4.png',
    audioLink: 'val4.mp3',
    rank: null,
    isStock: true,
  };
  pbvs9: Pbvs = {
    valNum: 5,
    text: 'לעזור לאחרים',
    imgLink: 'val5.png',
    audioLink: 'val5.mp3',
    rank: null,
    isStock: true,
  };
  pbvs10: Pbvs = {
    valNum: 9,
    text: 'להיות חבר של ילדים מכל הסוגים',
    imgLink: 'val9.png',
    audioLink: 'val9.mp3',
    rank: null,
    isStock: true,
  };
  pbvs11: Pbvs = {
    valNum: 12,
    text: '',
    imgLink: 'val12.png',
    audioLink: '',
    rank: null,
    isStock: true,
  };
  pbvs12: Pbvs = {
    valNum: 10,
    text: '',
    imgLink: 'val10.png',
    audioLink: '',
    rank: null,
    isStock: true,
  };
  pbvs13: Pbvs = {
    valNum: 11,
    text: 'לעשות חיים',
    imgLink: 'val11.png',
    audioLink: 'val11.mp3',
    rank: null,
    isStock: true,
  };
  pbvs14: Pbvs = {
    valNum: 13,
    text: 'לצאת להרפתקאות',
    imgLink: 'val13.png',
    audioLink: 'val13.mp3',
    rank: null,
    isStock: true,
  };
  pbvs15: Pbvs = {
    valNum: 14,
    text: 'להפעיל את הדמיון',
    imgLink: 'val14.png',
    audioLink: 'val14.mp3',
    rank: null,
    isStock: true,
  };
  pbvs16: Pbvs = {
    valNum: 18,
    text: '',
    imgLink: 'val18.png',
    audioLink: '',
    rank: null,
    isStock: true,
  };
  pbvs17: Pbvs = {
    valNum: 15,
    text: 'להיות כמו כולם',
    imgLink: 'val15.png',
    audioLink: 'val15.mp3',
    rank: null,
    isStock: true,
  };
  pbvs18: Pbvs = {
    valNum: 19,
    text: 'ללמוד על מה שהיה פעם מזמן',
    imgLink: 'val19.png',
    audioLink: 'val19.mp3',
    rank: null,
    isStock: true,
  };
  pbvs19: Pbvs = {
    valNum: 16,
    text: 'לשמח אחרים',
    imgLink: 'val16.png',
    audioLink: 'val16.mp3',
    rank: null,
    isStock: true,
  };
  pbvs20: Pbvs = {
    valNum: 17,
    text: 'לשמור על הטבע',
    imgLink: 'val17.png',
    audioLink: 'val17.mp3',
    rank: null,
    isStock: true,
  };

  currentStage: number = 0;
  currentScene: number = 0;
  firstTimeV = true;

  constructor() {}
}

export class DataService extends BasicData {
  setGender(gender: 'M' | 'F') {
    this.gender = gender;
    this.pbvs1.text = gender === 'M' ? 'להיות עשיר וחזק' : 'להיות עשירה וחזקה';
    this.pbvs1.audioLink = `val3-${gender}.mp3`;
    this.pbvs10.text =
      gender === 'M'
        ? 'להיות חבר של ילדים מכל הסוגים'
        : 'להיות חברה של ילדים מכל הסוגים';
    this.pbvs10.audioLink = `val9-${gender}.mp3`;
    this.pbvs11.text = gender === 'M' ? 'להיות המנהיג' : 'להיות המנהיגה';
    this.pbvs11.audioLink = `val12-${gender}.mp3`;
    this.pbvs12.text =
      gender === 'M'
        ? 'להראות לכולם מה אני יכול לעשות'
        : 'להראות לכולם מה אני יכולה לעשות';
    this.pbvs12.audioLink = `val10-${gender}.mp3`;
    this.pbvs16.text =
      gender === 'M' ? 'להיות מוגן ובטוח' : 'להיות מוגנת ובטוחה';
    this.pbvs16.audioLink = `val18-${gender}.mp3`;
  }

  setCulture(culture: 'jewish' | 'druze' | 'christian' | 'muslim') {
    this.culture = culture;
    this.pbvs8.imgLink = `val4${culture}.png`;
    this.pbvs9.imgLink = `val5${culture === 'jewish' ? 'jewish' : 'arab'}.png`;
    if (culture !== 'jewish') {
      this.pbvs1.text =
        this.gender === 'M'
          ? 'أن أكون غنيًّا وقويًّا'
          : 'أن أكون غنيّةً وقويّة';
      this.pbvs1.audioLink = `${this.gender}/15.mp3`;
      this.pbvs2.text = 'التّفوّق على الآخرين';
      this.pbvs2.audioLink = `${this.gender}/16.mp3`;
      this.pbvs3.text = 'الاستمتاع بالحياة';
      this.pbvs3.audioLink = `${this.gender}/17.mp3`;
      this.pbvs4.text = 'عمل الأشياء المشوّقة';
      this.pbvs4.audioLink = `${this.gender}/18.mp3`;
      this.pbvs5.text = 'اكتشاف الأشياء الجديدة وحدي';
      this.pbvs5.audioLink = `${this.gender}/19.mp3`;
      this.pbvs6.text = 'المحافظة على سلامتي';
      this.pbvs6.audioLink = `${this.gender}/20.mp3`;
      this.pbvs7.text = 'التزام القوانين';
      this.pbvs7.audioLink = `${this.gender}/21.mp3`;
      this.pbvs8.text = 'الصّلاة لله';
      this.pbvs8.audioLink = `${this.gender}/22.mp3`;
      this.pbvs9.text = 'مساعدة الآخرين';
      this.pbvs9.audioLink = `${this.gender}/23.mp3`;
      this.pbvs10.text = 'الصّداقة مع النّاس من كلّ الأنواع';
      this.pbvs10.audioLink = `${this.gender}/24.mp3`;
      this.pbvs11.text = 'قيادة المجموعة';
      this.pbvs11.audioLink = `${this.gender}/34.mp3`;
      this.pbvs12.text = 'إظهار قدراتي للجميع';
      this.pbvs12.audioLink = `${this.gender}/35.mp3`;
      this.pbvs13.text = 'قضاء الوقت الممتع';
      this.pbvs13.audioLink = `${this.gender}/36.mp3`;
      this.pbvs14.text = 'القيام بالمغامرات';
      this.pbvs14.audioLink = `${this.gender}/37.mp3`;
      this.pbvs15.text = 'استخدام الخيال';
      this.pbvs15.audioLink = `${this.gender}/38.mp3`;
      this.pbvs16.text = 'العيش بأمن وأمان';
      this.pbvs16.audioLink = `${this.gender}/39.mp3`;
      this.pbvs17.text = 'أن أكون مثل الآخرين';
      this.pbvs17.audioLink = `${this.gender}/40.mp3`;
      this.pbvs18.text = 'معرفة ما حدث في الماضي';
      this.pbvs18.audioLink = `${this.gender}/41.mp3`;
      this.pbvs19.text = 'إسعاد الآخرين';
      this.pbvs19.audioLink = `${this.gender}/42.mp3`;
      this.pbvs20.text = 'المحافظة على البيئة';
      this.pbvs20.audioLink = `${this.gender}/43.mp3`;
    }
  }
}

export interface Pbvs {
  valNum: number;
  text: string;
  imgLink: string;
  audioLink: string;
  rank: number;
  isStock: boolean;
}
