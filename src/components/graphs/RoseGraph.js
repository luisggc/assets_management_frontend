import React from "react";
import { Rose } from "@ant-design/plots";
import { ASSETS_BY_STATUS } from "../../api/statisticQueries";
import { useQuery } from "@apollo/client";
import LoadingData from "../LoadingData";

const RoseGraph = () => {
  const { loading, error, data } = useQuery(ASSETS_BY_STATUS);
  if (!data) return <LoadingData {...{ loading, error }} />;

  const dataAsset = data?.assetsStatistics?.assetsByField;

  const config = {
    data: dataAsset,
    xField: "field",
    yField: "assets",
    seriesField: "type",
    radius: 0.9,
    legend: {
      position: "bottom",
    },
  };
  return <Rose {...config} autoFit />;
};

export default RoseGraph;
