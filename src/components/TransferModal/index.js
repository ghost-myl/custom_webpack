import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button, Space, Radio, Select, TreeSelect } from 'antd';

const { Option } = Select;
const TransferModal = ({ onCancel, onConfirm }) => {
  const [form] = Form.useForm();
  const [type, setType] = useState(false);
  const [unitValue, setUnitValue] = useState();
  const [personnelValue, setPersonnelValue] = useState();
  const [personnelList, setPersonnelList] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const userId = window?.context_data?.userId || sessionStorage.getItem('userId');

  // 移交人员
  const onSearchPersonnel = () => {
    getPersonnel(userId).then((res) => {
      if (res.success) {
        setPersonnelList(res.data);
      }
    });
  };
  // 移交单位
  const onSearchUnit = () => {
    getUnit(userId).then((res) => {
      if (res.success) {
        setUnitList(res.data);
      }
    });
  };

  const onSelectType = (e) => {
    if (e.target.value === 1) {
      // form.setFieldsValue({ unit: '' });
      setType(true);
    } else {
      // form.setFieldsValue({ personnel: '' });
      setType(false);
    }
  };

  const onFinish = (value) => {
    const values = value;
    if (value.type === 0) {
      const person = personnelList.filter((i) => i.userId === value.personnel);
      person.map((item) => {
        values.processor = {
          userId: item.userId,
          name: item.userName,
          avatar: item.avatar,
        };
        return values;
      });
    } else {
      values.deptId = value.unit.value;
    }
    onConfirm(values);
  };

  useEffect(() => {
    onSearchPersonnel();
    onSearchUnit();
  }, []);

  return (
    <Modal title="预警移交" visible onCancel={onCancel} footer={null}>
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        style={{ height: '180px' }}
        initialValues={{
          type: 0,
        }}
      >
        <Form.Item
          name="type"
          label="移交方式"
          rules={[
            {
              required: true,
              message: '请选择移交方式',
            },
          ]}
        >
          <Radio.Group onChange={onSelectType}>
            <Radio value={0}>移交人员</Radio>
            <Radio value={1}>移交单位</Radio>
          </Radio.Group>
        </Form.Item>
        {type ? (
          <Form.Item
            name="unit"
            label="移交单位"
            rules={[
              {
                required: true,
                message: '请选择移交单位',
              },
            ]}
          >
            <TreeSelect
              showSearch
              placeholder="请选择移交单位"
              treeData={unitList}
              labelInValue
              onChange={(e) => setUnitValue(e)}
              value={unitValue}
              listHeight={100}
              allowClear
            />
          </Form.Item>
        ) : (
          <Form.Item
            name="personnel"
            label="移交对象"
            rules={[
              {
                required: true,
                message: '请选择移交对象',
              },
            ]}
          >
            <Select
              placeholder="请选择移交对象"
              allowClear
              listHeight={100}
              onChange={(e) => setPersonnelValue(e)}
              value={personnelValue}
            >
              {personnelList.map((item) => (
                <Option value={item.userId}>{item.userName}</Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item wrapperCol={{ offset: 17 }} style={{ marginTop: '30px' }}>
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

TransferModal.propTypes = {
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};
TransferModal.defaultProps = {
  onCancel: null,
  onConfirm: null,
};

export default TransferModal;
