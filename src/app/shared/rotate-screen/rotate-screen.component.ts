import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rotate-screen',
  templateUrl: './rotate-screen.component.html',
  styleUrls: ['./rotate-screen.component.scss']
})
export class RotateScreenComponent implements OnInit {
  @Input() culture: string;

  constructor() { }

  ngOnInit(): void {
  }

}
