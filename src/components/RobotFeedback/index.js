import React, { useState, useEffect } from 'react';
import { Modal, message, Tooltip, Form, Row, Col, Timeline, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { AndroidOutlined } from '@ant-design/icons';
import moment from 'moment';

const formLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const { TextArea } = Input;

const sessionuserId = window?.context_data?.userId || window.sessionStorage.getItem('userId');
const RobotFeedback = ({ data, getList }) => {
  const [form] = Form.useForm();
  const { robot, robotFeedbackStatu, id, code, userId } = data;
  const [robotVisibile, setrobotVisibile] = useState(false);
  const [currentRecord, setCurrentRecord] = useState([]);

  const robotOk = () => {
    setrobotVisibile(false);
  };
  const robotCancel = () => {
    setrobotVisibile(false);
  };

  const pushMsgApi = (projectid) => {
    const params = {
      caseId: projectid,
      feedbackType: 1,
      processor: {
        userId: userId || sessionuserId,
      },
    };
    pushMsg(params).then((res) => {
      if (res.success) {
        message.success('发起智能外呼！', 2, () => {
          getList({ pageSize: 10, page: 1 });
        });
      }
    });
  };

  const isAuthorApi = (params) =>
    isAuthor({ code: code || data.msg.code, feedbackType: params.type, caseId: params.caseId });

  const recall = (projectid) => {
    Modal.confirm({
      title: '提示',
      content: '是否确认发起智能外呼劝阻',
      okText: '确定',
      cancelText: '再想想',
      onOk() {
        isAuthorApi({ type: 1, caseId: projectid }).then((res) => {
          if (res.code === 0) {
            pushMsgApi(projectid);
          }
        });
      },
    });
  };
  // 再次发起外呼
  const recallAgain = () => {
    Modal.confirm({
      title: '提示',
      content: '是否确认发起智能外呼劝阻',
      okText: '确定',
      cancelText: '再想想',
      onOk() {
        isAuthorApi({ type: 1 }).then((res) => {
          if (res.code === 0) {
            pushMsgApi(id);
          }
        });
      }, // 调接口
    });
  };
  const modalDetail = (param) => {
    setrobotVisibile(true);
    setCurrentRecord(param?.reference_result?.split('|') || []);
  };
  const robotmap = {
    1: [
      '未发起智能外呼',
      <Tooltip title="未发起智能外呼">
        <AndroidOutlined
          style={{ color: '#C7CFDE', cursor: 'pointer' }}
          onClick={() => {
            recall(id);
          }}
        />
      </Tooltip>,
    ],
    2: [
      '智能外呼过程中',
      <Tooltip title="智能外呼过程中">
        <AndroidOutlined style={{ color: '#FAAD14', cursor: 'pointer' }} />
      </Tooltip>,
    ],
    3: [
      '智能外呼成功',
      <Tooltip title="智能外呼成功">
        <AndroidOutlined
          style={{ color: '#52C41A', cursor: 'pointer' }}
          onClick={() => {
            modalDetail(robot);
          }}
        />
      </Tooltip>,
    ],
    4: [
      '智能外呼失败',
      <Tooltip title="智能外呼失败，疲劳度限制或超出今日最大处置量">
        <AndroidOutlined
          style={{ color: '#C7CFDE', cursor: 'pointer' }}
          onClick={() => {
            recall(id);
          }}
        />
      </Tooltip>,
    ],
    5: [
      '智能外呼劝阻失败',
      <Tooltip title="智能外呼劝阻失败">
        <AndroidOutlined
          style={{ color: '#E8294B', cursor: 'pointer' }}
          onClick={() => {
            modalDetail(robot);
          }}
        />
      </Tooltip>,
    ],
  };
  useEffect(() => {
    const text = data?.robot?.isSuccess === 'yes' ? '劝阻成功' : '劝阻失败';
    form.setFieldsValue({
      ...data.robot,
      isSuccess: text,
      startTime: data?.robot?.startTime && moment(data?.robot?.startTime).format('YYYY-MM-DD HH:mm:ss'),
    });
  }, []);

  return (
    <div>
      {robotmap[robotFeedbackStatu][1]}
      <div>
        <Modal
          title="对话记录"
          visible={robotVisibile}
          onOk={robotOk}
          width={1000}
          onCancel={robotCancel}
          footer={[
            <Button key="submit" type="primary" onClick={robotOk}>
              确认
            </Button>,
          ]}
        >
          <Form
            form={form}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            autoComplete="off"
          >
            <Row>
              <Col span={8}>
                <Form.Item label="被呼电话" name="victimPhone">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="开始时间" name="startTime">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="结束时间" name="endTime">
                  <Input disabled />
                </Form.Item>
              </Col>
              {/* <Col span={8}>
                <Form.Item label="外呼结果状态码" name="callCode">
                  <Input disabled />
                </Form.Item>
              </Col> */}
              <Col span={8}>
                <Form.Item label="外呼结果" name="callResult">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="外呼时长" name="duration">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="是否劝阻成功" name="isSuccess">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item {...formLayout} label="交互详情文本" name="chatText">
                  <TextArea autoSize={{ minRows: 2, maxRows: 6 }} allowClear disabled />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Timeline mode="alternate">
            {currentRecord.map((_item) => (
              <Timeline.Item key={_item}>{_item}</Timeline.Item>
            ))}
          </Timeline>
          <Button type="primary" onClick={recallAgain}>
            再次发起智能外呼
          </Button>
        </Modal>
      </div>
    </div>
  );
};

RobotFeedback.propTypes = {
  data: PropTypes.object,
};

RobotFeedback.defaultProps = {
  data: {},
};

export default RobotFeedback;
