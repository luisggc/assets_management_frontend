import { Card, Statistic } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons"; //ArrowUpOutlined
import ColumnGraph from "../components/graphs/ColumnGraph";
import GaugeGraph from "../components/graphs/GaugeGraph";
import HistogramGraph from "../components/graphs/HistogramGraph";
import LineGraph from "../components/graphs/LineGraph";
import RoseGraph from "../components/graphs/RoseGraph";
import DotMapGraph from "../components/graphs/DotMapGraph";
import "./HomePage.css";

export default function HomePage() {
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <Card style={styles.topCard}>
          <Statistic
            title="Average Status Assets"
            value={11.28}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
            suffix="%"
          />
        </Card>
        <Card style={styles.topCard}>
          <Statistic title="Assets" prefix="#" value={115} />
        </Card>
        <Card style={styles.topCard}>
          <Statistic title="Unit" value={3} prefix="#" />
        </Card>

        <Card style={styles.topCard}>
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: 12,
          marginTop: 12,
        }}
      >
        <Card className="two-columns">
          <LineGraph />
        </Card>
        <Card>
          <GaugeGraph />
        </Card>
        <Card>
          <RoseGraph />
        </Card>
        <Card>
          <ColumnGraph />
        </Card>
        <Card>
          <HistogramGraph />
        </Card>
        <Card className="two-columns">
          <DotMapGraph />
        </Card>
      </div>
    </>
  );
}

const styles = { topCard: { flexGrow: 1, flexBasis: 185 } };
