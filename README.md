# TaskFlow - Bug and Task Management System

TaskFlow is a web application built with Next.js for managing tasks and bugs in software development projects. It provides a streamlined interface for developers and managers to track, update, and manage their work items efficiently.

## Features

- **Task & Bug Management**: Create, view, edit, and delete tasks and bugs
- **Project Organization**: Filter tasks and bugs by project
- **Status Tracking**: Track items through different statuses (Open, In Progress, Closed)
- **Priority Management**: Set and filter by priority levels (Low, Medium, High)
- **User Assignment**: Assign tasks and bugs to team members

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: Ant Design
- **State Management**: Zustand
- **Styling**: Tailwind CSS, Styled Components
- **Development Tools**: ESLint, Prettier

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## Getting Started

1. **Clone the repository**

   ```bash
   git clone [Repo URL]
   cd taskflow
   ```

2. **Install dependencies**

   ```bash
   npm install or npm i
   # or
   yarn
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # Reusable components
├── features/           # Feature-based modules
│   └── task-bug/       # Task and bug management
├── stores/             # State management
├── styles/             # Global styles
├── types/              # TypeScript types
└── utils/              # Utility functions
```
