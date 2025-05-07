export interface Task {
    id: string;
    title: string;
    dueDate?: string;
    priority?: 'low' | 'medium' | 'high';
    completed: boolean;
    subtasks?: Task[];
  }
  