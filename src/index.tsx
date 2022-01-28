import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./components/App/App";
import "./index.scss";
import Web3ContextProvider from "./shared/Web3Context";
import TasksContextProvider from "./shared/TasksContext";

declare var window: Window;

const appInit = () => {
  ReactDOM.render(
    <Web3ContextProvider>
      <TasksContextProvider>
        <App />
      </TasksContextProvider>
    </Web3ContextProvider>,
    document.getElementById("root")
  );
};

appInit();
