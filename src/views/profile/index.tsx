import { Form, Button, Space, Input, message } from "antd";
import { useState, useCallback } from "react";
import { clipboard } from "@extend-chrome/clipboard";
import HistoryButton from "@/components/HistoryButton";
import { HISTORY_KEYS } from "@/utils/constants";
import styles from "./index.module.less";
import {
  generateName,
  generateAddress,
  generateCity,
  generateEmail,
  generatePhone,
} from "./utils";

const { Item, useForm } = Form;

const Index: React.FC = () => {
  const [form] = useForm();
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleGenerateName = useCallback(() => {
    setName(generateName());
  }, []);

  const handleCopyName = useCallback(() => {
    clipboard.writeText(name);
    message.success("复制成功");
  }, [name]);

  const handleGeneratePhone = useCallback(() => {
    setPhone(generatePhone());
  }, []);

  const handleCopyPhone = useCallback(() => {
    clipboard.writeText(phone);
    message.success("复制成功");
  }, [phone]);

  const handleGenerateEmail = useCallback(() => {
    setEmail(generateEmail());
  }, []);

  const handleCopyEmail = useCallback(() => {
    clipboard.writeText(email);
    message.success("复制成功");
  }, [email]);

  const handleGenerateCity = useCallback(() => {
    setCity(generateCity());
  }, []);

  const handleCopyCity = useCallback(() => {
    clipboard.writeText(city);
    message.success("复制成功");
  }, [city]);

  const handleGenerateAddress = useCallback(() => {
    setAddress(generateAddress());
  }, []);

  const handleCopyAddress = useCallback(() => {
    clipboard.writeText(address);
    message.success("复制成功");
  }, [address]);

  return (
    <div className={styles.profile}>
      <Form
        labelCol={{ span: 6 }}
        form={form}
        name="form"
        layout="horizontal"
        labelAlign="right"
      >
        <Item label="姓名">
          <Input value={name} />
          <Space className={styles.btnWrapper}>
            <Button type="primary" onClick={handleGenerateName}>
              生成
            </Button>
            <Button type="primary" onClick={handleCopyName}>
              复制
            </Button>
            <HistoryButton historyKey={HISTORY_KEYS.NAME} />
          </Space>
        </Item>
        <Item label="手机号">
          <Input value={phone} />
          <Space className={styles.btnWrapper}>
            <Button type="primary" onClick={handleGeneratePhone}>
              生成
            </Button>
            <Button type="primary" onClick={handleCopyPhone}>
              复制
            </Button>
            <HistoryButton historyKey={HISTORY_KEYS.PHONE} />
          </Space>
        </Item>
        <Item label="邮箱">
          <Input value={email} />
          <Space className={styles.btnWrapper}>
            <Button type="primary" onClick={handleGenerateEmail}>
              生成
            </Button>
            <Button type="primary" onClick={handleCopyEmail}>
              复制
            </Button>
            <HistoryButton historyKey={HISTORY_KEYS.EMAIL} />
          </Space>
        </Item>
        <Item label="省市区">
          <Input value={city} />
          <Space className={styles.btnWrapper}>
            <Button type="primary" onClick={handleGenerateCity}>
              生成
            </Button>
            <Button type="primary" onClick={handleCopyCity}>
              复制
            </Button>
            <HistoryButton historyKey={HISTORY_KEYS.CITY} />
          </Space>
        </Item>
        <Item label="地址">
          <Input value={address} />
          <Space className={styles.btnWrapper}>
            <Button type="primary" onClick={handleGenerateAddress}>
              生成
            </Button>
            <Button type="primary" onClick={handleCopyAddress}>
              复制
            </Button>
            <HistoryButton historyKey={HISTORY_KEYS.ADDRESS} />
          </Space>
        </Item>
      </Form>
    </div>
  );
};

export default Index;
