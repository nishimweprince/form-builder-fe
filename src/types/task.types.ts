export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED"
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH"
 
export interface TaskTypes {
    id: string;
    referenceId: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    createdById: string;
    assignedToId: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateTaskPayload {
    title: string;
    description: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    priority: "LOW" | "MEDIUM" | "HIGH";
    assignedToId?: string;
  }