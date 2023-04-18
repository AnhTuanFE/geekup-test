import { useState } from "react";
import clsx from "clsx";
import { Divider, Select, Space, Typography, Button, Input } from "antd";
import {
  CheckCircleTwoTone,
  HeartTwoTone,
  SmileTwoTone,
  MinusSquareTwoTone,
  MenuOutlined,
} from "@ant-design/icons";
import styles from "./Todo.module.css";

const { Text } = Typography;
const { TextArea } = Input;
function Todo() {
  const [loadings, setLoadings] = useState([]);

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
  const selectItems = [
    {
      value: "jack",
      label: "Jack",
    },
    {
      value: "lucy",
      label: "Lucy",
    },
    {
      value: "tom",
      label: "Tom",
    },
  ];
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
          // onChange={onChange}
          // onSearch={onSearch}
          // filterOption={(input, option) =>
          //   (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          // }
          options={selectItems}
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
          <div>
            <div>
              <div className={clsx(styles.title_nodata)}>No data</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "12px" }}>Done 9/20 tasks</div>

      <div>
        <Space>
          <SmileTwoTone />
          <HeartTwoTone twoToneColor="#eb2f96" />
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
