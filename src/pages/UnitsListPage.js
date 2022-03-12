import React from "react";
import { query } from "../api/index.js";
import { queryGetUnits, queryDeleteUnit } from "../api/UnitQueries";
import { useState, useEffect, useCallback } from "react";
import { Button, Skeleton, Spin } from "antd";
import CRUDTable from "../components/CRUDTable";
import UnitAddEditModal from "../components/modals/UnitAddEditModal";

export default function UnitsListPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [itens, setItens] = useState();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [dataToEdit, setDataToEdit] = useState();

  const loadDataTable = useCallback(async () => {
    //Could improve performance to not read everything and make pagination load
    setIsLoading(true);
    const data = await query(queryGetUnits);
    const returnedData = data.units.map((unit) => ({
      ...unit,
      company: unit?.company?.name,
      company_id: unit?.company?._id,
    }));
    setItens(returnedData);
    console.log(returnedData)
    //Could set here error messagens if API fails
    setIsLoading(false);
  }, []);

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
    await query(queryDeleteUnit(_id));
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

      <UnitAddEditModal
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
