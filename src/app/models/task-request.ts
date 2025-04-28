export interface TaskRequest {
  title: string;
  description: string;
}

export interface NewTaskRequest {
  title: string;
  description: string;
  user_id: number;
}

