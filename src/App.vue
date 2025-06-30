<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Aplikasi Daftar Tugas Saya</h1>
    </header>
    <main class="app-main">
      <TodoList />
    </main>
    <footer class="app-footer">
      <p>&copy; {{ currentYear }} Aplikasi Daftar Tugas. Hak Cipta Dilindungi.</p>
    </footer>
  </div>
</template>

<script setup>
import TodoList from './components/TodoList.vue';
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>