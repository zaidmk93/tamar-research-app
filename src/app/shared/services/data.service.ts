import * as Arabic from '../../../assets/Jsons/Arabic.json';
import * as English from '../../../assets/Jsons/English.json';
import * as Estonian from '../../../assets/Jsons/Estonian.json';
import * as Portuguese from '../../../assets/Jsons/Portuguese.json';


export class BasicData {
  dataId:string = "-1";
  is_done: boolean = false;
  userBlocked: boolean = false;
  dataSavedFlag = false;
  userip: string;
  schoolID: string;
  childID: string;
  lab: string;
  childgender: string;
  parents: string;
  parentage: string;
  childage: string = '0';
  childageInMonths: string = '0';
  monthchild: string;
  classs: string;
  living: string;
  education1: string;
  profession1: string;
  levelofreligiousty: string;
  education2: string;
  profession2: string;
  languages: string;
  extralanguage: string;
  economic_level: string;
  applanguages1:string;
  applanguages2:string;
  attention1:string = '0';
  attention2:string = '0';
  attention3:string = '0';
  gender: 'M' | 'F' = 'M';
  culture: 'Hebrew' | 'Arabic';
  firstPyramidStartTime: number = 0;
  secondPyramidStartTime: number = 0;
  TimeTakenToCompleteFirstPyramid: String = '';
  TimeTakenToCompleteSecondPyramid: String = '';

  json_data;

  pbvs1: Pbvs = {
    valNum: 3,
    text: '',
    imgLink: 'val3.png',
    audioLink: '',
    rank: 0,
    isStock: true,
    analytics: {
      last_selected_time: null,
      levels_moved: null
    }  };


  pbvs2: Pbvs = {
    valNum: 2,
    text: 'להצליח יותר מאחרים',
    imgLink: 'val2.png',
    audioLink: 'val2.mp3',
    rank: 0,
    isStock: true,
    analytics: {
      last_selected_time: null,
      levels_moved: null
    }  };
  pbvs3: Pbvs = {
    valNum: 6,
    text: 'להנות מהחיים',
    imgLink: 'val6.png',
    audioLink: 'val6.mp3',
    rank: 0,
    isStock: true,
    analytics: {
      last_selected_time: null,
      levels_moved: null
    }  };
  pbvs4: Pbvs = {
    valNum: 7,
    text: 'לעשות דברים מרגשים',
    imgLink: 'val7.png',
    audioLink: 'val7.mp3',
    rank: 0,
    isStock: true,
    analytics: {
      last_selected_time: null,
      levels_moved: null
    }  };
  pbvs5: Pbvs = {
    valNum: 8,
    text: 'לגלות לבד דברים חדשים',
    imgLink: 'val8.png',
    audioLink: 'val8.mp3',
    rank: 0,
    isStock: true,
    analytics: {
      last_selected_time: null,
      levels_moved: null
    }  };
  pbvs6: Pbvs = {
    valNum: 1,
    text: 'לשמור על הבטיחות ',
    imgLink: 'val1.png',
    audioLink: 'val1.mp3',
    rank: 0,
    isStock: true,
    analytics: {
      last_selected_time: null,
      levels_moved: null
    }  };
  pbvs7: Pbvs = {
    valNum: 0,
    text: 'לשמור על הכללים',
    imgLink: 'val0.png',
    audioLink: 'val0.mp3',
    rank: 0,
    isStock: true,
    analytics: {
      last_selected_time: null,
      levels_moved: null
    }  };
  pbvs8: Pbvs = {
    valNum: 4,
    text: 'להתפלל לאלוהים',
    imgLink: 'val4Hebrew.png',
    audioLink: 'val4.mp3',
    rank: 0,
    isStock: true,
    analytics: {
      last_selected_time: null,
      levels_moved: null
    }
  };
  pbvs9: Pbvs = {
    valNum: 5,
    text: 'לעזור לאחרים',
    imgLink: 'val5.png',
    audioLink: 'val5.mp3',
    rank: 0,
    isStock: true,
    analytics: {
      last_selected_time: null,
      levels_moved: null
    }  };
  pbvs10: Pbvs = {
    valNum: 9,
    text: 'להיות חבר של ילדים מכל הסוגים',
    imgLink: 'val9.png',
    audioLink: 'val9.mp3',
    rank: 0,
    isStock: true,
    analytics: {
      last_selected_time: null,
      levels_moved: null
    }
  };
  pbvs11: Pbvs = {
    valNum: 12,
    text: '',
    imgLink: 'val12.png',
    audioLink: '',
    rank: 0,
    isStock: true,
    analytics: {
      last_selected_time: null,
      levels_moved: null
    }
  };
  pbvs12: Pbvs = {
    valNum: 10,
    text: '',
    imgLink: 'val10.png',
    audioLink: '',
    rank: 0,
    isStock: true,
    analytics: {
      last_selected_time: null,
      levels_moved: null
    }
  };
  pbvs13: Pbvs = {
    valNum: 11,
    text: 'לעשות חיים',
    imgLink: 'val11.png',
    audioLink: 'val11.mp3',
    rank: 0,
    isStock: true,
    analytics: {
      last_selected_time: null,
      levels_moved: null
    }
  };
  pbvs14: Pbvs = {
    valNum: 13,
    text: 'לצאת להרפתקאות',
    imgLink: 'val13.png',
    audioLink: 'val13.mp3',
    rank: 0,
    isStock: true,
    analytics: {
      last_selected_time: null,
      levels_moved: null
    }
  };
  pbvs15: Pbvs = {
    valNum: 14,
    text: 'להפעיל את הדמיון',
    imgLink: 'val14.png',
    audioLink: 'val14.mp3',
    rank: 0,
    isStock: true,
    analytics: {
      last_selected_time: null,
      levels_moved: null
    }
  };
  pbvs16: Pbvs = {
    valNum: 18,
    text: '',
    imgLink: 'val18.png',
    audioLink: '',
    rank: 0,
    isStock: true,
    analytics: {
      last_selected_time: null,
      levels_moved: null
    }
  };
  pbvs17: Pbvs = {
    valNum: 15,
    text: 'להיות כמו כולם',
    imgLink: 'val15.png',
    audioLink: 'val15.mp3',
    rank: 0,
    isStock: true,
    analytics: {
      last_selected_time: null,
      levels_moved: null
    }
  };
  pbvs18: Pbvs = {
    valNum: 19,
    text: 'לשמוע על דברים שקרו מזמן',
    imgLink: 'val19.png',
    audioLink: 'val19.mp3',
    rank: 0,
    isStock: true,
    analytics: {
      last_selected_time: null,
      levels_moved: null
    }
  };
  pbvs19: Pbvs = {
    valNum: 16,
    text: 'לשמח אחרים',
    imgLink: 'val16.png',
    audioLink: 'val16.mp3',
    rank: 0,
    isStock: true,
    analytics: {
      last_selected_time: null,
      levels_moved: null
    }
  };
  pbvs20: Pbvs = {
    valNum: 17,
    text: 'לשמור על הטבע',
    imgLink: 'val17.png',
    audioLink: 'val17.mp3',
    rank: 0,
    isStock: true,
    analytics: {
      last_selected_time: null,
      levels_moved: null
    }
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


  pickJsonByLang(){
    switch(this.applanguages1){
      case "Arabic": {
          this.json_data = Arabic['default'];
          break;
      }
      case "English": {
        this.json_data = English['default'];
        break;
      }
      case "Estonian": {
        this.json_data = Estonian['default'];
        break;
      }
      case "Portuguese": {
        this.json_data = Portuguese['default'];
        break;
      }
    }
  }

  setCulture(culture, secondType) {
    this.culture = culture;
    console.log(secondType);
    this.pbvs8.imgLink = `val4${culture === 'Hebrew' ? 'Hebrew' : secondType || ''}${culture === 'Estonian' ? 'Estonian' : ''}.png`;
    console.log(this.pbvs8.imgLink);
    if(culture === 'Hebrew')
      this.pbvs9.imgLink = `val5${culture}.png`;
    if (culture !== 'Hebrew') {
      for(let i=0; i<= 19; i++){
        this['pbvs' + (i+1)].text = this.json_data[this.gender].pbvs[i].text;
      }
      this.pbvs1.audioLink = `${this.gender}/15.mp3`;
      this.pbvs2.audioLink = `${this.gender}/16.mp3`;
      this.pbvs3.audioLink = `${this.gender}/17.mp3`;
      this.pbvs4.audioLink = `${this.gender}/18.mp3`;
      this.pbvs5.audioLink = `${this.gender}/19.mp3`;
      this.pbvs6.audioLink = `${this.gender}/20.mp3`;
      this.pbvs7.audioLink = `${this.gender}/21.mp3`;
      this.pbvs8.audioLink = `${this.gender}/22.mp3`;
      this.pbvs9.audioLink = `${this.gender}/23.mp3`;
      this.pbvs10.audioLink = `${this.gender}/24.mp3`;
      this.pbvs11.audioLink = `${this.gender}/34.mp3`;
      this.pbvs12.audioLink = `${this.gender}/35.mp3`;
      this.pbvs13.audioLink = `${this.gender}/36.mp3`;
      this.pbvs14.audioLink = `${this.gender}/37.mp3`;
      this.pbvs15.audioLink = `${this.gender}/38.mp3`;
      this.pbvs16.audioLink = `${this.gender}/39.mp3`;
      this.pbvs17.audioLink = `${this.gender}/40.mp3`;
      this.pbvs18.audioLink = `${this.gender}/41.mp3`;
      this.pbvs19.audioLink = `${this.gender}/42.mp3`;
      this.pbvs20.audioLink = `${this.gender}/43.mp3`;
    }
  }
}

export interface ValueChoosingAnalytics {
  last_selected_time: number;
  levels_moved: String;
}
export interface Pbvs {
  valNum: number;
  text: string;
  imgLink: string;
  audioLink: string;
  rank: number;
  isStock: boolean;
  analytics: ValueChoosingAnalytics
}

export class DemographicData{
  name : string;
}

