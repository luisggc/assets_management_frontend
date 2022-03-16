import { Table, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const CRUDTable = ({ data, columnsToDisplay, onEditRow, onDeleteRow }) => {
  let columns = columnsToDisplay.map((column, k) => ({
    title: column.label,
    dataIndex: column.value,
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
          <Popconfirm
            title="Are you sure to delete this item?"
            onConfirm={() => onDeleteRow(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      );
    },
  });

  return <Table columns={columns} dataSource={data} rowKey="_id" />;
};

export default CRUDTable;
