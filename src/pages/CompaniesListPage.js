import React from "react";
import { query } from "../api/index.js";
import { queryGetCompanies, queryDeleteCompany } from "../api/CompanyQueries";
import { useState, useEffect, useCallback } from "react";
import { Button, Skeleton, Spin } from "antd";
import CRUDTable from "../components/CRUDTable";
import CompanyAddEditModal from "../components/modals/CompanyAddEditModal";

export default function CompanysListPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [itens, setItens] = useState();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [dataToEdit, setDataToEdit] = useState();

  const loadDataTable = useCallback(async () => {
    //Could improve performance to not read everything and make pagination load
    setIsLoading(true);
    const data = await query(queryGetCompanies);
    setItens(data.companies);
    setIsLoading(false);
    //Could set here error messagens if API fails
  }, []);

  const columnsToDisplay = [
    {
      value: "name",
      label: "Name",
      type: "string",
    },
  ];

  const deleteItem = async (_id) => {
    await query(queryDeleteCompany(_id));
  };

  useEffect(() => {
    loadDataTable();
  }, [loadDataTable]);

  const onEditRow = (_id) => {
    setDataToEdit(itens.filter((d) => d?._id === _id)[0]);
    setModalIsVisible(true);
  };

  const onDeleteRow = (_id) => {
    // Create a message saying It will affect units, etc
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
        Add a company
      </Button>

      <CompanyAddEditModal
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
