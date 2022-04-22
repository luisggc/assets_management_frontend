import { Button, Drawer } from "antd";
import { ASSETS_LOG, ADD_ASSET_LOG, DELETE_ASSET_LOG } from "../../api/AssetQueries";
import { useQuery, useMutation } from "@apollo/client";

import CRUDTable from "../../components/CRUDTable.js";
import openNotification from "../../components/openNotification";
import LoadingData from "../../components/LoadingData";

const AssetsLog = ({ visible, setVisible, assetId }) => {
  const { loading, error, data, refetch } = useQuery(ASSETS_LOG, {
    variables: { _id: assetId },
    skip: !visible,
  });
  console.log(loading)

  const [addAssetLog, addAssetLogResponse] = useMutation(ADD_ASSET_LOG, {
    onCompleted: () => {
      openNotification("Asset log added!", "success");
      refetch();
    },
    onError: (error) => openNotification("Asset log not added!: " + error, "error"),
  });

  const [deleteAssetLog, deleteAssetLogResponse] = useMutation(DELETE_ASSET_LOG, {
    onCompleted: () => {
      openNotification("Asset log deleted!", "success");
      refetch();
    },
    onError: (error) => openNotification("Asset log not deleted!: " + error, "error"),
  });

  const logs = data?.assetsLog?.map((log) => ({
    ...log,
    asset_name: log?.asset?.name,
    responsible_name: log?.responsible?.name,
    datetime: new Date(log?.datetime).toLocaleString("pt-BR"),
    value: Math.round(100 * log?.value, 0) + "%",
  }));
  console.log(logs);

  const createRandomLog = () => {
    addAssetLog({
      variables: {
        type: "Status",
        datetime: Date.now() + 100 * 60 * 60 * 24 * 150 * Math.random(),
        asset: assetId,
        responsible: [
          "621faaf5591d3bccccefad00",
          "621fab1a591d3bccccefad02",
          "621fab2e591d3bccccefad04",
          "622cfa0956402308cff4afe8",
        ][Math.round(Math.random() * 4)],
        value: Math.random(),
      },
    });
  };

  const onDeleteRow = (_id) => {
    deleteAssetLog({ variables: { _id } });
  };

  const columnsToDisplay = [
    {
      value: "datetime",
      label: "Date",
    },
    {
      value: "value",
      label: "Status",
    },
    {
      value: "asset_name",
      label: "Asset Name",
    },
    {
      value: "responsible_name",
      label: "Responsible Name",
    },
  ];

  return (
    <>
      <Drawer
        title="Asset Log"
        placement="right"
        onClose={() => setVisible(false)}
        visible={visible}
        width={window.innerHeight >= 1000 ? 1000 : "100%"}
      >
        {loading | error ? (
          <LoadingData
            {...{
              loading: loading | addAssetLogResponse?.loading | deleteAssetLogResponse?.loading,
              error,
            }}
          />
        ) : (
          <>
            <Button style={{ marginBottom: 20 }} onClick={createRandomLog}>
              Create random log
            </Button>

            <CRUDTable data={logs} columnsToDisplay={columnsToDisplay} onDeleteRow={onDeleteRow} />
          </>
        )}
      </Drawer>
    </>
  );
};

export default AssetsLog;
