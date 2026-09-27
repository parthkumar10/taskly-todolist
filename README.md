# ✅ TASKLY

**TASKLY** is a simple personal task manager built to demonstrate real application logic and user interaction.

Users can create tasks, assign priorities, mark tasks as completed, filter tasks, delete tasks, and keep their tasks saved even after refreshing the browser.

## 🚀 Live Demo

**[Open TASKLY](https://taskly-todo.pages.dev)**

## ✨ Features

- ➕ Create tasks
- 🎯 Set task priority — Low, Medium, High
- ✅ Mark tasks as completed
- ↩️ Undo completed tasks
- 🗑️ Delete tasks
- 🔎 Filter by All, Active, or Completed
- 💾 Persist tasks using browser localStorage
- 🔄 Tasks remain after refreshing the page
- 📱 Responsive design

## 🛠️ Tech Stack

- **React**
- **JavaScript**
- **HTML**
- **CSS**
- **localStorage**
- **Cloudflare Pages**

## 🔄 How It Works

```text
User creates a task
       ↓
Task is added to application state
       ↓
Task is saved to localStorage
       ↓
User can complete, undo, filter, or delete it
       ↓
Changes are persisted
       ↓
Tasks remain after browser refresh
```

## 📌 Scope

TASKLY is intentionally a simple personal task manager.

It does not use:

- Authentication
- Backend services
- Cloud database
- AI
- Cloud synchronization
- Calendar or team features

The project focuses on understanding **application state, user interactions, CRUD-style operations, filtering, and browser persistence**.

## 💻 Run Locally

```bash
git clone https://github.com/parthkumar10/taskly-todolist.git
cd taskly-todolist/frontend
npm install
npm start
```

The application will run locally at:

```text
http://localhost:3000
```

## 🌐 Deployment

The application is deployed using **Cloudflare Pages**.

**Live Demo:** https://taskly-todo.pages.dev

## 👨‍💻 Author

**Parth Kumar**

GitHub: https://github.com/parthkumar10
