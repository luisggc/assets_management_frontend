import { Button, Drawer } from "antd";
import { useCallback, useEffect, useState } from "react";
import { query } from "../../api/index.js";
import { queryGetAssetsLog, queryAddAssetLog, queryDeleteAssetLog } from "../../api/AssetQueries";
import CRUDTable from "../../components/CRUDTable.js";

const AssetsLog = ({ visible, setVisible, assetId }) => {
  const [logs, setLogs] = useState();

  const getQuery = useCallback((myQuery, data) => {
    const requestData = async () => {
      let logs = await query(myQuery(data));
      logs = logs?.assetsLog?.map((log) => ({
        ...log,
        asset_name: log?.asset?.name,
        responsible_name: log?.responsible?.name,
        datetime: new Date(log?.datetime).toLocaleString("pt-BR"),
        value: Math.round(100 * log?.value, 0) + "%",
      }));
      console.log(logs[0].datetime);
      setLogs(logs);
    };
    requestData();
  }, []);

  useEffect(() => {
    if (visible) {
      getQuery(queryGetAssetsLog, assetId);
    }
  }, [visible, getQuery, assetId]);

  const createRandomLog = () => {
    query(
      queryAddAssetLog({
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
      })
    ).then(() => getQuery(queryGetAssetsLog, assetId));
  };

  const deleteItem = async (_id) => {
    await query(queryDeleteAssetLog(_id));
  };
  
  const onDeleteRow = (_id) => {
    deleteItem(_id).then(() => getQuery(queryGetAssetsLog, assetId));
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
        <Button style={{ marginBottom: 20 }} onClick={createRandomLog}>
          Create random log
        </Button>

        <CRUDTable data={logs} columnsToDisplay={columnsToDisplay} onDeleteRow={onDeleteRow} />
        {/* {logs ? logs?.map((log) => <p key={log._id}>{log._id}</p>) : <p>No content</p>} */}
      </Drawer>
    </>
  );
};

export default AssetsLog;
