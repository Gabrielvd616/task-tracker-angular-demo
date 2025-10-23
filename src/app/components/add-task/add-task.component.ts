import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Task } from 'src/app/interfaces/Task';
import { IUiService } from 'src/app/interfaces/IUiService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  text: string = '';
  day: string = new Date().toISOString().slice(0, 16);
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(@Inject('IUiService') private uiService: IUiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.text) {
      alert('Please add a task!');
      return;
    }
    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };
    this.onAddTask.emit(newTask);

    this.text = '';
    this.day = new Date().toISOString().slice(0, 16);
    this.reminder = false;
  }
}
