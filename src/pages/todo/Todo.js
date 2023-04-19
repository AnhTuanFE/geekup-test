import { useState, useEffect } from "react";
import clsx from "clsx";
import { Divider, Select, Space, Button, Spin } from "antd";
import {
  CheckCircleTwoTone,
  MinusSquareTwoTone,
  MenuOutlined,
} from "@ant-design/icons";
import styles from "./Todo.module.css";
import useFetchUsers from "../../hooks/dataUsers/useFetchUsers";

function Todo() {
  const [loadings, setLoadings] = useState([]);

  const [idUser, setIdUser] = useState(0);
  const [storeData, setStoreData] = useState([]);
  const [checkUpdata, setCheckUpdate] = useState(false);
  const [task, setTask] = useState();
  const [isLoadingFetchTasks, setIsLoadingFetchTasks] = useState(false);

  const { dataUser } = useFetchUsers();

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };

  const hanldeGetData = () => {
    setIsLoadingFetchTasks(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${idUser}/todos`)
      .then((res) => res.json())
      .then((data) => {
        const dataSort = data.sort((a, b) => a.completed - b.completed);
        setTask(dataSort);
        if (dataSort.length > 0) {
          setStoreData((prevData) => [
            ...prevData,
            { id: dataSort[0].userId | null, listTask: dataSort },
          ]);
        }
      })
      .finally(() => {
        setIsLoadingFetchTasks(false);
      });
  };

  const handleLoadPage = () => {
    const itemStore = storeData.find((obj) => obj.id === idUser);
    if (itemStore?.id === idUser) {
      setTask(itemStore.listTask);
    } else {
      hanldeGetData();
    }
  };

  useEffect(() => {
    handleLoadPage();
  }, [idUser, checkUpdata]);

  const handleMarkDone = (taskId) => {
    const url = ` https://jsonplaceholder.typicode.com/todos/${taskId}`;
    const requestBody = JSON.stringify({
      completed: true,
    });

    fetch(url, {
      method: "PATCH",
      body: requestBody,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const indexTaskToDelete = task?.findIndex((item) => item.id === taskId);
        if (indexTaskToDelete !== -1) {
          task.splice(indexTaskToDelete, 1, json);
          setCheckUpdate(!checkUpdata);
          const dataSort = task.sort((a, b) => a.completed - b.completed);
          setTask(dataSort);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.title)}>
        <Divider orientation="left" orientationMargin="0">
          User
        </Divider>
      </div>

      <div className={clsx(styles.wrap_select)}>
        <Select
          showSearch
          optionFilterProp="children"
          onChange={(input, option) => {
            setIdUser(Number(option.id));
          }}
          // onClick={handleLoadPage}
          // onSearch={onSearch}
          options={dataUser}
          className={clsx(styles.select)}
        />
      </div>

      <div className={clsx(styles.title)}>
        <Divider
          className={clsx(styles.task_title)}
          orientation="left"
          orientationMargin="0"
        >
          Task
        </Divider>
      </div>

      <div className={clsx(styles.wrap_data_user)}>
        {/*  */}
        {isLoadingFetchTasks ? <Spin /> : null}
        <div className={clsx(styles.data_user)}>
          {task?.length === 0 && (
            <div>
              <div>
                <div className={clsx(styles.title_nodata)}>No data</div>
              </div>
            </div>
          )}
          <div className={clsx(styles.wrap_text_aria)}>
            <ul>
              {task?.map((item) => {
                return (
                  <li className={clsx(styles.wrap_data_item)} key={item.id}>
                    <span className={clsx(styles.data_item)}>
                      {item.completed && (
                        <CheckCircleTwoTone
                          className={clsx(styles.data_item_child)}
                          twoToneColor="#52c41a"
                        />
                      )}
                      {!item.completed && (
                        <MinusSquareTwoTone
                          twoToneColor="orange"
                          className={clsx(styles.data_item_child)}
                        />
                      )}
                      <p className={clsx(styles.data_item_child)}>
                        {item.title}
                      </p>
                    </span>
                    {!item.completed && (
                      <div className={clsx(styles.wrap_btn_done)}>
                        <Button
                          className={clsx(styles.btn_done)}
                          loading={loadings[item.id]}
                          onClick={() => {
                            enterLoading(item.id);
                            handleMarkDone(item.id);
                          }}
                        >
                          Mark done
                        </Button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/*  */}
      </div>
      <div className={clsx(styles.data_task)}>
        Done {task?.filter((item) => item.completed === true).length}/
        {task?.length} tasks
      </div>

      {/* <Space>
          <MenuOutlined />
        </Space> */}
    </div>
  );
}

export default Todo;
