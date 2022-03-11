import { Modal, Input, Form, Button, Select } from "antd";
import { useState, useEffect } from "react";

const AddEditModal = ({ isVisible, setModalIsVisible, fields, title, onSubmit, data }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [optionsValues, setOptionsValues] = useState([]);

  const onFinish = (values) => {
    setConfirmLoading(true);
    console.log("onfinish", values);
    console.log("data", data);
    onSubmit({ _id: data?._id, ...values });
    setConfirmLoading(false);
    setModalIsVisible(false);
  };

  const handleCancel = () => {
    setModalIsVisible(false);
  };

  useEffect(() => {
    let fieldsWithOptions = fields?.filter((field) => Object.keys(field).includes("getOptions"));
    console.log(fieldsWithOptions);
    if (fieldsWithOptions?.length === 0) return;
    const getOptionsField = async (fieldsWithOptions) => {
      const optionsAndValues = fieldsWithOptions.map(async (field) => {
        return { value: field.value, options: await field.getOptions() };
      });
      return await Promise.all(optionsAndValues);
    };
    const promisseOptionsAndValues = getOptionsField(fieldsWithOptions);
    console.log(promisseOptionsAndValues);
    promisseOptionsAndValues.then((optionsAndValues) => {
      setOptionsValues(optionsAndValues.reduce((a, v) => ({ ...a, [v.value]: v.options }), {}));
    });
  }, [fields]);

  console.log(optionsValues);

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
          <Button
            loading={confirmLoading}
            form="myForm"
            type="primary"
            htmlType="submit"
            key="submit"
          >
            {confirmLoading ? "Sending" : "Send"}
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
        {fields.map((field) => {
          let { value, label, type } = field;
          type = type ? type : "string";

          return (
            <Form.Item
              key={value}
              label={label}
              name={value}
              initialValue={data?.[value]}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              {type === "options" ? (
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {optionsValues[value]?.map((v) => (
                    <Select.Option value={v.value} key={v.value}>
                      {v.label}
                    </Select.Option>
                  ))}
                </Select>
              ) : type === "string" ? (
                <Input />
              ) : (
                <></>
              )}
            </Form.Item>
          );
        })}
      </Form>
    </Modal>
  );
};

export default AddEditModal;
