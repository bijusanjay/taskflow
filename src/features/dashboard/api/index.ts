import {DailyTaskCount, dailyTaskCounts, Task, tasks} from '@config/mock-data'
import {AxiosInstance} from 'axios'

class TaskApi {
  api: AxiosInstance

  constructor(apiInstance: AxiosInstance) {
    this.api = apiInstance
  }

  // Get all tasks
  getAllTasks = async (): Promise<
    {data: Task[]; err?: undefined} | {err: string; data?: undefined}
  > => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {data: tasks}
    } catch (error) {
      return {err: 'Failed to fetch tasks'}
    }
  }

  // Get tasks for a specific user
  getUserTasks = async (
    userId: string
  ): Promise<
    {data: Task[]; err?: undefined} | {err: string; data?: undefined}
  > => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const userTasks = tasks.filter((task) => task.assignedTo === userId)
      return {data: userTasks}
    } catch (error) {
      return {err: 'Failed to fetch user tasks'}
    }
  }

  // Get daily task count trend data
  getDailyTaskCounts = async (): Promise<
    {data: DailyTaskCount[]; err?: undefined} | {err: string; data?: undefined}
  > => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {data: dailyTaskCounts}
    } catch (error) {
      return {err: 'Failed to fetch daily task counts'}
    }
  }

  // Update task status
  updateTaskStatus = async (
    taskId: string,
    status: Task['status']
  ): Promise<
    {data: Task; err?: undefined} | {err: string; data?: undefined}
  > => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const taskIndex = tasks.findIndex((task) => task.id === taskId)
      if (taskIndex === -1) {
        return {err: 'Task not found'}
      }

      const updatedTask = {
        ...tasks[taskIndex],
        status,
        updatedAt: new Date().toISOString(),
      }

      tasks[taskIndex] = updatedTask

      return {data: updatedTask}
    } catch (error) {
      return {err: 'Failed to update task status'}
    }
  }
}

export default TaskApi
