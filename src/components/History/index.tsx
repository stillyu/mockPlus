import { useState, useCallback, useMemo, useEffect } from "react";
import { Drawer, Button, message } from "antd";
import { clipboard } from "@extend-chrome/clipboard";
import styles from "./index.module.less";
import { HISTORY_KEYS } from "@/utils/constants";
import { getHistory, clearHistory, IHistory } from "@/utils/history";

const Index: React.FC<{
  visible: boolean;
  historyKey: HISTORY_KEYS;
  onClose: () => void;
}> = props => {
  const { visible, historyKey, onClose } = props;

  const [list, setList] = useState<Array<IHistory>>([]);

  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleDrawerClose = useCallback(() => {
    setDrawerVisible(false);
    onClose();
  }, []);

  const handleCopyItem = useCallback((value: string) => {
    clipboard.writeText(value);
    message.success("复制成功");
  }, []);

  useEffect(() => {
    getHistory(historyKey).then(res => {
      setList(res);
    });
  }, [historyKey, visible]);

  useEffect(() => {
    setDrawerVisible(visible);
  }, [visible]);

  const handleClear = useCallback(() => {
    clearHistory(historyKey);
    message.success("清除成功");
    onClose();
  }, [historyKey]);

  return (
    <Drawer
      title="生成历史"
      placement="bottom"
      visible={drawerVisible}
      onClose={handleDrawerClose}
      height="90vh"
    >
      <div className={styles.drawerContent}>
        <div className={styles.list}>
          {list.map((item, index) => {
            return (
              <div className={styles.listItem} key={index}>
                <div className={styles.left}>
                  <div className={styles.id}>{item.value}</div>
                  <div className={styles.time}>{item.time}</div>
                </div>
                <div className={styles.right}>
                  <Button
                    className={styles.btn}
                    onClick={() => {
                      handleCopyItem(item.value);
                    }}
                    type="primary"
                  >
                    复制
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.footer}>
          <Button type="primary" block onClick={handleClear}>
            清空记录
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default Index;
