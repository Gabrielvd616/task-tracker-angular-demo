import { Component, Inject, OnInit } from '@angular/core';
import { Task } from '../../interfaces/Task';
import { ITaskService } from 'src/app/interfaces/ITaskService';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  private enableJsonServerExports = false;

  constructor(@Inject('ITaskService') private taskService: ITaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTask(task: Task): void {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  toggleReminder(task: Task): void {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task): void {
    if (this.enableJsonServerExports) {
      this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
    } else {
      this.taskService
        .addTask(task)
        .subscribe((task) =>
          this.tasks.findIndex((t) => t.id === task.id) !== -1
            ? undefined
            : this.tasks.push(task)
        );
    }
  }
}
