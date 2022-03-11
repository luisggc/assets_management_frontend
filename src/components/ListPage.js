import CRUDTable from "./CRUDTable";
import { useState, useEffect, useCallback } from "react";
import { query } from "../api/index.js";
import { Skeleton, Spin, Button } from "antd";
import AddEditModal from "./AddEditModal";

const ListPage = ({
  itemName,
  queryGetItems,
  queryDeleteItem,
  queryAddItem,
  queryEditItem,
  columnsToDisplay,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [itens, setItens] = useState();
  const [addModalIsVisible, setAddModalIsVisible] = useState(false);
  const [editModalIsVisible, setEditModalIsVisible] = useState(false);
  const [dataToEdit, setDataToEdit] = useState();

  return (
    
  );
};

export default ListPage;
