import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Menu2Component } from './start/menu2/menu2.component';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ValuesRankingComponent } from './values-ranking/values-ranking.component';
import { MenuComponent } from './start/menu/menu.component';
import { LabComponent } from './start/lab/lab.component';
import { ValuesSet1Component } from './values-ranking/values-set1/values-set1.component';
import { RankSet1Component } from './values-ranking/rank-set1/rank-set1.component';
import { ValuesSet2Component } from './values-ranking/values-set2/values-set2.component';
import { RankSet2Component } from './values-ranking/rank-set2/rank-set2.component';
import { SummaryComponent } from './values-ranking/summary/summary.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValueDialogComponent } from './values-ranking/value-dialog/value-dialog.component';
import { PyramidViewComponent } from './values-ranking/pyramid-view/pyramid-view.component';
import { ConcentComponent } from './start/concent/concent.component';
import { DemographicComponent } from './start/demographic/demographic.component';
import { AttentiontaskComponent } from './values-ranking/attention-task/Attention-task.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    AppComponent,
    ValuesRankingComponent,
    MenuComponent,
    Menu2Component,
    LabComponent,
    ValuesSet1Component,
    RankSet1Component,
    ValuesSet2Component,
    RankSet2Component,
    SummaryComponent,
    ValueDialogComponent,
    PyramidViewComponent,
    ConcentComponent,
    LabComponent,
    DemographicComponent,
    AttentiontaskComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
