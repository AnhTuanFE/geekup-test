import { useState, useEffect } from "react";

export default function useFetchUsers() {
  const [listData, setListData] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const user = [];
        setListData(data);
        for (const item of data) {
          if (item.hasOwnProperty("name")) {
            user.push({ id: item.id, value: item.name, label: item.name });
          }
        }
        setDataUser(user);
      });
  }, []);

  return {
    listData,
    dataUser,
  };
}
