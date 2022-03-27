import React from "react";
import { Gauge } from "@ant-design/plots";
import { AVERAGE_HEALTH_LEVEL_ASSET } from "../../api/statisticQueries";
import { useQuery } from "@apollo/client";
import LoadingData from "../LoadingData";

const GaugeGraph = () => {
  const { loading, error, data } = useQuery(AVERAGE_HEALTH_LEVEL_ASSET);
  if (!data) return <LoadingData {...{ loading, error }} />;

  const percent = data?.assetsStatistics?.averageHealthLevelAsset / 100;

  const config = {
    percent,
    range: {
      ticks: [0, 1 / 3, 2 / 3, 1],
      color: ["#F4664A", "#FAAD14", "#30BF78"],
    },
    indicator: {
      pointer: {
        style: {
          stroke: "#D0D0D0",
        },
      },
      pin: {
        style: {
          stroke: "#D0D0D0",
        },
      },
    },
    statistic: {
      content: {
        style: {
          fontSize: "36px",
          lineHeight: "36px",
        },
      },
    },
  };
  return <Gauge {...config} height={300 - 23.7} />;
};

export default GaugeGraph;
