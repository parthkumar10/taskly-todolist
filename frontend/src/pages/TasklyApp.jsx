import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  CheckCircle2,
  ListTodo,
  Plus,
  Trash2,
  Inbox,
  Sparkles,
  CircleDashed,
} from "lucide-react";

const STORAGE_KEY = "taskly_tasks_v1";
const MAX_TITLE = 100;
const PRIORITIES = ["Low", "Medium", "High"];

const PRIORITY_STYLES = {
  Low: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  Medium: { badge: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  High: { badge: "bg-rose-50 text-rose-700 border-rose-200", dot: "bg-rose-500" },
};

const PRIORITY_RANK = { High: 0, Medium: 1, Low: 2 };

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((t) => t && typeof t.title === "string");
  } catch {
    return [];
  }
}

export default function TasklyApp() {
  const [tasks, setTasks] = useState(loadTasks);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("all");
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const activeCount = useMemo(
    () => tasks.filter((t) => !t.completed).length,
    [tasks]
  );
  const completedCount = tasks.length - activeCount;

  const visibleTasks = useMemo(() => {
    let list = tasks;
    if (filter === "active") list = tasks.filter((t) => !t.completed);
    if (filter === "completed") list = tasks.filter((t) => t.completed);
    return [...list].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      const pr = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
      if (pr !== 0) return pr;
      return b.createdAt - a.createdAt;
    });
  }, [tasks, filter]);

  const addTask = () => {
    const clean = title.trim();
    if (!clean) {
      toast.error("Task can't be empty");
      inputRef.current?.focus();
      return;
    }
    const newTask = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: clean.slice(0, MAX_TITLE),
      priority,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setTitle("");
    setPriority("Medium");
    toast.success("Task added");
    inputRef.current?.focus();
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.success("Task deleted");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  const remaining = MAX_TITLE - title.length;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 min-h-screen flex flex-col">
      {/* Header */}
      <header
        data-testid="taskly-header"
        className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200"
      >
        <div className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-slate-900">
          <span className="grid place-items-center h-9 w-9 rounded-xl bg-slate-900 text-white">
            <ListTodo className="h-5 w-5" />
          </span>
          Taskly
        </div>
        <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold border border-slate-200">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </header>

      {/* Input */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-6">
        <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
          <input
            ref={inputRef}
            data-testid="task-input"
            type="text"
            value={title}
            maxLength={MAX_TITLE}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What needs to be done?"
            className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white focus:outline-none rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all"
          />
          <select
            data-testid="priority-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full sm:w-auto sm:min-w-[120px] bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 font-medium focus:outline-none focus:border-slate-400 cursor-pointer"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <button
            data-testid="add-task-button"
            onClick={addTask}
            className="w-full sm:w-auto sm:min-w-[110px] whitespace-nowrap bg-slate-900 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </button>
        </div>
        {title.length >= MAX_TITLE - 20 && (
          <p className="mt-2 text-xs text-slate-400 px-1">
            {remaining} characters left
          </p>
        )}
      </div>

      {/* Filters + counter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 px-1">
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/60 text-xs font-semibold text-slate-600">
          {[
            { key: "all", label: "All" },
            { key: "active", label: "Active" },
            { key: "completed", label: "Completed" },
          ].map((tab) => (
            <button
              key={tab.key}
              data-testid={`filter-tab-${tab.key}`}
              onClick={() => setFilter(tab.key)}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer select-none ${
                filter === tab.key
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div
          data-testid="active-task-counter"
          className="text-xs sm:text-sm font-medium text-slate-500 flex items-center gap-1.5"
        >
          <CircleDashed className="h-4 w-4" />
          {activeCount} {activeCount === 1 ? "task" : "tasks"} left
        </div>
      </div>

      {/* List */}
      <div className="flex-1">
        {visibleTasks.length === 0 ? (
          <EmptyState filter={filter} hasTasks={tasks.length > 0} />
        ) : (
          <ul className="space-y-2.5 mb-8">
            {visibleTasks.map((task) => (
              <li
                key={task.id}
                data-testid="task-item"
                className="taskly-item-enter group flex items-center justify-between gap-3 p-3.5 sm:p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all"
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <button
                    data-testid="task-checkbox"
                    onClick={() => toggleTask(task.id)}
                    aria-label={task.completed ? "Mark active" : "Mark complete"}
                    className={`mt-0.5 shrink-0 h-5 w-5 rounded-md border-2 grid place-items-center transition-colors cursor-pointer ${
                      task.completed
                        ? "bg-slate-900 border-slate-900 text-white"
                        : "border-slate-300 hover:border-slate-500"
                    }`}
                  >
                    {task.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </button>
                  <span
                    data-testid="task-title"
                    className={`text-sm sm:text-base font-medium break-words leading-snug ${
                      task.completed
                        ? "line-through text-slate-400"
                        : "text-slate-800"
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    data-testid="task-priority"
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full border ${PRIORITY_STYLES[task.priority].badge}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${PRIORITY_STYLES[task.priority].dot}`}
                    />
                    {task.priority}
                  </span>
                  <button
                    data-testid="task-delete-button"
                    onClick={() => deleteTask(task.id)}
                    aria-label="Delete task"
                    className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-all cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="pt-6 mt-auto text-center text-xs text-slate-400 border-t border-slate-200">
        Saved locally in your browser · {completedCount} completed
      </footer>
    </div>
  );
}

function EmptyState({ filter, hasTasks }) {
  let Icon = Inbox;
  let title = "Your list is empty";
  let subtext = "Add your first task above to get started.";

  if (filter === "active" && hasTasks) {
    Icon = Sparkles;
    title = "All caught up!";
    subtext = "You have no active tasks pending. Nice work.";
  } else if (filter === "completed") {
    Icon = CheckCircle2;
    title = "No completed tasks yet";
    subtext = "Finish a task and it will show up here.";
  }

  return (
    <div
      data-testid="empty-state"
      className="py-12 px-4 text-center bg-white/60 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center space-y-3"
    >
      <div className="p-3.5 bg-slate-100 text-slate-400 rounded-2xl">
        <Icon className="h-6 w-6" />
      </div>
      <h2 className="text-base font-semibold text-slate-800">{title}</h2>
      <p className="text-sm text-slate-500 max-w-xs">{subtext}</p>
    </div>
  );
}
