import { type Task, type TaskStatus, addTask, completeTask, filterByStatus, deleteTask } from "./model.js";

let tasks: Task[] = [];
let activeFilter: "all" | TaskStatus = "all";

// Type-cast HTML Elements
const titleInput = document.getElementById("title") as HTMLInputElement;
const statusSelect = document.getElementById("status") as HTMLSelectElement;
const addBtn = document.getElementById("add") as HTMLButtonElement;
const listEl = document.getElementById("list") as HTMLUListElement;
const counterEl = document.getElementById("counter") as HTMLParagraphElement;
const chipBtns = document.querySelectorAll(".chip");

// Event Listener for Adding Tasks
addBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  if (!title) return;

  tasks = addTask(tasks, title);
  
  // Set status if user picked in-progress or done from dropdown
  const selectedStatus = statusSelect.value as TaskStatus;
  const lastTask = tasks[tasks.length - 1];
  if (lastTask && selectedStatus !== "todo") {
    lastTask.status = selectedStatus;
  }

  titleInput.value = "";
  render();
});

// Event Listeners for Filter Chips
chipBtns.forEach((chip) => {
  chip.addEventListener("click", (e) => {
    chipBtns.forEach((c) => c.classList.remove("active"));
    const target = e.currentTarget as HTMLButtonElement;
    target.classList.add("active");

    const filterVal = target.getAttribute("data-filter") as "all" | TaskStatus;
    activeFilter = filterVal;
    render();
  });
});

// Render the UI
function render(): void {
  const visibleTasks = activeFilter === "all" 
    ? tasks 
    : filterByStatus(tasks, activeFilter);

  listEl.innerHTML = "";

  visibleTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";

    const titleSpan = document.createElement("span");
    titleSpan.className = "task-title";
    titleSpan.textContent = task.title;

    const badge = document.createElement("span");
    badge.className = `badge ${task.status}`;
    badge.textContent = task.status;

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";

    if (task.status !== "done") {
      const advanceBtn = document.createElement("button");
      advanceBtn.className = "btn-action";
      advanceBtn.textContent = task.status === "todo" ? "Start →" : "Finish ✓";
      advanceBtn.onclick = () => {
        if (task.status === "todo") {
          task.status = "in-progress";
        } else {
          tasks = completeTask(tasks, task.id);
        }
        render();
      };
      actionsDiv.appendChild(advanceBtn);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.textContent = "✕";
    deleteBtn.onclick = () => {
      tasks = deleteTask(tasks, task.id);
      render();
    };
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(titleSpan);
    li.appendChild(badge);
    li.appendChild(actionsDiv);
    listEl.appendChild(li);
  });

  counterEl.textContent = `${tasks.length} task${tasks.length === 1 ? "" : "s"}`;
}

// Initial render
render();