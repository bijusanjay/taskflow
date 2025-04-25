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
}

export const useTimeTrackerStore = create<TimeTrackerState>()(
  persist(
    set => ({
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
    }),
    {
      name: 'time-tracker-storage',
    }
  )
)
