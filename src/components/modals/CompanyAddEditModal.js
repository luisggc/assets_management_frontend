import { Modal, Input, Form, Button } from "antd";
import { useState } from "react";
import { query } from "../../api/index.js";
import { queryAddCompany, queryEditCompany } from "../../api/CompanyQueries";

const AddEditModal = ({
  isVisible,
  setModalIsVisible,
  initialInputData,
  onAfterSubmit,
  handleCancel,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const inputProps = {
    name: {
      label: "Name",
      name: "name",
      rules: [{ required: true }],
    },
  };

  const submitEdit = (data) => {
    const requestData = async () => {
      await query(queryEditCompany(data));
      //Could set here error messagens if API fails
    };
    requestData();
  };

  const submitAdd = (inputData) => {
    const requestData = async () => {
      await query(queryAddCompany(inputData));
      //Could set here error messagens if API fails
    };
    requestData();
  };

  const onFinish = (values) => {
    setConfirmLoading(true);
    console.log("onfinish", values);
    if (initialInputData) {
      submitEdit({ _id: initialInputData?._id, ...values });
    } else {
      submitAdd(values);
    }
    onAfterSubmit();
    setConfirmLoading(false);
    setModalIsVisible(false);
  };

  return (
    <Modal
      title={"Add modal"}
      visible={isVisible}
      confirmLoading={confirmLoading}
      footer={<Footer handleCancel={handleCancel} confirmLoading={confirmLoading} />}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form {...formProps} onFinish={onFinish}>
        <Form.Item {...inputProps?.name} initialValue={initialInputData?.name}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Footer = ({ handleCancel, confirmLoading }) => (
  <div>
    <Button key="cancel" onClick={handleCancel}>
      Cancel
    </Button>
    <Button loading={confirmLoading} form="myForm" type="primary" htmlType="submit">
      {confirmLoading ? "Sending" : "Send"}
    </Button>
  </div>
);

const formProps = {
  id: "myForm",
  name: "wrap",
  labelCol: {
    flex: "110px",
  },
  labelAlign: "left",
  labelWrap: true,
  wrapperCol: {
    flex: 1,
  },
  preserve: false,
};

export default AddEditModal;
