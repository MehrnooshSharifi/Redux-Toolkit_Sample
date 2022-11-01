import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getAsyncTodos = createAsyncThunk(
  "todos/getAsyncTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/todos");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addAsyncTodos = createAsyncThunk(
  "todos/addAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/todos", {
        id: Date.now,
        title: payload.title,
        completed: false,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "todos/toggleAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/todos/${payload.id}`,
        {
          completed: payload.completed,
          title: payload.title,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteAsyncTodo = createAsyncThunk(
  "todos/deleteAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${payload.id}`);
      return {id :payload.id};
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  todos: [],
  error: null,
  loading: false,
};
const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now,
        title: action.payload.title,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    toggleTodos: (state, action) => {
      const selectedTodos = state.todos.find((t) => t.id === action.payload.id);
      selectedTodos.completed = !selectedTodos.completed;
    },
    deleteTodo: (state, action) => {
      const filteredTodo = state.todos.filter(
        (t) => t.id !== action.payload.id
      );
      state.todos = filteredTodo;
    },
  },
  extraReducers: {
    [getAsyncTodos.fulfilled]: (state, action) => {
      return { ...state, todos: action.payload, error: null, loading: false };
    },
    [getAsyncTodos.pending]: (state, action) => {
      return { ...state, todos: [], error: null, loading: true };
    },
    [getAsyncTodos.rejected]: (state, action) => {
      return { ...state, todos: [], error: action.payload.message, loading: false };
    },
    [addAsyncTodos.fulfilled]: (state, action) => {
      state.todos.push(action.payload);
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      const selectedTodos = state.todos.find((t) => t.id === action.payload.id);
      selectedTodos.completed = action.payload.completed;
    },
    [deleteAsyncTodo.fulfilled]: (state, action) => {
      state.todos = state.todos.filter(
        (t) => t.id !== action.payload.id) ;
    },
  },
});

export const { addTodo, toggleTodos, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
