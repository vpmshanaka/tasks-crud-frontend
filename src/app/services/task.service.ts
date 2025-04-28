import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, NEVER, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Task ,CreateTask} from '../models/task';
import { ApiResponse } from '../helpers/api-response';
import { TaskRequest } from '../models/task-request';
import { SnackBarService } from './utility/snack-bar.service';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl+'/tasks';  


  constructor(
    private http: HttpClient,
    private snackbar: SnackBarService,
  ) {}

  create(createTask: CreateTask): Observable<CreateTask> {
    return this.http.post<ApiResponse<CreateTask>>(this.apiUrl, createTask).pipe(
      map((response) => {
        if (response.success) {
          this.snackbar.showInfo(response.message);
          return response.data; // Return the created task
        } else {
          this.snackbar.showError(response.message);
          throw new Error(response.message);
        }
      }),
      catchError((error) => {
        console.log(error);
        this.snackbar.showError(
          error.statusText ?? `Hmmm, we've encountered an error, please try again.`
        );
        return NEVER;  // Stop observable on error
      })
    );
  }
  

  // Update a task
  // update1(id: number, task: Task): Observable<Task> {
  //   return this.http.put<Task>(`${this.apiUrl}/${id}`, task).pipe(
  //     catchError((error) => {
  //       console.error('Error updating task:', error);
  //       throw error; // Or handle error gracefully
  //     })
  //   );
  // }

  update(id: number, task: Task): Observable<Task> {
    return this.http.put<ApiResponse<Task>>(`${this.apiUrl}/${id}`, task).pipe(
      map((response) => {
        // Show appropriate snackbar messages
        if (response.success) {
          this.snackbar.showInfo(response.message);
          return response.data; // Return the actual task data
        } else {
          this.snackbar.showError(response.message);
          throw new Error(response.message); // Throw an error for unsuccessful responses
        }
      }),
      catchError((error) => {
        console.log(error.message);
        this.snackbar.showError(
          error.statusText ?? `Hmmm, we've encountered an error, please try again.`
        );
        return NEVER;  // Never emit on error
      })
    );
  }

  // Delete a task
  delete(id: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        // Show appropriate snackbar messages
        if (response.success) {
          this.snackbar.showInfo(response.message);  // Success message
          return response.data;  // Return data if needed
        } else {
          this.snackbar.showError(response.message);  // Error message from backend
          throw new Error(response.message);  // Throw error for failure
        }
      }),
      catchError((error) => {
        console.log(error.message);
        this.snackbar.showError(
          error.statusText ?? `Hmmm, we've encountered an error, please try again.`
        );
        return NEVER;  // Never emit on error
      })
    );
  }
  

  // // Mark a task as completed (PATCH request)
  // complete(id: number): Observable<any> {
  //   return this.http.patch<any>(`${this.apiUrl}/${id}/complete`, {});
  // }

  // Get all tasks
  getAll(): Observable<Task[]> {
    return this.http.get<ApiResponse<Task[]>>(this.apiUrl).pipe(
      map((response) => {
        // Make sure to extract the 'data' field that contains the actual task data
        if (response.success) {
          return response.data; // Return only the 'data' field
        } else {
          throw new Error('Failed to load data');
        }
      }),
      catchError((error) => {
        console.error('Error:', error);
        throw error; // Or handle error gracefully
      })
    );
  }
  

  // Get a single task
  get(id: number): Observable<TaskRequest> {
    return this.http.get<ApiResponse<TaskRequest>>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        // Make sure to extract the 'data' field that contains the actual task data
        if (response.success) {
          return response.data; // Return only the 'data' field which contains the task
        } else {
          throw new Error('Failed to load task');
        }
      }),
      catchError((error) => {
        console.error('Error fetching task:', error);
        throw error; // Or handle error gracefully
      })
    );
  }
  
  
}
