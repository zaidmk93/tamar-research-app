import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
  })
export class CommonService implements OnInit {
    
    constructor(private http:HttpClient,
        public dataService: DataService) { }
    
    ngOnInit() {
    }
    
    updateIPAddress(){
      this.http.get("https://api.ipify.org/?format=json").subscribe((res:any)=>{
        this.dataService.userip = res.ip;
        console.log('hereee ', this.dataService.userip);
      });
    }
}
