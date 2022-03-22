import { Card, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import ColumnGraph from "../components/graphs/ColumnGraph";
import GaugeGraph from "../components/graphs/GaugeGraph";
import HistogramGraph from "../components/graphs/HistogramGraph";
import LineGraph from "../components/graphs/LineGraph";
import RoseGraph from "../components/graphs/RoseGraph";
import DotMapGraph from "../components/graphs/DotMapGraph";

export default function HomePage() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gap: 12,
      }}
    >
      <div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Card style={{ minWidth: "83px", flexGrow: 1 }}>
            <Statistic
              title="Average Status Assets"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              suffix="%"
            />
          </Card>

          <Card style={{ minWidth: "83px", flexGrow: 1 }}>
            <Statistic
              title="Idle"
              value={9.4}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </div>

        <Card style={{ marginTop: 10 }}>
          <GaugeGraph />
        </Card>
      </div>
      <div>
        <Card>
          <RoseGraph />
        </Card>
      </div>
      <div>
        <Card>
          <ColumnGraph />
        </Card>
      </div>

      <div>
        <Card>
          <LineGraph />
        </Card>
      </div>

      <div>
        <Card>
          <HistogramGraph />
        </Card>
      </div>

      <div>
        <Card><DotMapGraph /></Card>
      </div>
    </div>
  );
}
