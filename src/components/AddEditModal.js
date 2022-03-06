import { Modal, Input, Form, Button } from "antd";
import { useState } from "react";

const AddEditModal = ({ isVisible, setModalIsVisible, fields, title, onSubmit, data }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const onFinish = (values) => {
    setConfirmLoading(true);
    console.log("onfinish", values)
    console.log("data", data)
    onSubmit({ _id: data?._id, ...values });
    setConfirmLoading(false);
    setModalIsVisible(false);
  };

  const handleCancel = () => {
    setModalIsVisible(false);
  };

  return (
    <Modal
      title={title}
      visible={isVisible}
      confirmLoading={confirmLoading}
      footer={[
        <div key="footer">
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>
          <Button loading={confirmLoading} form="myForm" type="primary" htmlType="submit" key="submit">
            {confirmLoading ? 'Sending' : 'Send'}
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form
        id="myForm"
        name="wrap"
        labelCol={{
          flex: "110px",
        }}
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1,
        }}
        onFinish={onFinish}
        preserve={false}
      >
        {Object.keys(fields).map((column, key) => {
          const [db_name, label] = [column, fields[column].label];
          return (
            <Form.Item
              key={key}
              label={label}
              name={db_name}
              initialValue={data?.[db_name]}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        })}
      </Form>
    </Modal>
  );
};

export default AddEditModal;
