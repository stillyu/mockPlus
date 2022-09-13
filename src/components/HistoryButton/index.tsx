import { Button } from "antd";
import useChromeStorageState from "@/hooks/useChromeStorageState";
import { useCallback, useState } from "react";
import History from "@/components/History";
import { HISTORY_KEYS } from "@/utils/constants";

const Index: React.FC<{
  historyKey: HISTORY_KEYS;
  label?: string;
}> = props => {
  const { historyKey, label = "历史记录" } = props;
  const [historyVisible, setHistoryVisible] = useState(false);
  const handleHistory = useCallback(() => {
    setHistoryVisible(true);
  }, []);
  const handleHistoryClose = useCallback(() => {
    setHistoryVisible(false);
  }, []);
  const [setting] = useChromeStorageState("setting", {
    enableHistory: true,
  });
  return (
    <>
      {setting.enableHistory && (
        <Button type="primary" onClick={handleHistory}>
          {label}
        </Button>
      )}
      <History
        visible={historyVisible}
        historyKey={historyKey}
        onClose={handleHistoryClose}
      />
    </>
  );
};

export default Index;
