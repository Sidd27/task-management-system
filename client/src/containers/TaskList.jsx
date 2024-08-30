import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "../components/Task";
import { deleteTask, fetchTasks, updateTask } from "../reducers/taskReducer";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);

  const searchTerm = useSelector((state) => state.tasks.searchTerm);
  const filter = useSelector((state) => state.tasks.filter);

  // Memoized filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filter === "all") return true;
        if (filter === "completed") return task.status === "completed";
        if (filter === "pending") return task.status === "pending";
        return true;
      })
      .filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [tasks, searchTerm, filter]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [dispatch, status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed")
    return <div className="text-red-600 font-semibold">Error: {error}</div>;

  const onDelete = (task) => {
    dispatch(deleteTask(task.id));
  };

  const onStatusChange = (task, status) => {
    dispatch(
      updateTask({
        ...task,
        status,
      })
    );
  };

  if (filteredTasks.length > 0) {
    return (
      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    );
  } else {
    return <div className="text-gray-600 italic">No Tasks </div>;
  }
};

export default TaskList;
