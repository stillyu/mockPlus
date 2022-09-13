import React, { useCallback, useEffect, useState } from "react";
import { CopyOutlined } from "@ant-design/icons";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import {
  Cascader,
  Form,
  Slider,
  Checkbox,
  Button,
  Radio,
  message,
  Space,
  DatePicker,
  Input,
} from "antd";
import moment from "moment";
import { clipboard } from "@extend-chrome/clipboard";
import HistoryButton from "@/components/HistoryButton";
import { HISTORY_KEYS } from "@/utils/constants";
import {
  generateIdCardNum,
  getRandomDateFromAgeArea,
  defaultIdCardData,
} from "./utils";
import cityData from "@/data/city.json";
import styles from "./index.module.less";

const { Item, useForm } = Form;

export interface IIDCardData {
  city: [string, string, string];
  birthday?: string;
  age: [number, number];
  sex: "男" | "女";
  default: boolean;
}

const Index: React.FC = () => {
  const [form] = useForm();

  const [ageDisabled, setAgeDisabled] = useState(false);
  const [idCard, setIdCard] = useState("");

  const handleSubmit = useCallback(() => {
    form.validateFields().then(values => {
      setLocalStorage("idCardData", {
        ...values,
        birthday: values.birthday
          ? moment(values.birthday).format("YYYY-MM-DD")
          : "",
      });
      const birthday = values.birthday
        ? moment(values.birthday)
        : getRandomDateFromAgeArea(values.age[0], values.age[1]);
      const id = generateIdCardNum(values.city[2], birthday, values.sex);
      setIdCard(id);
      clipboard.writeText(id);
      message.success("复制成功");
    });
  }, [history]);

  useEffect(() => {
    getLocalStorage<IIDCardData>("idCardData", defaultIdCardData).then(res => {
      form.setFieldsValue({
        ...res,
        birthday: res.birthday ? moment(res.birthday) : "",
      });
      setAgeDisabled(!!res.birthday);
    });
  }, []);

  const handleBirthdayChange = useCallback((e: any) => {
    setAgeDisabled(!!e);
  }, []);

  const handleCopyClick = useCallback(() => {
    if (idCard) {
      clipboard.writeText(idCard);
      message.success("复制成功");
    }
  }, [idCard]);

  return (
    <div className={styles.idCard}>
      <Form
        labelCol={{ span: 6 }}
        form={form}
        name="form"
        layout="horizontal"
        labelAlign="right"
      >
        <Item label="省市区" name="city">
          <Cascader
            fieldNames={{ label: "name", value: "code", children: "children" }}
            options={cityData}
          />
        </Item>
        <Item label="出生日期" name="birthday">
          <DatePicker
            className={styles.date}
            placeholder="填写出生日期,则忽略年龄段"
            allowClear
            onChange={handleBirthdayChange}
          />
        </Item>
        <Item label="年龄段" name="age">
          <Slider
            min={1}
            max={120}
            range
            marks={{ 1: 1, 120: 120 }}
            disabled={ageDisabled}
          />
        </Item>
        <Item label="性别" name="sex">
          <Radio.Group>
            <Radio value="男">男</Radio>
            <Radio value="女">女</Radio>
          </Radio.Group>
        </Item>
        <Item
          label="设为默认配置"
          name="default"
          help="设置为右键快捷生成时的默认配置"
          valuePropName="checked"
        >
          <Checkbox />
        </Item>
        <Item label="生成结果" className={styles.result}>
          <Input
            value={idCard}
            readOnly
            addonAfter={<CopyOutlined onClick={handleCopyClick} />}
          />
        </Item>
        <Item label=" " colon={false}>
          <Space>
            <Button type="primary" onClick={handleSubmit}>
              生成身份证号并复制
            </Button>
            <HistoryButton label="生成记录" historyKey={HISTORY_KEYS.ID_CARD} />
          </Space>
        </Item>
      </Form>
    </div>
  );
};

export default Index;
