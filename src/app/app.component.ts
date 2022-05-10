import { Component } from '@angular/core';
import { DataService } from './shared/services/data.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService, RouterModule],
})
export class AppComponent {
  title = 'research-tasks-multi-lang';

}
