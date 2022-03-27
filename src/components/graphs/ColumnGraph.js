import { Column } from "@ant-design/plots";
import { ASSETS_BY_UNIT } from "../../api/statisticQueries";
import { useQuery } from "@apollo/client";
import LoadingData from "../LoadingData";

const ColumnGraph = () => {
  const { loading, error, data } = useQuery(ASSETS_BY_UNIT);
  if (!data) return <LoadingData {...{ loading, error }} />;

  const dataAsset = data?.assetsStatistics?.assetsByField;

  const config = {
    data: dataAsset,
    autoFit: true,
    xField: "field",
    yField: "assets",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "类别",
      },
      sales: {
        alias: "销售额",
      },
    },
  };
  return <Column {...config} />;
};

export default ColumnGraph;
