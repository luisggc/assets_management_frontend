import { Line } from "@ant-design/plots";
import { ASSETS_HEALTH_LEVEL_HISTORY } from "../../api/statisticQueries";
import { useQuery } from "@apollo/client";
import LoadingData from "../LoadingData";

const LineGraph = () => {
  const { loading, error, data } = useQuery(ASSETS_HEALTH_LEVEL_HISTORY);
  if (!data) return <LoadingData {...{ loading, error }} />;

  const historyData = data?.assetsStatistics?.healthLevelHistory;

  const config = {
    data: historyData,
    padding: "auto",
    xField: "datetime",
    yField: "health_level",
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
  };

  return <Line {...config} />;
};

export default LineGraph;
