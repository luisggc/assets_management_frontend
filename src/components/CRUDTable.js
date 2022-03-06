import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const CRUDTable = ({ data, technicalNameToFriendly, onEditRow, onDeleteRow }) => {

  const {_, ...singleRow}  = data[0]
  let columns = Object.keys(singleRow).map((column, k) => ({
    title: column, //technicalNameToFriendly[column],
    dataIndex: column,
    key: k,
    //width: 200,
  }));

  columns.push({
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 125,
    render: (_, record) => {
      console.log(record)
      return (
        <div>
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
    <div>
      <Button
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default CRUDTable;
