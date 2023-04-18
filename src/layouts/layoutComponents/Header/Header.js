import clsx from "clsx";
import { Link } from "react-router-dom";
import { Menu, Divider, Layout } from "antd";
import styles from "./Header.module.css";
const { Header } = Layout;

function MyHeader() {
  return (
    <div className={clsx(styles.wrap_header)}>
      <Header className={clsx(styles.header)}>
        <Menu
          mode="horizontal"
          // defaultSelectedKeys={["1"]}
          // text-color="white"
          // mode="inline"
          className={clsx(styles.menu)}
        >
          <Menu.Item className={clsx(styles.menu_item)} key="logo">
            <Link className={clsx(styles.nav_item)} to="/">
              <img
                src="./images/logo/geekup_logo.svg"
                alt="LOGO"
                className={clsx(styles.logo_item)}
              />
            </Link>
          </Menu.Item>
          <Menu.Item className={clsx(styles.menu_item)} key="home">
            <Link className={clsx(styles.nav_item)} to="/">
              Test
            </Link>
          </Menu.Item>
          <Menu.Item className={clsx(styles.menu_item)} key="todo">
            <Link className={clsx(styles.nav_item)} to="/todo">
              Todo
            </Link>
          </Menu.Item>
        </Menu>
        {/* <Divider /> */}
      </Header>
    </div>
  );
}

export default MyHeader;
