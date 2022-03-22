import React from "react";
import { query } from "../api/index.js";
import { queryGetUsers, queryDeleteUser } from "../api/UserQueries";
import { useState, useEffect, useCallback } from "react";
import { Button, Skeleton, Spin } from "antd";
import CRUDTable from "../components/CRUDTable";
import UserAddEditModal from "../components/modals/UserAddEditModal";

export default function UsersListPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [itens, setItens] = useState();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [dataToEdit, setDataToEdit] = useState();

  const loadDataTable = useCallback(async () => {
    //Could improve performance to not read everything and make pagination load
    setIsLoading(true);
    const data = await query(queryGetUsers);
    const returnedData = data.users.map((user) => ({
      ...user,
      company: user?.company?.name,
      company_id: user?.company?._id,
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
      type: "string",
    },
    {
      value: "company",
      label: "Company",
    },
  ];

  const deleteItem = async (_id) => {
    await query(queryDeleteUser(_id));
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
        Add a user
      </Button>

      <UserAddEditModal
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
