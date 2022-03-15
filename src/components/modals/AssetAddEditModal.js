import { Modal, Input, Form, Button, Select } from "antd";
import { useState, useEffect } from "react";
import { query } from "../../api/index.js";
import { queryAddAsset, queryEditAsset } from "../../api/AssetQueries";
import { queryGetUnits } from "../../api/UnitQueries";

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
    image: {
      label: "Image",
      name: "image",
      rules: [{ required: true }],
    },
    description: {
      label: "Description",
      name: "description",
      rules: [{ required: true }],
    },
    model: {
      label: "Model",
      name: "model",
      rules: [{ required: true }],
    },
    status: {
      label: "Status",
      name: "status",
      rules: [{ required: true }],
    },
    health_level: {
      label: "Health Level",
      name: "health_level",
      rules: [{ required: true }],
    },
    unit: {
      label: "Unit",
      name: "unit",
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
      submitQuery(queryEditAsset, { _id: initialInputData?._id, ...values });
    } else {
      submitQuery(queryAddAsset, values);
    }
    onAfterSubmit();
    setConfirmLoading(false);
    setModalIsVisible(false);
  };

  useEffect(() => {
    const getOptionsField = async () => {
      const units = await query(queryGetUnits);
      return { unit: units };
    };
    const optionsValuesPromise = getOptionsField();
    optionsValuesPromise.then((optionsValues) => {
      setInputProps((state) => ({
        ...state,
        unit: {
          ...state.unit,
          initialValue: optionsValues.unit.units,
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

        <Form.Item {...inputProps?.image} initialValue={initialInputData?.image}>
          <Input />
        </Form.Item>

        <Form.Item {...inputProps?.description} initialValue={initialInputData?.description}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item {...inputProps?.model} initialValue={initialInputData?.model}>
          <Input />
        </Form.Item>

        <Form.Item {...inputProps?.status} initialValue={initialInputData?.status}>
          <Select showSearch optionFilterProp="children" filterOption={filterOptions}>
            <Select.Option value="Running">Running</Select.Option>
            <Select.Option value="Alerting">Alerting</Select.Option>
            <Select.Option value="Stopped">Stopped</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item {...inputProps?.health_level} initialValue={initialInputData?.health_level}>
          <Input />
        </Form.Item>

        <Form.Item {...inputProps?.unit} initialValue={initialInputData?.unit_id}>
          <Select showSearch optionFilterProp="children" filterOption={filterOptions}>
            {inputProps?.unit?.initialValue?.map((single_unit, k) => (
              <Select.Option key={k} value={single_unit?._id}>
                {single_unit?.name}
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
