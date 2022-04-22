import { Modal, Input, Form, Button, Select, InputNumber } from "antd";
import { ADD_ASSET, EDIT_ASSET, ASSETS } from "../../api/AssetQueries";
import { UNITS } from "../../api/UnitQueries";
import { useMutation, useQuery } from "@apollo/client";
import openNotification from "../openNotification";

const AddEditModal = (props) => {
  const { isVisible, initialInputData, handleCancel } = props;
  const isEdit = initialInputData !== undefined; // else is add
  const [addAsset, addAssetResponse] = useMutation(ADD_ASSET, {
    onCompleted: () => openNotification("Asset added!", "success"),
    onError: (error) => openNotification("Asset not added!: " + error, "error"),
  });
  const [editAsset, editAssetResponse] = useMutation(EDIT_ASSET, {
    onCompleted: () => openNotification("Asset edited!", "success"),
    onError: () => openNotification("Asset not edited!", "error"),
  });
  const unitResponse = useQuery(UNITS, { skip: !isVisible });
  const loading =
    (isEdit ? addAssetResponse?.loading : editAssetResponse?.loading) && unitResponse.loading;

  const inputProps = {
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
      initialValue: unitResponse?.data?.units,
    },
    owner: {
      label: "Owner",
      name: "owner",
      rules: [{ required: true }],
    },
  };

  const onAfterSubmit = () => {
    handleCancel();
  };

  const onFormSend = (initialValues) => {
    const values = {
      ...initialValues,
      health_level: initialValues?.health_level / 100,
    };
    if (isEdit) {
      const variables = {
        variables: {
          ...values,
          _id: initialInputData?._id,
        },
      };
      editAsset(variables).then((_) => onAfterSubmit());
    } else {
      addAsset({
        variables: values,
        update: (cache, { data }) => {
          const createAsset = data?.createAsset;
          const initialData = cache.readQuery({ query: ASSETS });
          cache.writeQuery({
            query: ASSETS,
            data: { ...initialData, assets: [createAsset, ...initialData.assets] },
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

        <Form.Item {...inputProps?.image} initialValue={initialInputData?.image}>
          <Input />
        </Form.Item>

        <Form.Item {...inputProps?.description} initialValue={initialInputData?.description}>
          <Input.TextArea rows={4} spellCheck />
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

        <Form.Item {...inputProps?.health_level} initialValue={Math.round(100 * initialInputData?.health_level)}>
          <InputNumber
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace("%", "")}
          />
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

        <Form.Item {...inputProps?.owner} initialValue={initialInputData?.owner}>
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
