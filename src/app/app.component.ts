import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonService } from './shared/services/common.service';
import { DataService } from './shared/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'research-tasks-multi-lang';


  constructor(private commonService:CommonService){}

ngOnInit() {
  this.commonService.updateIPAddress();
}

}
