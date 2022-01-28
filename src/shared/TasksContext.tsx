import React, { useEffect, useMemo, useState } from "react";
import { useWeb3Context } from "./Web3Context";

export interface TaskInterface {
  id: number;
  content: string;
  completed: boolean;
}

export interface Web3ContextValues {
  taskCount: number;
  tasks: TaskInterface[];
}

const tasksContextDefault: Web3ContextValues = {
  taskCount: 0,
  tasks: [],
};

const TasksContext = React.createContext(tasksContextDefault);

export const useTasksContext = () => {
  const tasksContext = React.useContext(TasksContext);
  return tasksContext;
};

export default function TasksContextProvider({
  children,
}: {
  children: React.ReactChild;
}) {
  const [taskCount, setTaskCount] = useState<number>(tasksContextDefault.taskCount);
  const [tasks, setTasks] = useState<TaskInterface[]>(tasksContextDefault.tasks);

  const { todoList } = useWeb3Context();

  const loadTasks = async () => {
    if(todoList != null) {
      console.log("TodoList smart contract loaded.");
      const _taskCount = await todoList.methods.taskCount().call();
      const _tasks = [];
      
      for(let i=1; i <= _taskCount; i++) {
        _tasks.push(await todoList.methods.tasks(i).call());
      }

      setTasks(_tasks);
      setTaskCount(_taskCount);
    } else {
      console.warn("TodoList smart contract not loaded yet.");
    }
  }

  useEffect(() => {
    loadTasks();
  }, [todoList]);
  

  return useMemo(
    () => (
      <TasksContext.Provider
        value={{
          taskCount: taskCount,
          tasks: tasks,
        }}
      >
        {children}
      </TasksContext.Provider>
    ),
    [children, taskCount, tasks]
  );
}
