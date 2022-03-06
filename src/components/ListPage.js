import CRUDTable from "./CRUDTable";
import { useState, useEffect } from "react";
import { query } from "../api/index.js";
import { Skeleton, Spin } from "antd";

const ListPage = () => {
  const [itens, setItens] = useState();
  useEffect(() => {
    const requestData = async () => {
      const requestBody = {
        query: `{
        companies {
        name
        _id
        }
    }`,
      };
      const data = await query(requestBody);
      console.log(data);

      setItens(data.companies);
      //Could set here error messagens if API fails
    };
    requestData()
  }, []);

  const onEditRow = (_id) => {
    console.log(_id);
  };

  const onDeleteRow = (_id) => {
    console.log(_id);
  };

  console.log("itens", itens);

  return (
    <div>
      {itens ? (
        itens.length > 0 ? (
          <CRUDTable data={itens} onEditRow={onEditRow} onDeleteRow={onDeleteRow} />
        ) : (
          <p>No data</p>
        )
      ) : (
        <>
          <Spin />
          <Skeleton />
        </>
      )}
    </div>
  );
};

export default ListPage;
