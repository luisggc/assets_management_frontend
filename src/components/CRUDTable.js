import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const CRUDTable = ({ data, columnsToDisplay, onEditRow, onDeleteRow }) => {

  const { _id, ...singleRow } = data[0];
  let columns = Object.keys(singleRow).map((column, k) => ({
    title: columnsToDisplay?.[column]?.label ?? column,
    dataIndex: column,
    //width: 200,
  }));

  columns.push({
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 125,
    render: (_, record) => {
      return (
        <div key={record._id}>
          <Button onClick={() => onEditRow(record._id)}>
            <EditOutlined />
          </Button>
          <Button onClick={() => onDeleteRow(record._id)}>
            <DeleteOutlined />
          </Button>
        </div>
      );
    },
  });

  return (
      <Table columns={columns} dataSource={data} rowKey="_id"/>
  );
};

export default CRUDTable;
