import axiosClient from "../axiosClient";
import { useEffect, useState } from "react";

export default function Test() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    difficulty: "",
    estimatedDuration: "",
    deadline: ""
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

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

const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateTask = () => {
    axiosClient
      .post("/tasks", {
        title: formData.title,
        subject: formData.subject,
        difficulty: formData.difficulty,
        estimatedDuration: parseInt(formData.estimatedDuration),
        deadline: new Date(formData.deadline).toISOString(),
        user: "65f4269e9e8ca78b953c9fb6" // Replace with actual user ID
      }, { withCredentials: true })
      .then((response) => {
        console.log("Task created successfully:", response.data);
        setShowForm(false);
        getTasks(); // Fetch tasks again to update the list
      })
      .catch((error) => {
        console.error("Error creating task:", error.message);
      });
  };
  const handleDeleteTask = (task) => {
    console.log(task);
    axiosClient
      .delete(`tasks/${task.id}`, { withCredentials: true })
      .then(() => {
        getTasks();
      });
  };

  const handleUpdateTask = () => {};


  return (
    <div>
      <button onClick={() => setShowForm(true)}>Create Task</button>
      {showForm && (
        <div>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Subject"
          />
          <input
            type="text"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
            placeholder="Difficulty"
          />
          <input
            type="number"
            name="estimatedDuration"
            value={formData.estimatedDuration}
            onChange={handleInputChange}
            placeholder="Estimated Duration"
          />
          <input
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            placeholder="Deadline"
          />
          <button onClick={handleCreateTask}>Submit</button>
        </div>
      )}
      {tasks.map((task) => (
        <div key={task.id} style={{ display: "flex", flexDirection: "column" }}>
          <button onClick={() => handleDeleteTask(task)}>Delete</button>
          <button onClick={handleUpdateTask}>Update</button>
          <h1>{task.title}</h1>
          <p>{task.subject}</p>
          <p>{task.difficulty}</p>
          <p>{task.estimatedDuration}</p>
          <p>{`${
            new Date(task.createdAt).toISOString().split("T")[0]
          } ${new Date(task.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`}</p>
          <p>{`${
            new Date(task.deadline).toISOString().split("T")[0]
          } ${new Date(task.deadline).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`}</p>
        </div>
      ))}
    </div>
  );
}
