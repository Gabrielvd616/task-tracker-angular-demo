import { Task } from './Task';
import { Observable } from 'rxjs';

export interface ITaskService {
  getTasks(): Observable<Task[]>;
  deleteTask(task: Task): Observable<Task>;
  updateTaskReminder(task: Task): Observable<Task>;
  addTask(task: Task): Observable<Task>;
}
