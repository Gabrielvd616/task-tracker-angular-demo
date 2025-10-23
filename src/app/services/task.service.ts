import { Injectable } from '@angular/core';
import { Task } from '../interfaces/Task';
// import { TASKS } from '../mock-tasks';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITaskService } from '../interfaces/ITaskService';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService implements ITaskService {
  private apiUrl = 'http://localhost:5000/tasks';
  private enableJsonServerExports = false;
  private tasks: Task[] = [
    {
      text: "Doctor's Appointment",
      day: '2017-06-01T08:30',
      reminder: false,
      id: 1,
    },
    {
      text: 'Food Shopping',
      day: '2017-06-02T12:00',
      reminder: true,
      id: 3,
    },
    {
      text: 'Homework',
      day: '2017-06-03T09:30',
      reminder: false,
      id: 4,
    },
    {
      text: 'Review Forms',
      day: '2022-06-30T15:30',
      reminder: true,
      id: 5,
    },
  ];

  constructor(private http: HttpClient) {}

  // Installed json-server with command:
  // npm install json-server
  // Ran json-server with command (specified in package.json):
  // npm run server
  getTasks(): Observable<Task[]> {
    // const tasks = of(TASKS);
    // return tasks;
    if (this.enableJsonServerExports) {
      return this.http.get<Task[]>(this.apiUrl);
    } else {
      return of<Task[]>(this.tasks);
    }
  }

  deleteTask(task: Task): Observable<Task> {
    if (this.enableJsonServerExports) {
      const url = `${this.apiUrl}/${task.id}`;
      return this.http.delete<Task>(url);
    } else {
      const index = this.tasks.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
      return of<Task>(task);
    }
  }

  updateTaskReminder(task: Task): Observable<Task> {
    if (this.enableJsonServerExports) {
      const url = `${this.apiUrl}/${task.id}`;
      return this.http.put<Task>(url, task, httpOptions);
    } else {
      const index = this.tasks.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        this.tasks[index] = { ...this.tasks[index], ...task };
      }
      return of<Task>(task);
    }
  }

  addTask(task: Task) {
    if (this.enableJsonServerExports) {
      return this.http.post<Task>(this.apiUrl, task, httpOptions);
    } else {
      const maxId =
        this.tasks.length > 0
          ? Math.max(...this.tasks.map((t) => t.id ?? 0))
          : 0;
      task = { ...task, id: maxId + 1 };
      this.tasks.push(task);
      return of<Task>(task);
    }
  }
}
