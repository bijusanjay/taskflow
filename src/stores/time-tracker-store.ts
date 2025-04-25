import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface TimeEntry {
  id: string
  taskId: string
  userId: string
  startTime: number
  endTime?: number
  duration: number
  isRunning: boolean
}

interface TimeTrackerState {
  timeEntries: TimeEntry[]
  addTimeEntry: (entry: Omit<TimeEntry, 'id'>) => void
  updateTimeEntry: (id: string, updates: Partial<TimeEntry>) => void
  getTaskTimeEntries: (taskId: string) => TimeEntry[]
  getUserTimeEntries: (userId: string) => TimeEntry[]
  getTotalTimeForTask: (taskId: string) => number
}

export const useTimeTrackerStore = create<TimeTrackerState>()(
  persist(
    (set, get) => ({
      timeEntries: [],
      addTimeEntry: entry =>
        set(state => ({
          timeEntries: [
            ...state.timeEntries,
            { ...entry, id: Math.random().toString(36).substr(2, 9) },
          ],
        })),
      updateTimeEntry: (id, updates) =>
        set(state => ({
          timeEntries: state.timeEntries.map(entry =>
            entry.id === id ? { ...entry, ...updates } : entry
          ),
        })),
      getTaskTimeEntries: taskId => get().timeEntries.filter(entry => entry.taskId === taskId),
      getUserTimeEntries: userId => get().timeEntries.filter(entry => entry.userId === userId),
      getTotalTimeForTask: taskId =>
        get()
          .timeEntries.filter(entry => entry.taskId === taskId)
          .reduce((total, entry) => total + entry.duration, 0),
    }),
    {
      name: 'time-tracker-storage',
    }
  )
)
