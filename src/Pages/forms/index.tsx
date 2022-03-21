import React, { useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Form, TreeSelect, Input, DatePicker, TimePicker, Select, Cascader, InputNumber, Mentions } from 'antd';

const { TreeNode } = TreeSelect;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const Formss = () => {
  const [value, setValue] = useState(undefined);
  const onChange = () => {
    setValue(value);
  };
  return (
    <Form {...formItemLayout}>
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={onChange}
      >
        <TreeNode value="parent 1" title="parent 1">
          <TreeNode value="parent 1-0" title="parent 1-0">
            <TreeNode value="leaf1" title="leaf1" />
            <TreeNode value="leaf2" title="leaf2" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1">
            <TreeNode value="leaf3" title={<b style={{ color: '#08c' }}>leaf3</b>} />
          </TreeNode>
        </TreeNode>
      </TreeSelect>
      <Form.Item label="Fail" validateStatus="error" help="Should be combination of numbers & alphabets">
        <Input placeholder="unavailable choice" id="error" />
      </Form.Item>

      <Form.Item label="Warning" validateStatus="warning">
        <Input placeholder="Warning" id="warning" prefix={<SmileOutlined />} />
      </Form.Item>

      <Form.Item
        label="Validating"
        hasFeedback
        validateStatus="validating"
        help="The information is being validated..."
      >
        <Input placeholder="I'm the content is being validated" id="validating" />
      </Form.Item>

      <Form.Item label="Success" hasFeedback validateStatus="success">
        <Input placeholder="I'm the content" id="success" />
      </Form.Item>

      <Form.Item label="Warning" hasFeedback validateStatus="warning">
        <Input placeholder="Warning" id="warning2" />
      </Form.Item>

      <Form.Item label="Fail" hasFeedback validateStatus="error" help="Should be combination of numbers & alphabets">
        <Input placeholder="unavailable choice" id="error2" />
      </Form.Item>

      <Form.Item label="Success" hasFeedback validateStatus="success">
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Warning" hasFeedback validateStatus="warning">
        <TimePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Error" hasFeedback validateStatus="error">
        <Select allowClear>
          <Option value="1">Option 1</Option>
          <Option value="2">Option 2</Option>
          <Option value="3">Option 3</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Validating"
        hasFeedback
        validateStatus="validating"
        help="The information is being validated..."
      >
        <Cascader options={[{ value: 'xx', label: 'xx' }]} allowClear />
      </Form.Item>

      <Form.Item label="inline" style={{ marginBottom: 0 }}>
        <Form.Item
          validateStatus="error"
          help="Please select right date"
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        >
          <DatePicker />
        </Form.Item>
        <span style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}>-</span>
        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
          <DatePicker />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Success" hasFeedback validateStatus="success">
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Success" hasFeedback validateStatus="success">
        <Input allowClear placeholder="with allowClear" />
      </Form.Item>

      <Form.Item label="Warning" hasFeedback validateStatus="warning">
        <Input.Password placeholder="with input password" />
      </Form.Item>

      <Form.Item label="Error" hasFeedback validateStatus="error">
        <Input.Password allowClear placeholder="with input password and allowClear" />
      </Form.Item>

      <Form.Item label="Fail" validateStatus="error">
        <Mentions />
      </Form.Item>
    </Form>
  );
};
export default Formss;
