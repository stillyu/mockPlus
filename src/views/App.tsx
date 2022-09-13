import { Modal, Tabs } from "antd";
import IdCard from "@/views/idcard";
import Profile from "@/views/profile";
import Setting from "@/views/setting";
import {
  IdcardOutlined,
  ProfileOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import styles from "./App.module.less";
import { useEffect } from "react";

const { TabPane } = Tabs;

const App = () => {
  useEffect(() => {
    getLocalStorage<boolean>("firstUser").then(res => {
      if (res) {
        Modal.warning({
          title: "免责声明",
          content:
            "Mock Plus生成的数据，都是利用公开规则生成的虚假数据，仅可用作测试目的。严禁用于非法目的！！！",
          onOk: () => {
            setLocalStorage("firstUser", false);
          },
        });
      }
    });
  }, []);
  return (
    <div className={styles.app}>
      <Tabs centered>
        <TabPane
          tab={
            <>
              <IdcardOutlined />
              身份证
            </>
          }
          key="1"
        >
          <IdCard />
        </TabPane>
        <TabPane
          tab={
            <>
              <ProfileOutlined />
              个人信息
            </>
          }
          key="2"
        >
          <Profile />
        </TabPane>
        <TabPane
          tab={
            <>
              <SettingOutlined />
              设置
            </>
          }
          key="3"
        >
          <Setting />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default App;
