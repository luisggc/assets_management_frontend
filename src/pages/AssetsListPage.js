import CardAsset from "./AssetsListPage/CardAsset";
import { DELETE_ASSET, ASSETS } from "../api/AssetQueries";
import { useState } from "react";
import { Button } from "antd";
import AssetAddEditModal from "../components/modals/AssetAddEditModal";
import { useQuery, useMutation } from "@apollo/client";
import LoadingData from "../components/LoadingData";
import openNotification from "../components/openNotification";

export default function AssetsListPage() {
  const { loading, error, data } = useQuery(ASSETS);
  const [deleteAsset, deleteAssetResponse] = useMutation(DELETE_ASSET, {
    onCompleted: () => openNotification("Asset removed!", "success"),
    onError: () => openNotification("Asset not removed!", "error"),
  });

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [dataToEdit, setDataToEdit] = useState();

  if (!data) return <LoadingData {...{ loading: loading | deleteAssetResponse?.loading, error }} />;

  console.log(data);

  const items = data?.assets?.map((asset) => ({
    ...asset,
    unit: asset?.unit?.name,
    unit_id: asset?.unit?._id,
  }));

  console.log(items);

  const deleteItem = async (_id) => {
    deleteAsset({
      variables: { _id },
      update: (cache) => {
        const data = cache.readQuery({ query: ASSETS });
        cache.writeQuery({
          query: ASSETS,
          data: { assets: data.assets.filter((_) => _._id !== _id) },
        });
      },
    });
  };

  const onEditRow = (_id) => {
    setDataToEdit(items.filter((d) => d?._id === _id)[0]);
    setModalIsVisible(true);
  };

  const onDeleteRow = (_id) => {
    // Create a message saying It will affect units, etc
    deleteItem(_id);
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

      {modalIsVisible && (
        <AssetAddEditModal
          isVisible={modalIsVisible}
          setModalIsVisible={setModalIsVisible}
          initialInputData={dataToEdit}
          handleCancel={handleModalCancel}
        />
      )}

      <div>
        {items?.length > 0 ? (
          <div className="cardsAssetContainer">
            {items.map((item) => (
              <CardAsset
                key={item._id}
                data={item}
                onEditRow={onEditRow}
                onDeleteRow={onDeleteRow}
              />
            ))}
          </div>
        ) : (
          <p>No data</p>
        )}
      </div>
    </>
  );
}
