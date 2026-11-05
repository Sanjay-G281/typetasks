// model.ts
// 3. Add a new task (defaults to status "todo" with dynamic max ID check)
export function addTask(tasks, title) {
    const maxId = tasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
    const newTask = { id: maxId + 1, title, status: "todo" };
    return [...tasks, newTask];
}
// 4. Mark a specific task as done by ID
export function completeTask(tasks, id) {
    return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}
// 5. Filter tasks by a valid TaskStatus
export function filterByStatus(tasks, status) {
    return tasks.filter((t) => t.status === status);
}
// 6. Custom operation: Remove a task by ID
export function deleteTask(tasks, id) {
    return tasks.filter((t) => t.id !== id);
}
//# sourceMappingURL=model.js.map