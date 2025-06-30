<template>
  <div class="todo-list-container">
    <div class="input-section">
      <input
        v-model="newTaskText"
        @keyup.enter="handleAddTask"
        placeholder="Tambahkan tugas baru..."
        class="task-input"
      />
      <button @click="handleAddTask" class="add-button" :disabled="!newTaskText.trim()">
        Tambah
      </button>
    </div>

    <div class="filter-section">
      <button
        :class="{ active: filter === 'all' }"
        @click="filter = 'all'"
        class="filter-button"
      >
        Semua
      </button>
      <button
        :class="{ active: filter === 'active' }"
        @click="filter = 'active'"
        class="filter-button"
      >
        Belum Selesai
      </button>
      <button
        :class="{ active: filter === 'completed' }"
        @click="filter = 'completed'"
        class="filter-button"
      >
        Selesai
      </button>
    </div>

    <ul class="task-list">
      <li
        v-for="task in filteredTasks"
        :key="task.id"
        class="task-item"
        :class="{ completed: task.completed }"
      >
        <input
          type="checkbox"
          :checked="task.completed"
          @change="todoStore.toggleTaskCompletion(task.id)"
          class="task-checkbox"
        />
        <span class="task-text">{{ task.text }}</span>
        <button @click="todoStore.deleteTask(task.id)" class="delete-button">Hapus</button>
      </li>
      <li v-if="filteredTasks.length === 0" class="empty-message">
        Tidak ada tugas{{ filter !== 'all' ? ` yang ${filter === 'active' ? 'belum selesai' : 'sudah selesai'}` : '' }} saat ini.
      </li>
    </ul>

    <div class="summary">
      Anda memiliki <strong>{{ todoStore.incompleteTasksCount }}</strong> tugas yang belum selesai.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTodoStore } from '../stores/todo';
import './TodoList.css'; // Pastikan jalur ini benar relatif dari TodoList.vue

const todoStore = useTodoStore();
const newTaskText = ref('');
const filter = ref('all');

const handleAddTask = () => {
  if (newTaskText.value.trim()) {
    todoStore.addTask(newTaskText.value);
    newTaskText.value = '';
  }
};

const filteredTasks = computed(() => {
  if (filter.value === 'active') {
    return todoStore.tasks.filter((task) => !task.completed);
  } else if (filter.value === 'completed') {
    return todoStore.tasks.filter((task) => task.completed);
  } else {
    return todoStore.tasks;
  }
});
</script>