import { Observable } from 'rxjs';

export interface IUiService {
  toggleAddTask(): void;
  onToggle(): Observable<any>;
}
