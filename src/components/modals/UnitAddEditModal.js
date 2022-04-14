import { Modal, Input, Form, Button, Select } from "antd";
import { UNITS, ADD_UNIT, EDIT_UNIT } from "../../api/UnitQueries";
import { COMPANIES } from "../../api/CompanyQueries";
import { useMutation, useQuery } from "@apollo/client";
import openNotification from "../openNotification";

const AddEditModal = (props) => {
  let { isVisible, initialInputData, handleCancel } = props;
  const isEdit = initialInputData !== undefined; // else is add
  const [addUnit, addUnitResponse] = useMutation(ADD_UNIT, {
    onCompleted: () => openNotification("Unit added!", "success"),
    onError: (error) => openNotification("Unit not added!: " + error, "error"),
  });
  const [editUnit, editUnitResponse] = useMutation(EDIT_UNIT, {
    onCompleted: () => openNotification("Unit edited!", "success"),
    onError: () => openNotification("Unit not edited!", "error"),
  });
  const companiesQuery = useQuery(COMPANIES);
  const [loadingCompanies, errorCompanies, dataCompanies] = [
    companiesQuery.loading,
    companiesQuery.error,
    companiesQuery.data,
  ];

  const loading = isEdit ? editUnitResponse?.loading : addUnitResponse?.loading;

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
      initialValue: dataCompanies?.companies,
    },
  };

  var onAfterSubmit = () => {
    //props.onAfterSubmit();
    handleCancel();
  };

  const onFormSend = (values) => {
    if (isEdit) {
      editUnit({
        variables: { _id: initialInputData?._id, ...values },
      }).then((_) => onAfterSubmit());
    } else {
      addUnit({
        variables: values,
        update: (cache, { data }) => {
          const createdUnit = data?.createUnit;
          const unitsData = cache.readQuery({ query: UNITS });
          cache.writeQuery({
            query: UNITS,
            data: {
              units: [createdUnit, ...unitsData.units],
            },
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
