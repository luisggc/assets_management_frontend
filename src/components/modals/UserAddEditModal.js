import { Modal, Input, Form, Button, Select } from "antd";
import { USERS, ADD_USER, EDIT_USER } from "../../api/UserQueries";
import { useMutation, useQuery } from "@apollo/client";
import { COMPANIES } from "../../api/CompanyQueries";
import openNotification from "../openNotification";

const AddEditModal = (props) => {
  const { isVisible, initialInputData, handleCancel } = props;
  const isEdit = initialInputData !== undefined; // else is add
  const [addUser, addUserResponse] = useMutation(ADD_USER, {
    onCompleted: () => openNotification("User added!", "success"),
    onError: (error) => openNotification("User not added!: " + error, "error"),
  });
  const [editUser, editUserResponse] = useMutation(EDIT_USER, {
    onCompleted: () => openNotification("User edited!", "success"),
    onError: () => openNotification("User not edited!", "error"),
  });
  const companyResponse = useQuery(COMPANIES, { skip: !isVisible });
  const loading =
    (isEdit ? addUserResponse?.loading : editUserResponse?.loading) | companyResponse?.loading;

  console.log(companyResponse?.data);
  const inputProps = {
    name: {
      label: "Name",
      name: "name",
      rules: [{ required: true }],
    },
    company: {
      label: "Company",
      name: "company",
      rules: [{ required: true }],
      initialValue: companyResponse?.data?.companies,
    },
  };

  const onFormSend = (values) => {
    if (isEdit) {
      const variables = {
        variables: {
          ...values,
          _id: initialInputData?._id,
        },
      };
      editUser(variables)
    } else {
      addUser({
        variables: values,
        update: (cache, { data }) => {
          const createUser = data?.createUser;
          const initialData = cache.readQuery({ query: USERS });
          cache.writeQuery({
            query: USERS,
            data: { ...initialData, users: [createUser, ...initialData.users] },
          });
        },
      })
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
