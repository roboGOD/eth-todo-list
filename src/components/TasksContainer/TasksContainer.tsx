import React from "react";
import { useTasksContext } from "../../shared/TasksContext";
import Task from "../Task/Task";

export default function TasksContainer() {
  const { tasks, toggleCompleted } = useTasksContext();

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
                handleTaskCompleted={toggleCompleted}
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
                handleTaskCompleted={toggleCompleted}
              />
            );
          })}
      </ul>
    </div>
  );
}
