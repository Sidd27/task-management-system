import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Header from "../components/Header";
import CompletedPendingChart from "../containers/CompletedPendingChart";
import TaskList from "../containers/TaskList";
import { useEffect, useState } from "react";
import CreateTaskModal from "../containers/CreateTaskModal";
import { useDispatch } from "react-redux";
import { resetTasks } from "../reducers/taskReducer";
import FilterControls from "../containers/FilterControls";

function Home() {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    return () => {
      dispatch(resetTasks()); // Dispatch reset action on unmount
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen relative">
      <Header />
      <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Mobile-first: Chart first, then filter and task list */}
        <div className="lg:col-span-2 flex flex-col space-y-4">
          <div className="lg:hidden">
            <CompletedPendingChart />
          </div>
          <FilterControls />
          <TaskList />
        </div>

        {/* Desktop view: Chart on the right */}
        <div className="hidden lg:block">
          <CompletedPendingChart />
        </div>
      </div>
      <div className="fixed bottom-6 right-6">
        <Fab color="primary" aria-label="add" onClick={handleOpenModal}>
          <AddIcon />
        </Fab>
      </div>
      <CreateTaskModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default Home;
