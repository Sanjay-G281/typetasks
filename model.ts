// model.ts

// 1. Literal union restricting allowed status values
type TaskStatus = "todo" | "in-progress" | "done";

// 2. Task interface defining the exact structure of a task
interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

let nextId = 1;

// 1. Add a new task (defaults to status "todo")
function addTask(tasks: Task[], title: string): Task[] {
  const newTask: Task = { id: nextId++, title, status: "todo" };
  return [...tasks, newTask];
}

// 2. Mark a specific task as done by ID
function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}

// 3. Filter tasks by a valid TaskStatus
function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}

// 4. Custom operation: Remove a task by ID
function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((t) => t.id !== id);
}