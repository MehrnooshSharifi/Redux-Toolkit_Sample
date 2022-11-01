import "./App.css";
import { Provider } from "react-redux";
import { store } from "./features/Store";
import AddTodoForm from "./Component/Todos/AddTodoForm";
import TodoList from "./Component/Todos/TodoList";
import TotalCompleteItems from "./Component/Todos/TotalCompleteItem";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AddTodoForm />
        <TodoList />
        <TotalCompleteItems />
      </div>
    </Provider>
  );
}

export default App;
