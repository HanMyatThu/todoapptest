import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    const resp = await fetch('http://localhost:8080/api/todos');
    if (resp.ok) {
      const { data } = await resp.json();
      return { todos: data };
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (payload) => {
    const resp = await fetch('http://localhost:8080/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: payload.title }),
    });

    if (resp.ok) {
      const todo = await resp.json();
      return { todo };
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  'todos/completeTodoAsync',
  async (payload) => {
    const resp = await fetch(`http://localhost:8080/api/todos/${payload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: payload.completed }),
    });

    if (resp.ok) {
      const todo = await resp.json();
      return { todo };
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (payload) => {
    const resp = await fetch(`http://localhost:8080/api/todos/${payload.id}`, {
      method: 'DELETE',
    });

    if (resp.ok) {
      return { id: payload.id };
    }
  }
);

export const toggleTaskAsync = createAsyncThunk(
  'todos/toggleTaskAsync',
  async (payload) => {
    const resp = await fetch(
      `http://localhost:8080/api/todos/${payload.todoid}/tasks/${payload.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: payload.completed }),
      }
    );

    if (resp.ok) {
      const task = await resp.json();
      return { task };
    }
  }
);

export const deleteTaskAsync = createAsyncThunk(
  'todos/deleteTaskAsync',
  async (payload) => {
    const resp = await fetch(
      `http://localhost:8080/api/todos/${payload.todoid}/tasks/${payload.id}`,
      {
        method: 'DELETE',
      }
    );

    if (resp.ok) {
      return { id: payload.id };
    }
  }
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      console.log(action.payload);
      const todo = {
        _id: nanoid(),
        title: action.payload.title,
        status: false,
      };
      console.log(todo);
      state.push(todo);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo._id === action.payload.id);
      state[index].completed = action.payload.completed;

      if (action.payload.completed === true) {
        state[index].subtasks.forEach((task) => {
          if (task._id === action.payload.id) {
            task.status = true;
          }
        });
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo._id !== action.payload.id);
    },
    toggleTaskComplete: (state, action) => {
      const index = state.findIndex(
        (todo) => todo._id === action.payload.todoid
      );
      state[index].subtasks.forEach((task) => {
        if (task._id === action.payload.id) {
          task.status = !task.status;
        }
      });
    },
  },
  extraReducers: {
    [getTodosAsync.fulfilled]: (state, action) => {
      return action.payload.todos;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo);
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      const index = state.findIndex(
        (todo) => todo._id === action.payload.todo._id
      );
      state[index].status = action.payload.todo.status;

      state[index].subtasks.forEach((task) => {
        task.status = true;
      });
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      return state.filter((todo) => todo._id !== action.payload.id);
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
