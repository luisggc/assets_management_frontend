import { Card, Statistic, Spin, Skeleton } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons"; //ArrowUpOutlined
import ColumnGraph from "../components/graphs/ColumnGraph";
import GaugeGraph from "../components/graphs/GaugeGraph";
import HistogramGraph from "../components/graphs/HistogramGraph";
import LineGraph from "../components/graphs/LineGraph";
import RoseGraph from "../components/graphs/RoseGraph";
import "./HomePage.css";
import { useQuery } from "@apollo/client";
import { TOP_CARD_HOME } from "../api/statisticQueries";

export default function HomePage() {
  return (
    <>
      <TopCards />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: 12,
          marginTop: 12,
        }}
      >
        <Card title="Health Level along the Time" className="two-columns">
          <LineGraph />
        </Card>
        <Card title="Average Health Level">
          <GaugeGraph />
        </Card>
        <Card title="Assets by Status">
          <RoseGraph />
        </Card>
        <Card className="two-columns" title="Assets by Unit">
          <ColumnGraph />
        </Card>
        <Card className="two-columns" title="Distrbution of Assets per Status">
          <HistogramGraph />
        </Card>
        {/* <Card className="two-columns"><DotMapGraph /> </Card>*/}
      </div>
    </>
  );
}

const TopCards = () => {
  const { loading, data } = useQuery(TOP_CARD_HOME);

  if (loading)
    return (
      <>
        <Spin />
        <Skeleton />
      </>
    );
  /* if (error) return <p>{JSON.Stringify(error)}</p>; */

  const { assets, companies, units } = data?.assetsStatistics;
  const { name, health_level } = data?.assetsStatistics?.lowerHealthLevelAsset;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {/* <Card style={styles.topCard}>
        <Statistic
          title="Average Status Assets"
          value={averageHealthLevelAsset}
          precision={2}
          valueStyle={{ color: "#3f8600" }}
          suffix="%"
        />
      </Card> */}
      <Card style={styles.topCard}>
        <Statistic title="Assets" prefix="#" value={assets} />
      </Card>
      <Card style={styles.topCard}>
        <Statistic title="Units" prefix="#" value={units} />
      </Card>
      <Card style={styles.topCard}>
        <Statistic title="Companies" prefix="#" value={companies} />
      </Card>

      <Card style={styles.topCard}>
        <Statistic
          title={`Lowest Health Level Asset (${name})`}
          value={health_level}
          precision={2}
          valueStyle={{ color: "#cf1322" }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </div>
  );
};
const styles = { topCard: { flexGrow: 1, flexBasis: 185 } };
