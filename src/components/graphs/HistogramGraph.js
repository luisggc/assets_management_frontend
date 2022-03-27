import { Histogram } from "@ant-design/plots";
import { ASSETS_BY_HEALTH_LEVEL } from "../../api/statisticQueries";
import { useQuery } from "@apollo/client";
import LoadingData from "../LoadingData";

const HistogramGraph = () => {
  const { loading, error, data } = useQuery(ASSETS_BY_HEALTH_LEVEL);
  if (!data) return <LoadingData {...{ loading, error }} />;
  const dataAsset = data?.assetsStatistics?.assetsByHealthLevel;

  const config = {
    data: dataAsset,
    binField: "health_level",
    binWidth: 0.2,
  };

  return <Histogram {...config} />;
};

export default HistogramGraph;
