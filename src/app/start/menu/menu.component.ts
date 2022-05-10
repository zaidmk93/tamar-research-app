import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemographicData } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  name : string;
  demodata = new DemographicData();

  constructor(private route: ActivatedRoute ) { 
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
        this.name = params.name;
        this.demodata = params.name;
        console.log(this.name);
      }
    );
    
    // if (!!this.schoolID.errors || this.schoolID.value === 0) {
    //   this.invalidSchoolIDFlag = true;
    // } else if (!!this.childID.errors || this.childID.value === 0) {
    //   this.invalidSchoolIDFlag = false;
    //   this.invalidChildIDFlag = true;
    // } else {
    //   this.creds.schoolID = this.schoolID.value;
    //   this.creds.childID = this.childID.value;
    //   this.invalidSchoolIDFlag = false;
    //   this.invalidChildIDFlag = false;
    //   this.gotCreds.emit(this.creds);
    // }

  }

}
