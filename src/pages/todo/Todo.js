import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { Divider, Select, Space, Button } from "antd";
import {
  CheckCircleTwoTone,
  MinusSquareTwoTone,
  MenuOutlined,
} from "@ant-design/icons";
import styles from "./Todo.module.css";
import useFetchUsers from "../../hooks/dataUsers/useFetchUsers";

function Todo() {
  const [loadings, setLoadings] = useState([]);

  // mylogic
  const [idUser, setIdUser] = useState(0);
  const [storeData, setStoreData] = useState([]);

  const { dataUser } = useFetchUsers();
  const tempTask = useRef();

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
    fetch(`https://jsonplaceholder.typicode.com/users/${idUser}/todos`)
      .then((res) => res.json())
      .then((data) => {
        const dataSort = data.sort((a, b) => a.completed - b.completed);
        tempTask.current = dataSort;
        if (dataSort.length > 0) {
          setStoreData((prevData) => [
            ...prevData,
            { id: dataSort[0].userId | null, taskStore: dataSort },
          ]);
        }
      });
  };
  useEffect(() => {
    const itemStore = storeData.find((obj) => obj.id == idUser);
    if (itemStore?.id == idUser) {
      tempTask.current = itemStore.taskStore;
      return;
    } else {
      hanldeGetData();
    }
  }, [idUser]);

  console.log("storeData = ", storeData);
  console.log("tempTask.current = ", tempTask.current);

  // button
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
      .then((json) => console.log(json))
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
            // console.log("option id = ", option.id);
            setIdUser(Number(option.id));
          }}
          // onSearch={onSearch}
          // filterOption={(input, option) =>
          //   (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          // }
          options={dataUser}
          className={clsx(styles.select)}
        />
      </div>

      <div className={clsx(styles.title)}>
        <Divider orientation="left" orientationMargin="0">
          Task
        </Divider>
      </div>

      <div className={clsx(styles.wrap_data_user)}>
        <div className={clsx(styles.data_user)}>
          {tempTask.current?.length === 0 && (
            <div>
              <div>
                <div className={clsx(styles.title_nodata)}>No data</div>
              </div>
            </div>
          )}
          <div className={clsx(styles.wrap_text_aria)}>
            <ul>
              {tempTask.current?.map((item) => {
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
                          // onClick={() => enterLoading(item.id)}
                          onClick={() => {
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

              {/*  */}
            </ul>
          </div>
        </div>
      </div>
      <div className={clsx(styles.data_task)}>Done 9/20 tasks</div>

      <div>
        <Space>
          <CheckCircleTwoTone twoToneColor="#52c41a" />
          <MinusSquareTwoTone twoToneColor="orange" />
          <MenuOutlined />
          <Button
            type="primary"
            loading={loadings[0]}
            onClick={() => enterLoading(0)}
          >
            Click me!
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default Todo;

{
  /* <li className={clsx(styles.wrap_data_item)}>
                <span className={clsx(styles.data_item)}>
                  <CheckCircleTwoTone
                    className={clsx(styles.data_item_child)}
                    twoToneColor="#52c41a"
                  />
                  <p className={clsx(styles.data_item_child)}> Đã hoàn thành</p>
                </span>
              </li>
              <li className={clsx(styles.wrap_data_item)}>
                <span className={clsx(styles.data_item)}>
                  <MinusSquareTwoTone
                    twoToneColor="orange"
                    className={clsx(styles.data_item_child)}
                  />
                  <p className={clsx(styles.data_item_child)}>
                    Chưa hoàn thành
                  </p>
                </span>
                <div className={clsx(styles.wrap_btn_done)}>
                  <Button
                    className={clsx(styles.btn_done)}
                    loading={loadings[0]}
                    onClick={() => enterLoading(0)}
                  >
                    Mark done
                  </Button>
                </div>
              </li> */
}
