import React from "react";
import { TaskInterface } from "../../shared/TasksContext";

export default function Task({
  task,
  handleTaskCompleted,
}: {
  task: TaskInterface;
  handleTaskCompleted: (id: number) => void;
}) {
  return (
    <div className="taskTemplate checkbox" id={"task-" + task.id}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => {
            handleTaskCompleted(task.id);
          }}
        />
        <span className="content"> {task.content} </span>
      </label>
    </div>
  );
}
