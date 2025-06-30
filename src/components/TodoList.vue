<template>
  <div class="todo-list-container">
    <h2 class="title">Tugas Harian Anda</h2>

    <div class="input-section">
      <input
        v-model="newTaskText"
        @keyup.enter="handleAddTask"
        placeholder="Apa yang perlu Anda lakukan hari ini?"
        class="task-input"
      />
      <button @click="handleAddTask" class="add-button" :disabled="!newTaskText.trim()">
        ➕ Tambah
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
        Belum Selesai ({{ todoStore.incompleteTasksCount }})
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
        :class="{ completed: task.completed, editing: editingTaskId === task.id }"
      >
        <div class="task-content">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="todoStore.toggleTaskCompletion(task.id)"
            class="task-checkbox"
          />

          <input
            v-if="editingTaskId === task.id"
            v-model="editedTaskText"
            @keyup.enter="saveEdit"
            @keyup.esc="cancelEdit"
            @blur="saveEdit"
            class="edit-input"
          />

          <span v-else class="task-text" @click="startEdit(task)">
            {{ task.text }}
          </span>
        </div>

        <div class="task-actions">
          <button
            v-if="editingTaskId !== task.id"
            @click="startEdit(task)"
            class="action-button edit-button"
            title="Edit Tugas"
          >
            ✏️
          </button>
          <button
            v-if="editingTaskId === task.id"
            @click="saveEdit"
            class="action-button save-button"
            title="Simpan Perubahan"
          >
            ✅
          </button>
          <button
            v-if="editingTaskId === task.id"
            @click="cancelEdit"
            class="action-button cancel-button"
            title="Batal Edit"
          >
            ❌
          </button>
          <button
            @click="todoStore.deleteTask(task.id)"
            class="action-button delete-button"
            title="Hapus Tugas"
          >
            🗑️
          </button>
        </div>
      </li>
      <li v-if="filteredTasks.length === 0" class="empty-message">
        Tidak ada tugas{{ filter !== 'all' ? ` yang ${filter === 'active' ? 'belum selesai' : 'sudah selesai'}` : '' }} saat ini. Yuk, tambahkan!
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
import './TodoList.css';

const todoStore = useTodoStore();
const newTaskText = ref('');
const filter = ref('all');

const editingTaskId = ref(null);
const editedTaskText = ref('');

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

const startEdit = (task) => {
  editingTaskId.value = task.id;
  editedTaskText.value = task.text;
};

const saveEdit = () => {
  if (editingTaskId.value !== null) {
    todoStore.editTask(editingTaskId.value, editedTaskText.value);
    editingTaskId.value = null;
    editedTaskText.value = '';
  }
};

const cancelEdit = () => {
  editingTaskId.value = null;
  editedTaskText.value = '';
};
</script>