import React from "react";
import { useTasksContext } from "../../shared/TasksContext";
import Task from "../Task/Task";

export default function TasksContainer() {
  const { tasks } = useTasksContext();
  const handleTaskCompleted = () => {};
  return (
    <div>
      <ul id="taskList" className="list-unstyled">
        {tasks
          .filter((task) => !task.completed)
          .map((task) => {
            return (
              <Task
                task={task}
                key={task.id}
                handleTaskCompleted={handleTaskCompleted}
              />
            );
          })}
      </ul>
      <ul id="completedTaskList" className="list-unstyled">
        {tasks
          .filter((task) => task.completed)
          .map((task) => {
            return (
              <Task
                task={task}
                key={task.id}
                handleTaskCompleted={handleTaskCompleted}
              />
            );
          })}
      </ul>
    </div>
  );
}
