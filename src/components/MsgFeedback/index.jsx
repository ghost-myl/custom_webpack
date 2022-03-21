import React, { useState, useEffect } from 'react';
import { Modal, Tooltip, Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const MsgFeedback = ({ data }) => {
  const [form] = Form.useForm();
  const { note, noteFeedbackStatu, id } = data;
  const [robotVisibile, setrobotVisibile] = useState(false);
  // const [currentRecord, setCurrentRecord] = useState([]);

  const robotOk = () => {
    setrobotVisibile(false);
  };
  const robotCancel = () => {
    setrobotVisibile(false);
  };

  useEffect(() => {
    form.setFieldsValue({ ...data.note });
  }, []);

  const recall = () => {
    Modal.confirm({
      title: '提示',
      content: '是否确认发起闪信',
      okText: '确定',
      cancelText: '再想想',
    });
  };
  // 再次发起外呼
  // const recallAgain = () => {
  //   Modal.confirm({
  //     title: '提示',
  //     content: '是否确认发起智能外呼劝阻',
  //     okText: '确定',
  //     cancelText: '再想想',
  //     onOk() {
  //       isAuthorApi({ type: 2 }).then((res) => {
  //         if (res.code === 0) {
  //           pushMsgApi(id);
  //         } else {
  //           message.error(res.msg);
  //         }
  //       });
  //     },
  //     onCancel() {},
  //   });
  // };
  const modalDetail = () => {
    setrobotVisibile(true);
    // setCurrentRecord(param?.reference_result?.split('|') || []);
  };
  const msgmap = {
    1: [
      '未发起闪信',
      <Tooltip title="未发起闪信">
        <MailOutlined
          style={{ color: '#C7CFDE', cursor: 'pointer' }}
          onClick={() => {
            recall(id);
          }}
        />
      </Tooltip>,
    ],
    2: [
      '发起闪信过程中',
      <Tooltip title="发起闪信过程中">
        <MailOutlined style={{ color: '#FAAD14', cursor: 'pointer' }} />
      </Tooltip>,
    ],
    3: [
      '闪信发起成功',
      <Tooltip title="闪信发起成功">
        <MailOutlined
          style={{ color: '#52C41A', cursor: 'pointer' }}
          onClick={() => {
            modalDetail(note);
          }}
        />
      </Tooltip>,
    ],
    4: [
      '闪信发送失败',
      <Tooltip title="闪信发送失败，疲劳度限制或超出今日最大处置量">
        <MailOutlined
          style={{ color: '#C7CFDE', cursor: 'pointer' }}
          onClick={() => {
            recall(id);
          }}
        />
      </Tooltip>,
    ],
  };
  return (
    <div>
      {msgmap[noteFeedbackStatu][1]}
      <div>
        <Modal
          title="对话记录"
          visible={robotVisibile}
          onOk={robotOk}
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
              span: 5,
            }}
            wrapperCol={{
              span: 16,
            }}
            autoComplete="off"
          >
            <Form.Item label="预警电话" name="victimPhone">
              <Input disabled />
            </Form.Item>
            <Form.Item label="开始时间" name="sendDate">
              <Input disabled />
            </Form.Item>
            <Form.Item label="结束时间" name="receiveDate">
              <Input disabled />
            </Form.Item>
          </Form>
          {/* <Timeline>
                {currentRecord.map((_item) => (
                  <Timeline.Item>{_item}</Timeline.Item>
                ))}
              </Timeline> */}
          {/* <Button type="primary" onClick={recallAgain}>
            再次发起闪信
          </Button> */}
        </Modal>
      </div>
    </div>
  );
};

MsgFeedback.propTypes = {
  data: PropTypes.object,
};
MsgFeedback.defaultProps = {
  data: {},
};

export default MsgFeedback;
