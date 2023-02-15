import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './start/menu/menu.component';
import { Menu2Component } from './start/menu2/menu2.component';
import { ConcentComponent } from './start/concent/concent.component';
import { LabComponent } from './start/lab/lab.component';
import { ValuesRankingComponent } from './values-ranking/values-ranking.component';
import { DemographicComponent } from './start/demographic/demographic.component';
import { Attentiontask3Component } from './values-ranking/Attention-task3/Attention-task3.component';


const routes: Routes = [
  {
    path: 'v/:id',
    component: ValuesRankingComponent,
  },
  {
    path: 'lab',
    component: LabComponent,
  },
  {
    path: 'menu2',
    component: Menu2Component,
  }, 
  {
    path: 'concent',
    component: ConcentComponent,
  },
  {
    path: 'demographic',
    component: DemographicComponent,
  },
  {
    path: 'Attention-task3',
    component: Attentiontask3Component,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
