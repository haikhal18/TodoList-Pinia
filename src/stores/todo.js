// src/stores/todo.js
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: [
      { id: 1, text: 'Belajar Pinia', completed: false },
      { id: 2, text: 'Membuat aplikasi Todo List', completed: false },
      { id: 3, text: 'Istirahat sejenak', completed: true }
    ],
    nextId: 4
  }),

  getters: {
    incompleteTasksCount: (state) => {
      return state.tasks.filter(task => !task.completed).length
    },
    incompleteTasks: (state) => {
      return state.tasks.filter(task => !task.completed)
    }
  },

  actions: {
    addTask(text) {
      if (text.trim() === '') return
      this.tasks.push({
        id: this.nextId++,
        text: text,
        completed: false
      })
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id)
    },

    toggleTaskCompletion(id) {
      const task = this.tasks.find(task => task.id === id)
      if (task) {
        task.completed = !task.completed
      }
    },

    // Aksi baru untuk mengedit tugas
    editTask(id, newText) {
      const task = this.tasks.find(task => task.id === id)
      if (task && newText.trim() !== '') {
        task.text = newText.trim()
      }
    }
  }
})