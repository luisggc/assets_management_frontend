import { useState } from "react";
import { Card, Image, Typography, Popconfirm, Tag, Menu, Dropdown } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  BorderlessTableOutlined,
  DashboardOutlined,
  ApartmentOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { queryAddAsset } from "../../api/AssetQueries";
import { query } from "../../api/index.js";
import AssetsLog from "./AssetsLog";

const { Meta } = Card;
const { Paragraph } = Typography;

export default function CardAsset({ data, onEditRow, onDeleteRow, onAfterSubmit }) {
  const [assetLogVisible, setAssetLogVisible] = useState(false);

  const submitQuery = (myQuery, data) => {
    const requestData = async () => {
      await query(myQuery(data));
      //Could set here error messagens if API fails
    };
    requestData().then(onAfterSubmit);
  };
  const health_level = Math.round(100 * data?.health_level);
  let healthLevelComponentProps = (health_level) => {
    if (health_level >= 80) return { icon: <CheckCircleOutlined />, color: "success" };
    if (health_level >= 50) return { icon: <ExclamationCircleOutlined />, color: "warning" };
    return { icon: <CloseCircleOutlined />, color: "error" };
  };
  healthLevelComponentProps = healthLevelComponentProps(health_level);

  return (
    <>
      <AssetsLog visible={assetLogVisible} setVisible={setAssetLogVisible} assetId={data?._id} />
      <Card
        style={{ width: 300 }}
        cover={
          <>
            <div style={styles.assetDetails}>
              <Tag color={healthLevelComponentProps?.color} icon={healthLevelComponentProps?.icon}>
                {health_level + "%"}
              </Tag>
              <Tag color="#108ee9" icon={<BorderlessTableOutlined />}>
                {data?.model}
              </Tag>
              <Tag color="#108ee9" icon={<DashboardOutlined />}>
                {data?.status}
              </Tag>

              <Tag color="#108ee9" icon={<ApartmentOutlined />}>
                {data?.unit}
              </Tag>
            </div>
            <Image
              alt={data?.name}
              src={data?.image}
              style={{ height: "150px", objectFit: "scale-down" }}
              fallback="data:image/png;base64,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"
            />
          </>
        }
        actions={[
          <EditOutlined key="edit" onClick={() => onEditRow(data?._id, data)} />,
          <Popconfirm
            key="delete"
            title="Are you sure to delete this item?"
            onConfirm={() => onDeleteRow(data?._id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>,
          <Dropdown
            overlay={() => (
              <Menu>
                <Menu.Item key="0">
                  <Popconfirm
                    key="copy"
                    title="Are you sure to duplicate this item?"
                    onConfirm={() => submitQuery(queryAddAsset, { ...data, unit: data?.unit_id })}
                    okText="Yes"
                    cancelText="No"
                  >
                    Duplicate
                  </Popconfirm>
                </Menu.Item>
                <Menu.Item key="1">
                  <span onClick={() => setAssetLogVisible(true)}>See status history</span>
                </Menu.Item>
              </Menu>
            )}
            trigger={["click"]}
          >
            <EllipsisOutlined />
          </Dropdown>,
        ]}
      >
        <Meta
          title={data?.name}
          description={
            <>
              <div style={{ height: "auto" }}>
                <Paragraph
                  ellipsis={{
                    rows: 2,
                    expandable: true,
                    symbol: "Read more",
                  }}
                >
                  {data?.description}
                </Paragraph>
              </div>
            </>
          }
        />
      </Card>
    </>
  );
}

const styles = {
  assetDetails: {
    position: "absolute",
    right: 0,
    top: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    zIndex: 1,
    gap: "5px",
    opacity: 0.85,
    marginTop: 10,
    width: "10px",
    height: "150px",
  },
};