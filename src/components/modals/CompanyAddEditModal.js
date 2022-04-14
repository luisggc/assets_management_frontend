import { Modal, Input, Form, Button } from "antd";
import { ADD_COMPANY, EDIT_COMPANY, COMPANIES } from "../../api/CompanyQueries";
import { useMutation } from "@apollo/client";
import openNotification from "../openNotification";

const AddEditModal = (props) => {
  const { isVisible, initialInputData, handleCancel } = props;
  const isEdit = initialInputData !== undefined; // else is add
  const [addCompany, addCompanyResponse] = useMutation(ADD_COMPANY, {
    onCompleted: () => openNotification("Company added!", "success"),
    onError: (error) => openNotification("Company not added!: " + error, "error"),
  });
  const [editCompany, editCompanyResponse] = useMutation(EDIT_COMPANY, {
    onCompleted: () => openNotification("Company edited!", "success"),
    onError: () => openNotification("Company not edited!", "error"),
  });

  const loading = isEdit ? editCompanyResponse?.loading : addCompanyResponse?.loading;
  const inputProps = {
    name: {
      label: "Name",
      name: "name",
      rules: [{ required: true }],
    },
  };
  var onAfterSubmit = () => {
    //props.onAfterSubmit();
    handleCancel();
  };

  const onFormSend = (values) => {
    if (isEdit) {
      const variables = { variables: { _id: initialInputData?._id, ...values } };
      editCompany(variables).then((_) => onAfterSubmit());
    } else {
      addCompany({
        variables: values,
        update: (cache, { data: { createCompany } }) => {
          const data = cache.readQuery({ query: COMPANIES });
          cache.writeQuery({
            query: COMPANIES,
            data: { ...data, companies: [createCompany, ...data.companies] },
          });
        },
      }).then((_) => onAfterSubmit());
    }
  };

  return (
    <Modal
      title={"Add modal"}
      visible={isVisible}
      loading={loading}
      footer={<Footer handleCancel={handleCancel} loading={loading} />}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form {...formProps} onFinish={onFormSend}>
        <Form.Item {...inputProps?.name} initialValue={initialInputData?.name}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Footer = ({ handleCancel, loading }) => (
  <div>
    <Button key="cancel" onClick={handleCancel}>
      Cancel
    </Button>
    <Button loading={loading} form="myForm" type="primary" htmlType="submit">
      {loading ? "Sending" : "Send"}
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
