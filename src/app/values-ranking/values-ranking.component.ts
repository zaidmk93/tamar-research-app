import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/app/shared/services/cache.service';
import { Credentials } from '../models';
import { ApplicationStateService } from '../shared/services/application-state.service';
import { DataService } from '../shared/services/data.service';
import { getCacheData, getCacheKey } from '../shared/utils';

@Component({
  selector: 'app-values-ranking',
  templateUrl: './values-ranking.component.html',
  styleUrls: ['./values-ranking.component.scss'],
  providers: [CacheService],
})
export class ValuesRankingComponent implements OnInit {
  /**
   * scenes:
   * 1 - entering form
   * 2 - introduce values set 1
   * 3 - rank values set 1
   * 4 - introduce values set 2
   * 5 - rank values set 2
   * 6 - summary
   * 7 - Attention task
   * 8 - Lab
   * 9 - Language
   * 10 - Demographic
   * 11 - concent
   * 12 - Language2
   * 13 - Attention task3
   */
  scene = 0;
  creds: Credentials;
  isLandscape: boolean = false;
  labsWithNoDetailsPage = ['EllaDaniel'];
  randomPyramidNum = 0;
  SecCondition:boolean = false;

  constructor(
    public dataService: DataService,
    private cacheService: CacheService,
    private http: HttpClient,
    private route: ActivatedRoute,
    public applicationStateService: ApplicationStateService
  ) {}

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event) {
    setTimeout(() => {
      this.isLandscape = window.innerWidth >= window.innerHeight;
      if (this.scene === 0 && this.isLandscape) {
        this.scene = 1;
      }
    }, 500);
  }

  ngOnInit(): void {
    this.scene = this.applicationStateService.getIsMobileResolution() ? 0 : 1;
    this.scene = 9;
    
    this.route.paramMap.subscribe((params) => {
      this.dataService.lab = params.get('id');
      this.dataService.SecCondition = this.route.snapshot.url.some(segment => segment.path === 'sec');
      this.SecCondition = this.dataService.SecCondition;
    });

    // if(this.dataService.appearedpyramid)
    //   this.randomPyramidNum = +this.dataService.appearedpyramid; // the + converting from string to int
    // else {
    if (this.SecCondition){
      this.randomPyramidNum = 2;
    } else {
      this.randomPyramidNum = Math.floor(Math.random() * 3); // 0 or 1 or 2
    }
    // }

    // rotate screen worning. resolves on rotate or 10 sec delay
    // if (this.scene === 0) {
    //   if (window.innerWidth >= window.innerHeight) {
    //     if (this.scene === 0) {
    //       this.scene = 1;
    //     }
    //   } else {
    //     setTimeout(() => {
    //       if (this.scene === 0) {
    //         this.scene = 1;
    //       }
    //     }, 10000);
    //   }
    // }
   }

  scene1(creds: Credentials) {
    this.dataService.currentStage = 1;
    const prevData = this.cacheService.load(
      getCacheKey(creds.schoolID, creds.childID)
    );
    if (prevData && prevData.data.dataId && prevData.data.dataId !== '-1') {
      Object.assign(this.dataService, prevData.data);
      this.dataService.setGender(creds.gender);
      this.dataService.setCulture(this.dataService.applanguages1, this.dataService.applanguages2);
      this.scene = prevData.scene;
      if(!prevData.data.is_done)
        this.updateData();
    } else {
      this.dataService.setGender(creds.gender);
      this.dataService.setCulture(this.dataService.applanguages1, this.dataService.applanguages2);
      this.dataService.schoolID = creds.schoolID;
      this.dataService.childID = creds.childID;
      this.dataService.childage = creds.childage;
      this.dataService.childageInMonths = creds.childageInMonths;
      // this.creds.appearedpyramid = '';
      this.dataService.appearedpyramid = '' + this.randomPyramidNum;
      this.scene = 2;  //changed
      this.checkIfUserAlreadySubmittedAndSubmit();
    }
    this.dataService.currentScene = this.scene;
  }

  scene2(endFlag: boolean) {
    if (endFlag) {
      this.dataService.currentStage = 1;
      this.scene = 3;
      this.dataService.currentScene = this.scene;
    }
    this.cacheService.save({
      key: getCacheKey(this.dataService.schoolID, this.dataService.childID),
      data: getCacheData(this.dataService),
    });
    this.updateData();
  }

  scene3(endFlag: boolean) {
    if (endFlag) {
      this.dataService.currentStage = 1;
      this.scene = 6; //changed
      this.dataService.currentScene = this.scene;
      this.cacheService.save({
        key: getCacheKey(this.dataService.schoolID, this.dataService.childID),
        data: getCacheData(this.dataService),
      });
    }
    this.updateData();
  }

  // scene4(endFlag: boolean) {
  //   if (endFlag) {
  //     this.dataService.currentStage = 1;
  //     this.scene = 5;
  //     this.dataService.currentScene = this.scene;
  //     this.cacheService.save({
  //       key: getCacheKey(this.dataService.schoolID, this.dataService.childID),
  //       data: getCacheData(this.dataService),
  //     });
  //   }
  //   this.updateData();
  // }

  // scene5(endFlag: boolean) {
  //   if (endFlag) {
  //     this.scene = 13;
  //     this.dataService.currentScene = this.scene;
  //     this.cacheService.save({
  //       key: getCacheKey(this.dataService.schoolID, this.dataService.childID),
  //       data: getCacheData(this.dataService),
  //     });
  //   }
  //   this.updateData();
  // }

  scene6(creds: Credentials){
    this.scene = 7;
    this.updateData();
  }
  
  scene7(creds: Credentials){  // for summery
    this.dataService.currentScene = this.scene;
    if(this.dataService.is_done)
      return;
    this.dataService.is_done = true;
    this.cacheService.save({
      key: getCacheKey(this.dataService.schoolID, this.dataService.childID),
      data: getCacheData(this.dataService),
    });
    this.updateData();
  }

  // scene7(openingEnded: Credentials){
  //     this.scene = 4;
  //     this.dataService.attention1 = openingEnded.attention1;
  //     this.dataService.attention2 = openingEnded.attention2;
  //     this.dataService.currentScene = this.scene;
  //     this.cacheService.save({
  //       key: getCacheKey(this.dataService.schoolID, this.dataService.childID),
  //       data: getCacheData(this.dataService),
  //     });
  //     this.updateData();
  // }

  scene8(creds: Credentials){
      this.scene = 9;
      this.dataService.lab = creds.lab;
  }

  style_lang_direction_class = 'right-dir';
  lang_direction(){
    switch(this.dataService.applanguages1){
      case "Arabic": {
        this.style_lang_direction_class = 'right-dir';
          break;
      }
      case "Hebrew": {
        this.style_lang_direction_class = 'right-dir';
          break;
      }
      default: {
        this.style_lang_direction_class = 'left-dir';
      }
    }
  }

  scene9(creds: Credentials){
    this.dataService.applanguages1 = creds.applanguages1;
    this.dataService.pickJsonByLang();
    this.lang_direction();
    this.dataService.applanguages2 = null;

    if (this.dataService.applanguages1  === 'Hebrew' ||
     this.dataService.applanguages1  === 'Arabic'){
      if(creds.applanguages1 == "Arabic"){
        this.scene = 12;
      }else{
        this.nextToDetailsPage();
      }
    } else {
      this.scene = 1;
    }
  }

  nextToDetailsPage(){
    if (this.labsWithNoDetailsPage.includes(this.dataService.lab)){
      this.scene = 1;
    } else {
      this.scene = 11;
    }
  }


  scene10(creds: Credentials){
    this.scene = 1;

    this.dataService.parents = creds.parents;
    this.dataService.parentage = creds.parentage;
    this.dataService.childgender = creds.childgender;
    this.dataService.childage = creds.childage;
    this.dataService.childageInMonths = creds.childageInMonths;
    this.dataService.monthchild = creds.monthchild;
    this.dataService.classs = creds.classs;
    this.dataService.living = creds.living;
    this.dataService.education1 = creds.education1;
    this.dataService.profession1 = creds.profession1;
    this.dataService.levelofreligiousty = creds.levelofreligiousty;
    this.dataService.education2 = creds.education2;
    this.dataService.profession2 = creds.profession2;
    this.dataService.languages = creds.languages;
    this.dataService.extralanguage = creds.extralanguage;
    this.dataService.economic_level = creds.economic_level;
  }

  scene11(creds: Credentials){
    this.scene = 1;
  }

  scene12(creds: Credentials){
    this.dataService.applanguages2 = creds.applanguages2;
    this.nextToDetailsPage();
  }
  scene13(creds: Credentials){
    this.dataService.attention3 = creds.attention3;
    this.scene = 6
    //no need to send an update, the next scene will open after this immediately and will send an update
    // this.updateData();
  }


  // need to make the get data (excel) to get by lastUpdate (after some months / or update all the lastupdated to be iniatedtime)
  checkIfUserAlreadySubmittedAndSubmit(){
    const limitedLabsForOneSubmit = [
      // 'aysheh',
      // 'ayshehfacebook'
    ];

    if (!limitedLabsForOneSubmit.length){
      this.calculateData();
      return;
    }

    const headers = {'x-hasura-admin-secret': 
    'L2WPqUDgvdWhGveSYAjMOG3l6jbbxSb0jZk7q1rii03COuV0LQr2xCQIMJHmq0JO'};

    this.http
      .get<any>(
        `https://research.hasura.app/api/rest/Tamar-user-data-by-ip/${this.dataService.userip}`,
        {
          headers,
        }
      )
      .subscribe({
        next: (data) => {
          if (limitedLabsForOneSubmit.includes(this.dataService.lab) && data.research.length &&
           this.dataService.userip !== undefined && this.dataService.childID !== "26121989"){
            console.error('user already submitted before');
            this.dataService.userBlocked = true;
          }
          else {
            this.calculateData();
          }

          if (!!data.data?.errors) {
            console.error(data.data.errors);
          }
        },
        error: (e) => {
          console.error('failed in checking if user ip already submitted, trying to save...');
          console.error(e);
          this.calculateData();
        },
      });
  }

  private finalData;

  fetchData(){
    this.finalData = {
      dataId: this.dataService.dataId,
      is_done: this.dataService.is_done,
      schoolID: this.dataService.schoolID,
      childID: this.dataService.childID,
      gender: this.dataService.gender,
      rich_strong_1: this.dataService.appearedpyramid === '2' ? this.dataService.pbvs21.rank : this.dataService.pbvs19.rank,
      succeed_more_2: this.dataService.appearedpyramid === '2' ? this.dataService.pbvs22.rank : this.dataService.pbvs20.rank,
      enjoy_life_3: this.dataService.appearedpyramid === '2' ? this.dataService.pbvs23.rank : this.dataService.pbvs3.rank,
      exciting_things_4: this.dataService.appearedpyramid === '2' ? this.dataService.pbvs24.rank : this.dataService.pbvs4.rank,
      learn_new_5: this.dataService.appearedpyramid === '2' ? this.dataService.pbvs25.rank : this.dataService.pbvs5.rank,
      care_for_myself_6: this.dataService.appearedpyramid === '2' ? this.dataService.pbvs26.rank : this.dataService.pbvs6.rank,
      keep_rules_7: this.dataService.appearedpyramid === '2' ? this.dataService.pbvs27.rank : this.dataService.pbvs7.rank,
      pray_god_8: this.dataService.appearedpyramid === '2' ? this.dataService.pbvs28.rank : this.dataService.pbvs8.rank,
      help_others_9: this.dataService.appearedpyramid === '2' ? this.dataService.pbvs29.rank : this.dataService.pbvs9.rank,
      be_friend_10: this.dataService.appearedpyramid === '2' ? this.dataService.pbvs30.rank : this.dataService.pbvs10.rank,
      be_leader_11: this.dataService.pbvs11.rank,
      show_everyone_12: this.dataService.pbvs12.rank,
      have_fun_13: this.dataService.pbvs13.rank,
      adventures_14: this.dataService.pbvs14.rank,
      imagine_15: this.dataService.pbvs15.rank,
      be_protected_16: this.dataService.pbvs16.rank,
      like_everyone_17: this.dataService.pbvs17.rank,
      learn_what_was_18: this.dataService.pbvs18.rank,
      keep_others_happy_19: this.dataService.pbvs1.rank,
      keep_nature_20: this.dataService.pbvs2.rank,
      lab : this.dataService.lab,
      parents : this.dataService.parents,
      parentage : this.dataService.parentage,
      childgender : this.dataService.childgender,
      applanguages1: this.dataService.applanguages1,
      applanguages2: this.dataService.applanguages2,
      childage : this.dataService.childage,
      childageInMonths : this.dataService.childageInMonths,
      monthchild: this.dataService.monthchild,
      classs : this.dataService.classs,
      living : this.dataService.living,
      education1 : this.dataService.education1,
      profession1 : this.dataService.profession1,
      levelofreligiousty : this.dataService.levelofreligiousty,
      education2 : this.dataService.education2,
      profession2 : this.dataService.profession2,
      languages : this.dataService.languages,
      extralanguage: this.dataService.extralanguage,
      economic_level : this.dataService.economic_level,
      attention1 : this.dataService.attention1,
      attention2 : this.dataService.attention2,
      attention3 : this.dataService.attention3,
      user_ip : this.dataService.userip,
      last_update_time: new Date().toISOString(),
      TimeTakenToCompleteFirstPyramid: this.dataService.TimeTakenToCompleteFirstPyramid,
      TimeTakenToCompleteSecondPyramid: this.dataService.TimeTakenToCompleteSecondPyramid,
      rich_strong_1_levels_move: this.dataService.appearedpyramid === '2' ? this.dataService.pbvs21.analytics.levels_moved : this.dataService.pbvs19.analytics.levels_moved,
      succeed_more_2_levels_move: this.dataService.appearedpyramid === '2' ? this.dataService.pbvs22.analytics.levels_moved : this.dataService.pbvs20.analytics.levels_moved,
      enjoy_life_3_levels_move: this.dataService.appearedpyramid === '2' ? this.dataService.pbvs23.analytics.levels_moved : this.dataService.pbvs3.analytics.levels_moved,
      exciting_things_4_levels_move: this.dataService.appearedpyramid === '2' ? this.dataService.pbvs24.analytics.levels_moved : this.dataService.pbvs4.analytics.levels_moved,
      learn_new_5_levels_move: this.dataService.appearedpyramid === '2' ? this.dataService.pbvs25.analytics.levels_moved : this.dataService.pbvs5.analytics.levels_moved,
      care_for_myself_6_levels_move: this.dataService.appearedpyramid === '2' ? this.dataService.pbvs26.analytics.levels_moved : this.dataService.pbvs6.analytics.levels_moved,
      keep_rules_7_levels_move: this.dataService.appearedpyramid === '2' ? this.dataService.pbvs27.analytics.levels_moved : this.dataService.pbvs7.analytics.levels_moved,
      pray_god_8_levels_move: this.dataService.appearedpyramid === '2' ? this.dataService.pbvs28.analytics.levels_moved : this.dataService.pbvs8.analytics.levels_moved,
      help_others_9_levels_move: this.dataService.appearedpyramid === '2' ? this.dataService.pbvs29.analytics.levels_moved : this.dataService.pbvs9.analytics.levels_moved,
      be_friend_10_levels_move: this.dataService.appearedpyramid === '2' ? this.dataService.pbvs30.analytics.levels_moved : this.dataService.pbvs10.analytics.levels_moved,
      be_leader_11_levels_move: this.dataService.pbvs11.analytics.levels_moved,
      show_everyone_12_levels_move: this.dataService.pbvs12.analytics.levels_moved,
      have_fun_13_levels_move: this.dataService.pbvs13.analytics.levels_moved,
      adventures_14_levels_move: this.dataService.pbvs14.analytics.levels_moved,
      imagine_15_levels_move: this.dataService.pbvs15.analytics.levels_moved,
      be_protected_16_levels_move: this.dataService.pbvs16.analytics.levels_moved,
      like_everyone_17_levels_move: this.dataService.pbvs17.analytics.levels_moved,
      appeared_pyramid: this.dataService.appearedpyramid,
      prize_donated: this.dataService.prizeDonated,
      snake_score: this.dataService.snakeScore,
    };
  }

  updateData(){
    if (this.dataService.userBlocked)
      return;

    this.fetchData();
    const reqBody = {
      query: `mutation updateData {
        update_tamar_research_by_pk(pk_columns: {id: "${this.finalData.dataId}"},
          _set: {
            ${this.dataString()}
          }) {
          id
        }
      }`,
    };
    const headers = {'x-hasura-admin-secret': 
    'L2WPqUDgvdWhGveSYAjMOG3l6jbbxSb0jZk7q1rii03COuV0LQr2xCQIMJHmq0JO' };
    console.log('Data to Update:', this.finalData);
    console.log(reqBody);

    this.http
      .post<any>(
        'https://research.hasura.app/v1/graphql',
        reqBody,
        {
          headers,
        }
      )
      .subscribe({
        next: (data) => {
          if (!!data.data?.update_tamar_research_by_pk) {
            this.dataService.dataSavedFlag = true;
            const res = data.data.update_tamar_research_by_pk;
            console.log(`Input saved under ID ${res.id} on ${res.init_time}`);
            this.dataService.dataId = res.id || "-1";
            this.cacheService.save({
              key: getCacheKey(this.dataService.schoolID, this.dataService.childID),
              data: getCacheData(this.dataService),
            });
          } else {
            console.error('Error saving task data!');
            if (!!data.data?.errors) {
              console.error(data.data.errors);
            }
          }
        },
        error: (e) => {
          console.error('Error saving task data!');
          console.error(e);
        },
      });
  }

  dataString(){
    this.fetchData();
    return `school_id: "${this.finalData.schoolID}",
    child_id: "${this.finalData.childID}",
    gender: "${this.finalData.gender}",
    rich_strong_1: ${this.finalData.rich_strong_1},
    succeed_more_2: ${this.finalData.succeed_more_2},
    enjoy_life_3: ${this.finalData.enjoy_life_3},
    exciting_things_4: ${this.finalData.exciting_things_4},
    learn_new_5: ${this.finalData.learn_new_5},
    care_for_myself_6: ${this.finalData.care_for_myself_6},
    keep_rules_7: ${this.finalData.keep_rules_7},
    pray_god_8: ${this.finalData.pray_god_8},
    help_others_9: ${this.finalData.help_others_9},
    be_friend_10: ${this.finalData.be_friend_10},
    be_leader_11: ${this.finalData.be_leader_11},
    show_everyone_12: ${this.finalData.show_everyone_12},
    have_fun_13: ${this.finalData.have_fun_13},
    adventures_14: ${this.finalData.adventures_14},
    imagine_15: ${this.finalData.imagine_15},
    be_protected_16: ${this.finalData.be_protected_16},
    like_everyone_17: ${this.finalData.like_everyone_17},
    learn_what_was_18: ${this.finalData.learn_what_was_18},
    keep_others_happy_19: ${this.finalData.keep_others_happy_19},
    keep_nature_20: ${this.finalData.keep_nature_20},
    lab : ${this.finalData.lab},
    applanguages1 : ${this.finalData.applanguages1},
    applanguages2 : ${this.finalData.applanguages2},
    attention1: ${this.finalData.attention1}
    attention2: ${this.finalData.attention2},
    attention3: ${this.finalData.attention3},
    childage: ${this.finalData.childage},
    childageInMonths: ${this.finalData.childageInMonths},
    IP: "${this.finalData.user_ip}"
    is_done: "${this.finalData.is_done}"
    last_update_time: "${this.finalData.last_update_time}"
    RT_FirstPyramid: "${this.finalData.TimeTakenToCompleteFirstPyramid}"
    RT_SecondPyramid: "${this.finalData.TimeTakenToCompleteSecondPyramid}"
    rich_strong_1_levels_move: "${this.finalData.rich_strong_1_levels_move}"
    succeed_more_2_levels_move: "${this.finalData.succeed_more_2_levels_move}"
    enjoy_life_3_levels_move: "${this.finalData.enjoy_life_3_levels_move}"
    exciting_things_4_levels_move: "${this.finalData.exciting_things_4_levels_move}"
    learn_new_5_levels_move: "${this.finalData.learn_new_5_levels_move}"
    care_for_myself_6_levels_move: "${this.finalData.care_for_myself_6_levels_move}"
    keep_rules_7_levels_move: "${this.finalData.keep_rules_7_levels_move}"
    pray_god_8_levels_move: "${this.finalData.pray_god_8_levels_move}"
    help_others_9_levels_move: "${this.finalData.help_others_9_levels_move}"
    be_friend_10_levels_move: "${this.finalData.be_friend_10_levels_move}"
    be_leader_11_levels_move: "${this.finalData.be_leader_11_levels_move}"
    show_everyone_12_levels_move: "${this.finalData.show_everyone_12_levels_move}"
    have_fun_13_levels_move: "${this.finalData.have_fun_13_levels_move}"
    adventures_14_levels_move: "${this.finalData.adventures_14_levels_move}"
    imagine_15_levels_move: "${this.finalData.imagine_15_levels_move}"
    be_protected_16_levels_move: "${this.finalData.be_protected_16_levels_move}"
    like_everyone_17_levels_move: "${this.finalData.like_everyone_17_levels_move}"
    appeared_pyramid: "${this.finalData.appeared_pyramid}"
    prize_donated: "${this.finalData.prize_donated}"
    snake_score: "${this.finalData.snake_score}"
    `;
  }
  
  
  calculateData() {
    const reqBody = {
      query: `mutation insertData {
        insert_tamar_research_one(
          object: {
            ${this.dataString()}
          }
        ) {
          id
        }
      }`,
    };
    const headers = {'x-hasura-admin-secret': 
    'L2WPqUDgvdWhGveSYAjMOG3l6jbbxSb0jZk7q1rii03COuV0LQr2xCQIMJHmq0JO' };
    console.log('Data summary:', this.finalData);
    console.log(reqBody);

    this.http
      .post<any>(
        'https://research.hasura.app/v1/graphql',
        reqBody,
        {
          headers,
        }
      )
      .subscribe({
        next: (data) => {
          if (!!data.data?.insert_tamar_research_one) {
            this.dataService.dataSavedFlag = true;
            const res = data.data.insert_tamar_research_one;
            console.log(`Input saved under ID ${res.id} on ${res.init_time}`);
            this.dataService.dataId = res.id || "-1";
            this.cacheService.save({
              key: getCacheKey(this.dataService.schoolID, this.dataService.childID),
              data: getCacheData(this.dataService),
            });
          } else {
            console.error('Error saving task data!');
            if (!!data.data?.errors) {
              console.error(data.data.errors);
            }
          }
        },
        error: (e) => {
          console.error('Error saving task data!');
          console.error(e);
        },
      });
  }

  calculateDataDemo() {
    const finalData = {
      lab : this.dataService.lab,
      parents : this.dataService.parents,
      parentage : this.dataService.parentage,
      childgender : this.dataService.childgender,
      applanguages1: this.dataService.applanguages1,
      applanguages2: this.dataService.applanguages2,
      childage : this.dataService.childage,
      childageInMonths : this.dataService.childageInMonths,
      monthchild: this.dataService.monthchild,
      classs : this.dataService.classs,
      living : this.dataService.living,
      education1 : this.dataService.education1,
      profession1 : this.dataService.profession1,
      levelofreligiousty : this.dataService.levelofreligiousty,
      education2 : this.dataService.education2,
      profession2 : this.dataService.profession2,
      languages : this.dataService.languages,
      extralanguage: this.dataService.extralanguage,
      economic_level : this.dataService.economic_level,
      attention1 : this.dataService.attention1,
      attention2 : this.dataService.attention2,
      attention3 : this.dataService.attention3,

    };
    const reqBody = {
      query: `mutation insertData {
        insert_tamar_research_one(
          object: {
            lab : ${finalData.lab},
            applanguages1 : ${finalData.applanguages1},
            applanguages2 : ${finalData.applanguages2},
            childgender : ${finalData.childgender},
            parents : ${finalData.parents},
            parentage : ${finalData.parentage},
            education1 : ${finalData.education1},
            profession1 : "${finalData.profession1}",
            levelofreligiousty : ${finalData.levelofreligiousty},
            education2 : ${finalData.education2},
            profession2 : "${finalData.profession2}",
            economic_level : ${finalData.economic_level},
            living : "${finalData.living}",
            classs : "${finalData.classs}",
            childage: ${finalData.childage},
            childageInMonths: ${finalData.childageInMonths},
            monthchild: "${finalData.monthchild}",
            languages: "${finalData.languages}",
            extralanguage: "${finalData.extralanguage}",
            
          }
        ) {
          id
        }
      }`,
    };
    const headers = {'x-hasura-admin-secret': 
    'L2WPqUDgvdWhGveSYAjMOG3l6jbbxSb0jZk7q1rii03COuV0LQr2xCQIMJHmq0JO' };
    console.log('Data summary:', finalData);
    console.log(reqBody);

    this.http
      .post<any>(
        'https://research.hasura.app/v1/graphql',
        reqBody,
        {
          headers,
        }
      )
      .subscribe({
        next: (data) => {
          if (!!data.data?.insert_tamar_research_one) {
            this.dataService.dataSavedFlag = true;
            const res = data.data.insert_tamar_research_one;
            console.log(`Input saved under ID ${res.id} on ${res.init_time}`);
          } else {
            console.error('Error saving task data!');
            if (!!data.data?.errors) {
              console.error(data.data.errors);
            }
          }
        },
        error: (e) => {
          console.error('Error saving task data!');
          console.error(e);
        },
      });
  }
}

function clicked1() {
  throw new Error('Function not implemented.');
}

