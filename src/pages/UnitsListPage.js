import React from "react";
import { UNITS, DELETE_UNIT } from "../api/UnitQueries";
import { useState } from "react";
import { Button } from "antd";
import CRUDTable from "../components/CRUDTable";
import UnitAddEditModal from "../components/modals/UnitAddEditModal";
import { useQuery, useMutation } from "@apollo/client";
import LoadingData from "../components/LoadingData";

export default function UnitsListPage() {
  const { loading, error, data, refetch } = useQuery(UNITS);
  const [deleteUnit, deleteUnitResponse] = useMutation(DELETE_UNIT);

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [dataToEdit, setDataToEdit] = useState();

  console.log(dataToEdit);
  if (!data) return <LoadingData {...{ loading, error }} />;

  const itens = data?.units?.map((unit) => ({
    ...unit,
    company: unit?.company?.name,
    company_id: unit?.company?._id,
  }));

  const loadDataTable = () => {
    refetch();
  };

  const columnsToDisplay = [
    {
      value: "name",
      label: "Name",
      type: "string",
    },
    {
      value: "company",
      label: "Company",
    },
  ];

  const deleteItem = async (_id) => {
    deleteUnit({ variables: { _id } });
  };

  const onEditRow = (_id) => {
    setDataToEdit(itens.filter((d) => d?._id === _id)[0]);
    setModalIsVisible(true);
  };

  const onDeleteRow = (_id) => {
    console.log(_id);
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
        Add a unit
      </Button>

      <UnitAddEditModal
        isVisible={modalIsVisible}
        setModalIsVisible={setModalIsVisible}
        initialInputData={dataToEdit}
        handleCancel={handleModalCancel}
        onAfterSubmit={loadDataTable}
      />
      <div>
        {itens?.length > 0 ? (
          <CRUDTable
            data={itens}
            onEditRow={onEditRow}
            onDeleteRow={onDeleteRow}
            columnsToDisplay={columnsToDisplay}
          />
        ) : (
          <p>No data</p>
        )}
      </div>
    </>
  );
}
