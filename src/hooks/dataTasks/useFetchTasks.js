import { useState, useEffect } from "react";

export default function useFetchTasks(userld) {
  const [listTask, setListTask] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userld}/todos`)
      .then((res) => res.json())
      .then((data) => setListTask(data));
  }, []);

  return listTask;
}
