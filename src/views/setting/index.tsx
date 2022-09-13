import { Form, Modal, Button, Switch, Checkbox, message } from "antd";
import useChromeStorageState from "@/hooks/useChromeStorageState";
import { HISTORY_KEYS } from "@/utils/constants";
import { clearAllHistory } from "@/utils/history";
import { setLocalStorage, getLocalStorage } from "@/utils/localStorage";
import styles from "./index.module.less";
import { useCallback, useEffect, useState } from "react";

const { Item, useForm } = Form;

export interface ISettingFormData {
  enableContextMenu: boolean;
  contextMenus: Array<HISTORY_KEYS>;
  enableHistory: boolean;
}

export const defaultSetting = {
  enableContextMenu: true,
  contextMenus: [
    HISTORY_KEYS.ID_CARD,
    HISTORY_KEYS.PHONE,
    HISTORY_KEYS.EMAIL,
    HISTORY_KEYS.NAME,
    HISTORY_KEYS.ADDRESS,
    HISTORY_KEYS.CITY,
  ],
  enableHistory: true,
};

const Index: React.FC = () => {
  const [form] = useForm();

  const [showContextMenus, setShowContextMenus] = useState(true);
  const options = [
    { label: "身份证", value: HISTORY_KEYS.ID_CARD },
    { label: "姓名", value: HISTORY_KEYS.NAME },
    { label: "手机号", value: HISTORY_KEYS.PHONE },
    { label: "邮箱", value: HISTORY_KEYS.EMAIL },
    { label: "省市区", value: HISTORY_KEYS.CITY },
    { label: "地址", value: HISTORY_KEYS.ADDRESS },
  ];

  const handleFormChange = useCallback(
    (changedValue: Partial<ISettingFormData>, values: ISettingFormData) => {
      setLocalStorage("setting", values);
      setShowContextMenus(!!values.enableContextMenu);
    },
    []
  );
  const handleDelete = useCallback(() => {
    Modal.confirm({
      title: "确认将删除全部历史记录？",
      onOk: () => {
        clearAllHistory();
        message.success("删除成功");
      },
    });
  }, []);

  useEffect(() => {
    getLocalStorage<ISettingFormData>("setting", defaultSetting).then(res => {
      form.setFieldsValue(res);
      setShowContextMenus(!!res.enableContextMenu);
    });
  }, []);

  return (
    <Form<ISettingFormData>
      labelCol={{ span: 6 }}
      name="form"
      layout="horizontal"
      labelAlign="right"
      className={styles.setting}
      onValuesChange={handleFormChange}
      form={form}
    >
      <Item
        label="启用右键快捷键功能"
        name="enableContextMenu"
        valuePropName="checked"
      >
        <Switch />
      </Item>
      <Item
        label=" "
        className={`${styles.contextMenu} ${
          showContextMenus ? styles.show : ""
        }`}
        name="contextMenus"
      >
        <Checkbox.Group options={options} />
      </Item>
      <Item label="记录生成历史" name="enableHistory" valuePropName="checked">
        <Switch />
      </Item>
      <Item label="删除全部记录">
        <Button type="primary" onClick={handleDelete}>
          确定删除
        </Button>
      </Item>
    </Form>
  );
};

export default Index;
