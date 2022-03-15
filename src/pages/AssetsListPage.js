import React from "react";
import { query } from "../api/index.js";
import { queryGetAssets, queryDeleteAsset } from "../api/AssetQueries";
import { useState, useEffect, useCallback } from "react";
import { Button, Skeleton, Spin } from "antd";
import CRUDTable from "../components/CRUDTable";
import AssetAddEditModal from "../components/modals/AssetAddEditModal";

export default function AssetsListPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [itens, setItens] = useState();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [dataToEdit, setDataToEdit] = useState();

  const loadDataTable = useCallback(async () => {
    //Could improve performance to not read everything and make pagination load
    setIsLoading(true);
    const data = await query(queryGetAssets);
    const returnedData = data.assets.map((asset) => ({
      ...asset,
      unit: asset?.unit?.name,
      unit_id: asset?.unit?._id,
    }));
    setItens(returnedData);
    console.log(returnedData);
    //Could set here error messagens if API fails
    setIsLoading(false);
  }, []);

  const columnsToDisplay = [
    {
      value: "name",
      label: "Name",
    },
    {
      value: "image",
      label: "Image",
    },
    {
      value: "description",
      label: "Description",
    },
    {
      value: "model",
      label: "Model",
    },
    {
      value: "status",
      label: "Status",
    },
    {
      value: "health_level",
      label: "Health Level",
    },
    {
      value: "unit",
      label: "Unit",
    },
  ];

  const deleteItem = async (_id) => {
    await query(queryDeleteAsset(_id));
  };

  useEffect(() => {
    loadDataTable();
  }, [loadDataTable]);

  const onEditRow = (_id) => {
    setDataToEdit(itens.filter((d) => d?._id === _id)[0]);
    setModalIsVisible(true);
  };

  const onDeleteRow = (_id) => {
    deleteItem(_id).then(loadDataTable);
  };

  const handleModalCancel = () => {
    setModalIsVisible(false);
    setDataToEdit();
  };
  return (
    <>
      <Button
        onClick={() => setModalIsVisible(true)}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>

      <AssetAddEditModal
        isVisible={modalIsVisible}
        setModalIsVisible={setModalIsVisible}
        initialInputData={dataToEdit}
        handleCancel={handleModalCancel}
        onAfterSubmit={loadDataTable}
      />
      <div>
        {!isLoading ? (
          itens?.length > 0 ? (
            <CRUDTable
              data={itens}
              onEditRow={onEditRow}
              onDeleteRow={onDeleteRow}
              columnsToDisplay={columnsToDisplay}
            />
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
    </>
  );
}
