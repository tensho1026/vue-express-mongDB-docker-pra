<script setup lang="ts">
import { onMounted, ref } from "vue";
import AddButton from "./components/buttons/AddButton.vue";

type Todo = {
  _id: string;        
  text: string;
  createdAt: string;
  updatedAt: string;
};

const todos = ref<Todo[]>([]);
const newTodo = ref("");

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:3000/api/todos");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: Todo[] = await res.json();
    todos.value = data;         
  } catch (e) {
    console.error(e);
  }
});

const handleAdd = async () => {
  const text = newTodo.value.trim();
  if (!text) return;
  try {
    const res = await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const created: Todo = await res.json();
    todos.value.push(created);    
    newTodo.value = "";
  } catch (e) {
    console.error(e);
  }
};

const handleRemove = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    todos.value = todos.value.filter((t) => t._id !== id);
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <p class="font-bold text-[20px] text-center">
      Vue.js Express.js MongoDB Docker Todo App
    </p>

    <input type="text" placeholder="文字を入力" v-model="newTodo" />

    <!-- kebab-case で props -->
    <AddButton message="追加" style-name="text-green-500" :event-function="handleAdd" />

    <ul class="space-y-1">
      <li v-for="todo in todos" :key="todo._id" class="flex items-center gap-2">
        <span>{{ todo.text }}</span>
        <button class="text-sm text-red-500" @click="handleRemove(todo._id)">削除</button>
      </li>
    </ul>
  </div>
</template>
