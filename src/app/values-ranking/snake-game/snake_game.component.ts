import { Component, EventEmitter,HostListener, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Credentials } from 'src/app/models';
import { AudioService } from 'src/app/shared/services/audio.service';
import { DataService } from '../../shared/services/data.service';
import { Snake } from './snake';
import { Direction } from './direction';
import { Egg } from './egg';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake_game.component.html',
  styleUrls: ['./snake_game.component.scss'],
})
export class SnakeGameComponent implements OnInit {
  @Input() culture: string;
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
    lab : '',
    applanguages1:'',
    applanguages2:'',
    attention1:'',
    attention2:'',
    attention3:'',
    prizeDonated: '',
    appearedpyramid:'',
    snakeScore:''
  };

  readonly size = 20;
  readonly gridSize = this.size * this.size;
  readonly cellWidth = 15; // in px
  readonly cells = new Array(this.size * this.size);
  readonly timestep = 100;
  readonly ngStyleCells = {
    width: `${this.size * this.cellWidth}px`
  }
  readonly snake: Snake = new Snake();
  readonly direnum = Direction;
  dead = false;

  time = 0;

  egg: Egg = new Egg(this.gridSize);

  paused = false;

  game_started = false;



  constructor(
    // private audioService: AudioService,
    public dataService: DataService
  ) {

    
  }

  ngOnInit(): void {
    // this.startGame();
  }

  startGame(){
    this.game_started = true;
    this.doSpawnEgg();
    const runTime = () => {
      setTimeout(() => {
        this.goStep();
        // this.dead = this.snake.checkDead();
        if((this.time * this.timestep) / 1000 > 60) {
          this.dead = true;

        }
        this.time++;
        if (!this.dead) {
          runTime();
        }
      }, this.timestep)
    }
    runTime();
  }


  gameEnded(){
    this.creds.snakeScore = '' + (this.snake.tail.length + 1);
    this.dataService.snakeScore = this.creds.snakeScore;
    this.gotCreds.emit(this.creds);
  }

  doTogglePause() {
    this.paused = !this.paused;
  }

  doSpawnEgg() {
    this.egg = new Egg(this.gridSize, this.snake);
  }

  goStep() {
    this.snake.goStep(this.size);
    this.eatEgg();
  }

  eatEgg() {
    const pos = this.snake.head.pos;
    if (this.isEgg(pos)) {
      this.doSpawnEgg();
      this.snake.grow();
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeypress(e: KeyboardEvent) {
    if (!this.dead) {
      const dir = KeyCodes[e.keyCode];
      this.changeDirAndGoStep(dir);
    }
  }

  moveUp() {
    this.changeDirAndGoStep(Direction.UP);
  }
  
  moveDown() {
    this.changeDirAndGoStep(Direction.DOWN);
  }
  
  moveLeft() {
    this.changeDirAndGoStep(Direction.LEFT);
  }
  
  moveRight() {
    this.changeDirAndGoStep(Direction.RIGHT);
  }

  changeDirAndGoStep(dir) {
    if (dir) {
      const canChangeDir = this.getCanChangeDir(dir, this.snake.dir);
      if (canChangeDir) {
        this.snake.dir = dir;
        this.goStep();
      }
    }
  }

  getCanChangeDir(d1: Direction, d2: Direction) {
    const dirs = [d1, d2];
    const filteredUpDown = dirs.filter(dir => dir === Direction.UP || dir === Direction.DOWN).length;
    const onlyOneDir = filteredUpDown === 2 || filteredUpDown === 0;
    return !onlyOneDir;
  }

  isEgg(cell) {
    return this.egg.pos === cell;
  }

  ngStyleCell(idx: number) {
    const bgEgg = this.isEgg(idx) ? 'orange' : null;
    const bgSnake = this.snake.isSnakeCell(idx) ? 'red' : null;
    const defaultBg = '#ccc';
    return {
      width: `${this.cellWidth}px`,
      height: `${this.cellWidth}px`,
      background: bgEgg || bgSnake || defaultBg
    }
  }
}

const KeyCodes = {
  37: Direction.LEFT,
  38: Direction.UP,
  39: Direction.RIGHT,
  40: Direction.DOWN
}
   
    
  