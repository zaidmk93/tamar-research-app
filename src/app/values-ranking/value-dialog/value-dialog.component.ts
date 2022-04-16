import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AudioService } from 'src/app/shared/services/audio.service';
import { DataService, Pbvs } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-value-dialog',
  templateUrl: './value-dialog.component.html',
  styleUrls: ['./value-dialog.component.scss'],
})
export class ValueDialogComponent implements OnInit {
  ref: MatDialogRef<any>;
  @ViewChild(TemplateRef) template: TemplateRef<any>;
  config = {
    disableClose: false,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
  };
  @Output() clicked: EventEmitter<Pbvs> = new EventEmitter();
  value: Pbvs;
  $audio: Subscription;

  constructor(
    public dialog: MatDialog,
    private audioService: AudioService,
    public dataService: DataService
  ) {}

  ngOnInit() {}

  public open(value: Pbvs) {
    this.value = value;
    this.ref = this.dialog.open(this.template, this.config);
    this.audioService.setAudio(
      `../../assets/values-ranking/values_aud/${
        this.dataService.culture === 'jewish' ? 'heb' : 'arab'
      }/chosen-${this.dataService.gender}.mp3`
    );
    setTimeout(() => {
      this.$audio = this.audioService.getPlayerStatus().subscribe((res) => {
        if (res === 'ended') {
          this.$audio.unsubscribe();
          this.audioService.setAudio(
            `../../assets/values-ranking/values_aud/${
              this.dataService.culture === 'jewish' ? 'heb' : 'arab'
            }/${value.audioLink}`
          );
          if (this.dataService.firstTimeV) {
            this.dataService.firstTimeV = false;
            setTimeout(() => {
              this.$audio = this.audioService.getPlayerStatus().subscribe((res) => {
                if (res === 'ended') {
                  this.$audio.unsubscribe();
                  this.audioService.setAudio(
                    `../../assets/values-ranking/guidance_aud/${
                      this.dataService.culture === 'jewish' ? 'heb' : 'arab'
                    }/inst-v-explenation-${this.dataService.gender}.mp3`
                  );
                }
              });
            }, 400);
          }
        }
      });
    }, 400);
  }

  confirm() {
    this.clicked.emit(this.value);
    this.$audio.unsubscribe();
    this.close();
  }

  cancel() {
    this.clicked.emit(null);
    this.$audio.unsubscribe();
    this.close();
  }

  close() {
    this.ref.close();
  }
}
