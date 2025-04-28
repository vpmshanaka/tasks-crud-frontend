export interface Task {
  id: number;
  title: string;
  description: string;
  user_name: string;
  status: string;
  // created_at: string;
}

export interface CreateTask {
  title: string;
  description: string;
}

