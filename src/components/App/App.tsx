import React, { useEffect, useState } from "react";
import "./App.scss";
import { useTasksContext } from "../../shared/TasksContext";
import { useWeb3Context } from "../../shared/Web3Context";
import Navbar from "../Navbar/Navbar";
import CreateTask from "../CreateTask/CreateTask";
import TasksContainer from "../TasksContainer/TasksContainer";
import Loader from "../Loader/Loader";

export default function App() {
  const { taskCount } = useTasksContext();
  const { todoList } = useWeb3Context();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(todoList) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [todoList]);
  

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex justify-content-center">
            {loading ? (
              <Loader />
            ) : (
              <div id="content">
                <CreateTask handleCreate={() => {}} />
                <TasksContainer />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
