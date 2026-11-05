// model.ts

// 1. Literal union restricting allowed status values
export type TaskStatus = "todo" | "in-progress" | "done";

// 2. Task interface defining the exact structure of a task
export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

// 3. Add a new task (defaults to status "todo" with dynamic max ID check)
export function addTask(tasks: Task[], title: string): Task[] {
  const maxId = tasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
  const newTask: Task = { id: maxId + 1, title, status: "todo" };
  return [...tasks, newTask];
}

// 4. Mark a specific task as done by ID
export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}

// 5. Filter tasks by a valid TaskStatus
export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}

// 6. Custom operation: Remove a task by ID
export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((t) => t.id !== id);
}