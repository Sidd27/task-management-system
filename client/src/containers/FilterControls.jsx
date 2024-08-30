import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSearchTerm } from "../reducers/taskReducer";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Search, Close } from "@mui/icons-material";

const FilterControls = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.tasks.searchTerm);
  const filter = useSelector((state) => state.tasks.filter);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClearSearch = () => {
    dispatch(setSearchTerm(""));
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="flex justify-between items-center">
      <FormControl className="bg-white w-64" size="small">
        <TextField
          type="text"
          label="Search tasks"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  {searchTerm ? (
                    <IconButton onClick={handleClearSearch}>
                      <Close />
                    </IconButton>
                  ) : (
                    <Search />
                  )}
                </InputAdornment>
              ),
            },
          }}
        />
      </FormControl>
      <div className="w-36">
        <FormControl className="bg-white" size="small" fullWidth>
          <InputLabel id="task-status-label">Status</InputLabel>
          <Select
            labelId="task-status-label"
            id="task-status"
            value={filter}
            label="Age"
            onChange={handleFilterChange}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default FilterControls;
