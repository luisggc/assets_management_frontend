import { Modal, Input, Form, Button } from "antd";
import { useState } from "react";
import { query } from "../../api/index.js";
import { queryAddCompany, queryEditCompany } from "../../api/CompanyQueries";

const AddEditModal = (props) => {
  const { isVisible, setModalIsVisible, initialInputData, handleCancel } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const inputProps = {
    name: {
      label: "Name",
      name: "name",
      rules: [{ required: true }],
    },
  };

  var onAfterSubmit = () => {
    props.onAfterSubmit();
    setConfirmLoading(false);
    setModalIsVisible(false);
  };

  const submitQuery = (myQuery, data) => {
    const requestData = async () => {
      await query(myQuery(data));
      //Could set here error messagens if API fails
    };
    requestData().then(onAfterSubmit);
  };

  const onFinish = (values) => {
    setConfirmLoading(true);
    console.log("onfinish", values);
    if (initialInputData) {
      submitQuery(queryEditCompany, { _id: initialInputData?._id, ...values })
    } else {
      submitQuery(queryAddCompany, values)
    }
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
