import React from "react";
import { query } from "../api/index.js";
import { queryGetAssets, queryDeleteAsset } from "../api/AssetQueries";
import { useState, useEffect, useCallback } from "react";
import { Button, Spin, Card } from "antd";
import CardAsset from "./AssetsListPage/CardAsset";
import AssetAddEditModal from "../components/modals/AssetAddEditModal";

export default function AssetsListPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItens] = useState();
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

  const deleteItem = async (_id) => {
    await query(queryDeleteAsset(_id));
  };

  useEffect(() => {
    loadDataTable();
  }, [loadDataTable]);

  const onEditRow = (_id) => {
    setDataToEdit(items.filter((d) => d?._id === _id)[0]);
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
        Add an asset
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
          items?.length > 0 ? (
            <div className="cardsAssetContainer">
              {items.map((item) => (
                <CardAsset
                  key={item._id}
                  data={item}
                  onEditRow={onEditRow}
                  onDeleteRow={onDeleteRow}
                  onAfterSubmit={loadDataTable}
                />
              ))}
            </div>
          ) : (
            <p>No data</p>
          )
        ) : (
          <>
            <Spin />
            <div className="cardsAssetContainer">
            {Array.from(Array(13).keys()).map((key) => (
              <Card key={key} style={{ width: 300 }} loading />
            ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
