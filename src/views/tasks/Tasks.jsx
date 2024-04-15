import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import {
  Button,
  Modal,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  MenuItem,
} from "@mui/material";

import "./Tasks.css";
import axiosClient from "../../axiosClient";
import moment from "moment";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  backgroundColor: "white",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Tasks() {
  const [mainHeight, setMainHeight] = useState("100vh");
  const [tasks, setTasks] = useState([]);
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [isNew, setIsNew] = useState(false);
  const [selectedDateTasks, setSelectedDateTasks] = useState([]);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const handleOpen = function (task, create) {
    if (create) {
      setIsNew(true);
      setSelectedTask({});
    } else {
      setIsNew(false);
      setSelectedTask(task);
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setCalendarModalOpen(false);
  };

  useEffect(() => {
    const navHeight = document.querySelector(".navbar").offsetHeight;
    setMainHeight(`calc(100vh - ${navHeight}px)`);
    getTasks();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
    const handleSearchSubmit = (event) => {
      event.preventDefault();
    
      const params = new URLSearchParams();
      if (searchTerm) params.append('query', searchTerm);
      if (filterDifficulty) params.append('difficulty', filterDifficulty);
    
      axiosClient
        .get(`/tasks/search?${params.toString()}`, { withCredentials: true })
        .then((response) => {
          setTasks(response.data.data.tasks); // Assuming this is the correct path to your data
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            // If no tasks are found, set the tasks state to an empty array
            setTasks([]);
          } else {
            // For all other errors, log them or show a user-friendly message
            console.error("Error fetching tasks", error.response || error.message);
          }
        });
    };

  const getTasks = () => {
    axiosClient
      .get("/tasks", { withCredentials: true })
      .then((response) => {
        console.log(response.data.data.tasks);
        setTasks(response.data.data.tasks);
      })
      .catch((error) => {
        console.log("Error fetching tasks", error.message);
      });
  };

  const filterTasksForDate = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const filteredTasks = tasks.filter(
      (task) => moment(task.deadline).format("YYYY-MM-DD") === formattedDate
    );
    return filteredTasks;
  };

  // Handle click on a date
  const handleDateClick = (date) => {
    const tasksForDate = filterTasksForDate(date);
    setSelectedDateTasks(tasksForDate);
    setCalendarModalOpen(true);
  };

  // Customize the tileContent of the Calendar component
  const customTileContent = ({ date, view }) => {
    if (view === "month") {
      const dateKey = moment(date).format("YYYY-MM-DD");
      const tasksForDate = filterTasksForDate(date);
      if (tasksForDate.length > 0) {
        return (
          <>
            <div
              onClick={() => handleDateClick(date)}
              style={{
                backgroundColor: "#f50057",
                borderRadius: "10px",
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            >
              <strong style={{ color: "#fff" }}>
                {tasksForDate.length} Task(s)
              </strong>
            </div>

            <Modal
              open={calendarModalOpen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                {selectedDateTasks.map((task) => (
                  <div key={task.id} style={{ borderBottom: "1px solid #333" }}>
                    <p>Title: {task.title}</p>
                    <p>Subject: {task.subject}</p>
                    <p>Difficulty: {task.difficulty}</p>
                    <p>Estimated duration: {task.estimatedDuration} days</p>
                    <p>
                      Deadline: {moment(task.deadline).format("MMM Do YYYY")}
                    </p>
                  </div>
                ))}
              </Box>
            </Modal>
          </>
        );
      }
    }
    return null;
  };

  return (
    <>
      <main className="tasks-main" style={{ height: mainHeight }}>
        <div className="tasks-left">
          <Calendar className="calendar" tileContent={customTileContent} />
        </div>
        <div className="tasks-right">
          <div className="tasks-top-menu">
            <p>Tasks</p>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TextField
                id="search"
                label="Search by title or subject"
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
                variant="outlined"
                size="small"
                style={{ flex: 1 }}
              />
              <TextField
                id="difficulty"
                select
                label="Difficulty"
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                variant="outlined"
                size="small"
                style={{ minWidth: '120px' }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </TextField>
              <Button type="submit" variant="contained" color="primary" style={{ padding: '6px 16px' }}>
                Search
              </Button>
            </form>
            <Button
              variant="contained"
              sx={{ backgroundColor: "green", marginLeft: 2 }}
              onClick={() => handleOpen({}, true)}
            >
              Add new task
            </Button>
          </div>
          {tasks.length === 0 ? (
            <p>No tasks to display</p>
          ) : (
            <ul className="task-list">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className="task-list-item"
                  onClick={() => handleOpen(task, false)}
                >
                  <div className="task">
                    <div className="task-top-bar">
                      <p>{task.title}</p>
                      <p>{task.subject}</p>
                    </div>
                    <div className="task-bottom-bar">
                      <p>Difficulty: {task.difficulty}</p>
                      <p>Estimated duration: {task.estimatedDuration} days</p>
                      <p>
                        Deadline: {moment(task.deadline).format("MMM Do YYYY")}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            console.log(formJson);
            if (isNew) {
              axiosClient
                .post(`/tasks`, formJson, {
                  withCredentials: true,
                })
                .then(() => {
                  getTasks();
                });
            } else {
              axiosClient
                .patch(`/tasks/${selectedTask._id}`, formJson, {
                  withCredentials: true,
                })
                .then(() => {
                  getTasks();
                });
            }
            handleClose();
          },
        }}
      >
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="title"
            id="title"
            label="Title"
            type="title"
            fullWidth
            variant="standard"
            defaultValue={selectedTask.title}
          />
          <TextField
            required
            margin="dense"
            name="subject"
            id="subject"
            label="Subject"
            type="title"
            fullWidth
            variant="standard"
            defaultValue={selectedTask.subject}
          />
          <TextField
            required
            margin="dense"
            name="difficulty"
            id="difficulty"
            label="Difficulty"
            type="Select"
            select
            fullWidth
            variant="standard"
            defaultValue={selectedTask.difficulty}
          >
            <MenuItem key="easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="hard" value="hard">
              Hard
            </MenuItem>
          </TextField>
          <TextField
            required
            margin="dense"
            name="estimatedDuration"
            id="estimatedDuration"
            label="Estimated Duration (days)"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={selectedTask.estimatedDuration}
          />
          <TextField
            required
            margin="dense"
            id="deadline"
            name="deadline"
            label="Deadline"
            type="date"
            fullWidth
            variant="standard"
            defaultValue={moment(selectedTask.deadline).format("YYYY-MM-DD")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {!isNew && (
            <Button
              onClick={() => {
                axiosClient
                  .delete(`/tasks/${selectedTask._id}`, {
                    withCredentials: true,
                  })
                  .then(() => {
                    getTasks();
                  });
                handleClose();
              }}
            >
              Delete
            </Button>
          )}
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
