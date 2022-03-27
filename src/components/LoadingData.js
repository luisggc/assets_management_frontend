import { Spin, Result } from "antd";

export default function LoadingData({ error, loading }) {
  if (loading) return <Spin />;
  if (error)
    return (
      <Result
        status="warning"
        title="There are some problems with the load. Retry later."
      />
    );
}
