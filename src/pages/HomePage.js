import React from "react";
import { Column, Gauge, Rose } from "@ant-design/plots";

const DemoRose = () => {
  const data = [
    {
      type: "分类一",
      value: 27,
    },
    {
      type: "分类二",
      value: 25,
    },
    {
      type: "分类三",
      value: 18,
    },
    {
      type: "分类四",
      value: 15,
    },
    {
      type: "分类五",
      value: 10,
    },
    {
      type: "其他",
      value: 5,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "value",
    seriesField: "type",
    radius: 0.9,
    legend: {
      position: "bottom",
    },
  };
  return <Rose {...config} />;
};

const DemoGauge = () => {
  const config = {
    percent: 0.75,
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
  return <Gauge {...config} />;
};

const DemoColumn = () => {
  const data = [
    {
      type: "家具家电",
      sales: 38,
    },
    {
      type: "粮油副食",
      sales: 52,
    },
    {
      type: "生鲜水果",
      sales: 61,
    },
    {
      type: "美容洗护",
      sales: 145,
    },
    {
      type: "母婴用品",
      sales: 48,
    },
    {
      type: "进口食品",
      sales: 38,
    },
    {
      type: "食品饮料",
      sales: 38,
    },
    {
      type: "家庭清洁",
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
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

export default function HomePage() {
  return (
    <div className="cardsAssetContainer">
      <DemoColumn />
      <DemoGauge />
      <DemoRose />
    </div>
  );
}
