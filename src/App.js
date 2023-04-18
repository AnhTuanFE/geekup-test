import "./App.css";
import { Routes, Route, useRoutes } from "react-router-dom";
import Home from "./pages/home";
import Todo from "./pages/todo";
import HeaderOnly from "./layouts/HeaderOnly/HeaderOnly";
function App() {
  const elements = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/todo",
      element: <Todo />,
    },
  ]);
  return (
    <div className="App">
      <HeaderOnly>{elements}</HeaderOnly>
    </div>
  );
}

export default App;
