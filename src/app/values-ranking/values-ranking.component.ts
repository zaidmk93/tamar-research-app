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
    });

    // rotate screen worning. resolves on rotate or 10 sec delay
    if (this.scene === 0) {
      if (window.innerWidth >= window.innerHeight) {
        if (this.scene === 0) {
          this.scene = 1;
        }
      } else {
        setTimeout(() => {
          if (this.scene === 0) {
            this.scene = 1;
          }
        }, 10000);
      }
    }
   }

  scene1(creds: Credentials) {
    this.dataService.currentStage = 1;
    const prevData = this.cacheService.load(
      getCacheKey(creds.schoolID, creds.childID)
    );
    if (prevData) {
      Object.assign(this.dataService, prevData.data);
      this.dataService.setGender(creds.gender);
      this.dataService.setCulture(this.dataService.applanguages1, this.dataService.applanguages2);
      this.scene = prevData.scene;
    } else {
      this.dataService.setGender(creds.gender);
      this.dataService.setCulture(this.dataService.applanguages1, this.dataService.applanguages2);
      this.dataService.schoolID = creds.schoolID;
      this.dataService.childID = creds.childID;
      this.scene = 2;
      
    }
    this.dataService.currentScene = this.scene;
    this.cacheService.save({
      key: getCacheKey(creds.schoolID, creds.childID),
      data: getCacheData(this.dataService),
    });
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
  }

  scene3(endFlag: boolean) {
    if (endFlag) {
      this.dataService.currentStage = 1;
      this.scene = 7;
      this.dataService.currentScene = this.scene;
      this.cacheService.save({
        key: getCacheKey(this.dataService.schoolID, this.dataService.childID),
        data: getCacheData(this.dataService),
      });
    }
  }

  scene4(endFlag: boolean) {
    if (endFlag) {
      this.dataService.currentStage = 1;
      this.scene = 5;
      this.dataService.currentScene = this.scene;
      this.cacheService.save({
        key: getCacheKey(this.dataService.schoolID, this.dataService.childID),
        data: getCacheData(this.dataService),
      });
    }
  }

  scene5(endFlag: boolean) {
    if (endFlag) {
      this.scene = 13;
      this.dataService.currentScene = this.scene;
      this.cacheService.save({
        key: getCacheKey(this.dataService.schoolID, this.dataService.childID),
        data: getCacheData(this.dataService),
      });
    }
  }
  scene6(endFlag: boolean){
    if (endFlag) {
      this.dataService.currentScene = this.scene;
      this.cacheService.save({
        key: getCacheKey(this.dataService.schoolID, this.dataService.childID),
        data: getCacheData(this.dataService),
      });
      this.checkIfUserAlreadySubimet();
    }
  
}

  scene7(openingEnded: Credentials){
      this.scene = 4;
      this.dataService.attention1 = openingEnded.attention1;
      this.dataService.attention2 = openingEnded.attention2;
      this.dataService.currentScene = this.scene;
      this.cacheService.save({
        key: getCacheKey(this.dataService.schoolID, this.dataService.childID),
        data: getCacheData(this.dataService),
      });
  }

  scene8(creds: Credentials){
      this.scene = 9;
      this.dataService.lab = creds.lab;
  }

  scene9(creds: Credentials){
    this.dataService.applanguages1 = creds.applanguages1;
    this.dataService.applanguages2 = null;

    if(creds.applanguages1 == "Arabic"){
      this.scene = 12;
    }else{
      this.scene = 11;
    }
  }


  scene10(creds: Credentials){
    this.scene = 1;

    this.dataService.parents = creds.parents;
    this.dataService.parentage = creds.parentage;
    this.dataService.childgender = creds.childgender;
    this.dataService.childage = creds.childage;
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
    this.scene = 11;
 
  }
  scene13(creds: Credentials){
    this.dataService.attention3 = creds.attention3;
    this.scene = 6
  }

  checkIfUserAlreadySubimet(){
    const headers = {'x-hasura-admin-secret': 
    'L2WPqUDgvdWhGveSYAjMOG3l6jbbxSb0jZk7q1rii03COuV0LQr2xCQIMJHmq0JO'};

    this.http
      .get<any>(
        `https://research.hasura.app/api/rest/user-data-by-ip/${this.dataService.userip}`,
        {
          headers,
        }
      )
      .subscribe({
        next: (data) => {
          if (data.research.length && this.dataService.lab !== "texas" &&
           this.dataService.userip !== undefined && this.dataService.childID !== "26121989"){
            console.error('user already submitted before');
          } else {
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
  
  calculateData() {
    const finalData = {
      schoolID: this.dataService.schoolID,
      childID: this.dataService.childID,
      gender: this.dataService.gender,
      rich_strong_1: this.dataService.pbvs1.rank,
      succeed_more_2: this.dataService.pbvs2.rank,
      enjoy_life_3: this.dataService.pbvs3.rank,
      exciting_things_4: this.dataService.pbvs4.rank,
      learn_new_5: this.dataService.pbvs5.rank,
      care_for_myself_6: this.dataService.pbvs6.rank,
      keep_rules_7: this.dataService.pbvs7.rank,
      pray_god_8: this.dataService.pbvs8.rank,
      help_others_9: this.dataService.pbvs9.rank,
      be_friend_10: this.dataService.pbvs10.rank,
      be_leader_11: this.dataService.pbvs11.rank,
      show_everyone_12: this.dataService.pbvs12.rank,
      have_fun_13: this.dataService.pbvs13.rank,
      adventures_14: this.dataService.pbvs14.rank,
      imagine_15: this.dataService.pbvs15.rank,
      be_protected_16: this.dataService.pbvs16.rank,
      like_everyone_17: this.dataService.pbvs17.rank,
      learn_what_was_18: this.dataService.pbvs18.rank,
      keep_others_happy_19: this.dataService.pbvs19.rank,
      keep_nature_20: this.dataService.pbvs20.rank,
      lab : this.dataService.lab,
      parents : this.dataService.parents,
      parentage : this.dataService.parentage,
      childgender : this.dataService.childgender,
      applanguages1: this.dataService.applanguages1,
      applanguages2: this.dataService.applanguages2,
      childage : this.dataService.childage,
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
    };
    const reqBody = {
      query: `mutation insertData {
        insert_research_one(
          object: {
            school_id: "${finalData.schoolID}",
            child_id: "${finalData.childID}",
            gender: "${finalData.gender}",
            rich_strong_1: ${finalData.rich_strong_1},
            succeed_more_2: ${finalData.succeed_more_2},
            enjoy_life_3: ${finalData.enjoy_life_3},
            exciting_things_4: ${finalData.exciting_things_4},
            learn_new_5: ${finalData.learn_new_5},
            care_for_myself_6: ${finalData.care_for_myself_6},
            keep_rules_7: ${finalData.keep_rules_7},
            pray_god_8: ${finalData.pray_god_8},
            help_others_9: ${finalData.help_others_9},
            be_friend_10: ${finalData.be_friend_10},
            be_leader_11: ${finalData.be_leader_11},
            show_everyone_12: ${finalData.show_everyone_12},
            have_fun_13: ${finalData.have_fun_13},
            adventures_14: ${finalData.adventures_14},
            imagine_15: ${finalData.imagine_15},
            be_protected_16: ${finalData.be_protected_16},
            like_everyone_17: ${finalData.like_everyone_17},
            learn_what_was_18: ${finalData.learn_what_was_18},
            keep_others_happy_19: ${finalData.keep_others_happy_19},
            keep_nature_20: ${finalData.keep_nature_20},
            lab : ${finalData.lab},
            applanguages1 : ${finalData.applanguages1},
            applanguages2 : ${finalData.applanguages2},
            attention1: ${finalData.attention1}
            attention2: ${finalData.attention2},
            attention3: ${finalData.attention3},
            IP: "${finalData.user_ip}",
            
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
          if (!!data.data?.insert_research_one) {
            this.dataService.dataSavedFlag = true;
            const res = data.data.insert_research_one;
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

  calculateDataDemo() {
    const finalData = {
      lab : this.dataService.lab,
      parents : this.dataService.parents,
      parentage : this.dataService.parentage,
      childgender : this.dataService.childgender,
      applanguages1: this.dataService.applanguages1,
      applanguages2: this.dataService.applanguages2,
      childage : this.dataService.childage,
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
        insert_research_one(
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
          if (!!data.data?.insert_research_one) {
            this.dataService.dataSavedFlag = true;
            const res = data.data.insert_research_one;
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

