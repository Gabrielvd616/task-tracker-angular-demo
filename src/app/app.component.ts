import { Component } from '@angular/core';
import { TaskService } from './services/task.service';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    { provide: 'ITaskService', useClass: TaskService },
    { provide: 'IUiService', useClass: UiService },
  ],
})
export class AppComponent {}
