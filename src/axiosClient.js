import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://time-mentor-back-end.onrender.com/api/v1",
});

export default axiosClient;
