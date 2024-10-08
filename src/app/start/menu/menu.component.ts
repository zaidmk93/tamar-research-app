import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Credentials } from 'src/app/models';
import { DemographicData } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  name : string;
  demodata = new DemographicData();

  @Output() gotCreds: EventEmitter<Credentials> = new EventEmitter<Credentials>();

  creds: Credentials = {
    schoolID: '',
    childID: 'a',
    gender: 'M',
    childgender: '',
    parents: '',
    parentage: '',
    childage: '',
    childageInMonths: '',
    monthchild: '',
    classs: '',
    living: '',
    education1: '',
    profession1: '',
    levelofreligiousty: '',
    education2: '',
    profession2: '',
    languages: '',
    extralanguage: '',
    economic_level: '',
    lab : 'Aysheh',
    applanguages1:'',
    applanguages2:'',
    attention1:'',
    attention2:'',
    attention3:'',
    prizeDonated: '',
    appearedpyramid:'',
    snakeScore:''
  };

  constructor(private route: ActivatedRoute ) { 
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
        this.name = params.name;
        this.demodata = params.name;
      }
    );    
  }
  clicked(lang: string){
    this.creds.applanguages1 = lang;
    this.gotCreds.emit(this.creds);
  }

}
