"use strict";
// model.ts
Object.defineProperty(exports, "__esModule", { value: true });
let nextId = 1;
// 1. Add a new task (defaults to status "todo")
function addTask(tasks, title) {
    const newTask = { id: nextId++, title, status: "todo" };
    return [...tasks, newTask];
}
// 2. Mark a specific task as done by ID
function completeTask(tasks, id) {
    return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}
// 3. Filter tasks by a valid TaskStatus
function filterByStatus(tasks, status) {
    return tasks.filter((t) => t.status === status);
}
// 4. Custom operation: Remove a task by ID
function deleteTask(tasks, id) {
    return tasks.filter((t) => t.id !== id);
}
//# sourceMappingURL=model.js.map