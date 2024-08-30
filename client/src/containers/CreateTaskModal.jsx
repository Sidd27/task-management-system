import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { addTask } from "../reducers/taskReducer";
import { validateField, validateForm } from "../utils/validation";

const CreateTaskModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({ title: "", description: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Validation rules for the form fields
  const validationRules = {
    title: { required: true },
    description: { required: true },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setFormErrors({
      ...formErrors,
      [name]: validateField(name, value, validationRules[name]),
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const formErrors = validateForm(values, validationRules);
    if (Object.keys(formErrors).length === 0) {
      dispatch(addTask({ ...values }));
      setValues({ title: "", description: "" });
      onClose();
    } else {
      setFormErrors(formErrors);
    }
  };

  useEffect(() => {
    if (!open) {
      setIsSubmitted(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          name="title"
          fullWidth
          variant="outlined"
          value={values.title}
          onChange={handleChange}
          error={isSubmitted && !!formErrors.title}
          helperText={isSubmitted && formErrors.title}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          variant="outlined"
          name="description"
          multiline
          rows={4}
          value={values.description}
          onChange={handleChange}
          error={isSubmitted && Boolean(formErrors.description)}
          helperText={isSubmitted && formErrors.description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CreateTaskModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateTaskModal;
