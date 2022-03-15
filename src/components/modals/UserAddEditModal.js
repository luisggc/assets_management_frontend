import { Modal, Input, Form, Button, Select } from "antd";
import { useState, useEffect } from "react";
import { query } from "../../api/index.js";
import { queryAddUser, queryEditUser } from "../../api/UserQueries";
import { queryGetCompanies } from "../../api/CompanyQueries";

const AddEditModal = ({
  isVisible,
  setModalIsVisible,
  initialInputData,
  onAfterSubmit,
  handleCancel,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputProps, setInputProps] = useState({
    name: {
      label: "Name",
      name: "name",
      rules: [{ required: true }],
    },
    company: {
      label: "Company",
      name: "company",
      rules: [{ required: true }],
    },
  });

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
      submitQuery(queryEditUser, { _id: initialInputData?._id, ...values });
    } else {
      submitQuery(queryAddUser, values);
    }
    onAfterSubmit();
    setConfirmLoading(false);
    setModalIsVisible(false);
  };

  useEffect(() => {
    const getOptionsField = async () => {
      const companies = await query(queryGetCompanies);
      return { company: companies };
    };
    const optionsValuesPromise = getOptionsField();
    optionsValuesPromise.then((optionsValues) => {
      setInputProps((state) => ({
        ...state,
        company: {
          ...state.company,
          initialValue: optionsValues.company.companies,
        },
      }));
    });
  }, []);

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
        <Form.Item {...inputProps?.company} initialValue={initialInputData?.company_id}>
          <Select showSearch optionFilterProp="children" filterOption={filterOptions}>
            {inputProps?.company?.initialValue?.map((single_company, k) => (
              <Select.Option key={k} value={single_company?._id}>
                {single_company?.name}
              </Select.Option>
            ))}
          </Select>
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

const filterOptions = (input, option) =>
  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

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
