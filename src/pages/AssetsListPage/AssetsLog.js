import { Drawer } from "antd";
import { useCallback, useEffect, useState } from "react";
import { query } from "../../api/index.js";
import { queryGetAssetsLog } from "../../api/AssetQueries";
import CRUDTable from "../../components/CRUDTable.js";

const AssetsLog = ({ visible, setVisible, assetId }) => {
  const [logs, setLogs] = useState();

  const getQuery = useCallback((myQuery, data) => {
    const requestData = async () => {
      const logs = await query(myQuery(data));
      setLogs(logs?.assetsLog);
    };
    requestData()
  }, []);

  useEffect(() => {
    if (visible) {
      getQuery(queryGetAssetsLog, assetId);
    }
  }, [visible, getQuery, assetId]);

  const columnsToDisplay = [
    {
      value: "_id",
      label: "_id",
      type: "string",
    },
  ];

  return (
    <>
      <Drawer
        title="Asset Log"
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >

          <CRUDTable data={logs} columnsToDisplay={columnsToDisplay}  onDeleteRow={() => {}} />
        {/* {logs ? logs?.map((log) => <p key={log._id}>{log._id}</p>) : <p>No content</p>} */}
      </Drawer>
    </>
  );
};

export default AssetsLog;
