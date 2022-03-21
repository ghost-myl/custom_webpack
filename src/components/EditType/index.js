import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Select, Button, Space } from 'antd';
import './index.less';

const { Option } = Select;
const EditType = ({ onCancel, onConfirm }) => {
  const [form] = Form.useForm();
  const [typeList, setTypeList] = useState([]);
  const onFinish = (value) => {
    onConfirm(value.type);
  };
  const userId = window?.context_data?.userId || sessionStorage.getItem('userId');
  const onSearch = () => {
    const param = {
      groupCode: 2,
      userId,
    };
    getGroup(param).then((res) => {
      if (res.success) {
        setTypeList(res.data);
      }
    });
  };
  useEffect(() => {
    onSearch();
  }, []);
  return (
    <Modal title="选择类型" visible footer={null} onCancel={onCancel}>
      <Form form={form} onFinish={onFinish} labelCol={{ span: 4 }} style={{ height: '160px' }}>
        <Form.Item name="type" label="类型" rules={[{ required: true, message: '请选择' }]}>
          <Select placeholder="请选择类型" listHeight={130}>
            {typeList.map((item) => (
              <Option value={item}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 17 }} style={{ marginTop: '80px' }}>
          <Space>
            <Button onClick={onCancel}>取消</Button>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditType.propTypes = {
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};
EditType.defaultProps = {
  onCancel: null,
  onConfirm: null,
};

export default EditType;
