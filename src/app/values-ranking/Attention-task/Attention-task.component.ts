import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-Attention-task-from',
  templateUrl: './Attention-task.component.html',
  styleUrls: ['./Attention-task.component.scss']
})
export class AttentiontaskComponent implements OnInit {
  @Input() culture: string;
  @Output() openingEnded: EventEmitter<boolean> = new EventEmitter<boolean>();
    counter = 0
    ngOnInit(): void {
    }

    counterUp(){
      this.counter++;
      if(this.counter == 2){
        this.openingEnded.emit(true);
      }
    }
}

