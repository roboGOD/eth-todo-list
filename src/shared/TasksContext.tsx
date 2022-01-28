import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useWeb3Context } from "./Web3Context";

export interface TaskInterface {
  id: number;
  content: string;
  completed: boolean;
}

export interface TasksContextValues {
  taskCount: number;
  tasks: TaskInterface[];
  createTask: (content: string) => void;
  toggleCompleted: (id: number) => void;
}

const tasksContextDefault: TasksContextValues = {
  taskCount: 0,
  tasks: [],
  createTask: () => {},
  toggleCompleted: () => {},
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
  const [taskCount, setTaskCount] = useState<number>(
    tasksContextDefault.taskCount
  );
  const [tasks, setTasks] = useState<TaskInterface[]>(
    tasksContextDefault.tasks
  );

  const { todoList, account } = useWeb3Context();

  const fetchTasks = useCallback(async () => {
    if (todoList != null) {
      console.log("TodoList smart contract loaded.");
      const _taskCount = await todoList.methods.taskCount().call();
      const _tasks = [];

      for (let i = 1; i <= _taskCount; i++) {
        _tasks.push(await todoList.methods.tasks(i).call());
      }

      setTasks(_tasks);
      setTaskCount(_taskCount);
    } else {
      console.warn("TodoList smart contract not loaded yet.");
    }
  }, [todoList, setTasks, setTaskCount]);

  const createTask = useCallback(
    async (content: string) => {
      console.log("Create Task", content);
      if (todoList != null) {
        await todoList.methods.createTask(content).send({ from: account });
        await fetchTasks();
      } else {
        console.warn("TodoList smart contract not loaded yet.");
      }
    },
    [todoList]
  );

  const toggleCompleted = useCallback(
    async (id: number) => {
      if (todoList != null) {
        await todoList.methods.toggleCompleted(id).send({ from: account });
        await fetchTasks();
      } else {
        console.warn("TodoList smart contract not loaded yet.");
      }
    },
    [todoList]
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return useMemo(
    () => (
      <TasksContext.Provider
        value={{
          taskCount: taskCount,
          tasks: tasks,
          createTask: createTask,
          toggleCompleted: toggleCompleted,
        }}
      >
        {children}
      </TasksContext.Provider>
    ),
    [children, taskCount, tasks, createTask, toggleCompleted]
  );
}
