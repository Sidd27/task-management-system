import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { useState } from "react";

const Task = ({ task, onDelete, onStatusChange }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(task);
    handleClose();
  };
  return (
    <>
      <Card>
        <CardHeader
          title={task.title}
          subheader={
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {format(new Date(task?.created_at), "hh:mm a | MMMM dd, yyyy")}
            </Typography>
          }
          action={
            task.status === "pending" ? (
              <Chip label="Pending" variant="outlined" color="primary" />
            ) : (
              <Chip label="Completed" color="primary" />
            )
          }
        />
        <CardContent>
          <Typography variant="body1">{task.description}</Typography>
        </CardContent>
        <CardActions>
          {task.status !== "completed" ? (
            <Button
              size="small"
              onClick={() => {
                onStatusChange(task, "completed");
              }}
            >
              Mark Complete
            </Button>
          ) : (
            <Button
              size="small"
              onClick={() => {
                onStatusChange(task, "pending");
              }}
            >
              Mark Pending
            </Button>
          )}
          <Button size="small" color="error" onClick={handleClickOpen}>
            Delete
          </Button>
        </CardActions>
      </Card>
      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the task{" "}
            <span className="text-black">{`"${task.title}"`}</span>? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Task;

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["pending", "completed"]),
  }),
  onDelete: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};
