import { useState, useEffect } from "react";

export default function useGetTask(userld) {
  const [listTask, setListTask] = useState([]);
  const [storeTask, setStoreTask] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userld}/todos`)
      .then((res) => res.json())
      .then((data) => {
        const dataSort = data.sort((a, b) => a.completed - b.completed);
        setListTask(dataSort);
        if (dataSort.length > 0) {
          setStoreTask((prevData) => [
            ...prevData,
            { id: dataSort[0].userId | null, taskStore: dataSort },
          ]);
        }
      });
  }, []);
  return {
    listTask,
    storeTask,
  };
}
