import React from "react";
import { USERS, DELETE_USER } from "../api/UserQueries";
import { useState } from "react";
import { Button } from "antd";
import CRUDTable from "../components/CRUDTable";
import UserAddEditModal from "../components/modals/UserAddEditModal";
import { useMutation, useQuery } from "@apollo/client";
import openNotification from "../components/openNotification";
import LoadingData from "../components/LoadingData";

export default function UsersListPage() {
  const { loading, error, data } = useQuery(USERS);
  const [deleteUser, deleteUserResponse] = useMutation(DELETE_USER, {
    onCompleted: () => openNotification("User removed!", "success"),
    onError: () => openNotification("User not removed!", "error"),
  });

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [dataToEdit, setDataToEdit] = useState();

  if (!data) return <LoadingData {...{ loading: loading | deleteUserResponse?.loading, error }} />;

  const itens = data?.users?.map((user) => ({
    ...user,
    company: user?.company?.name,
    company_id: user?.company?._id,
  }));

  console.log(data);

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

  const deleteItem = (_id) => {
    deleteUser({
      variables: { _id },
      update: (cache) => {
        const data = cache.readQuery({ query: USERS });
        cache.writeQuery({
          query: USERS,
          data: { users: data.users.filter((_) => _._id !== _id) },
        });
      },
    });
  };

  const onEditRow = (_id) => {
    setDataToEdit(itens.filter((d) => d?._id === _id)[0]);
    setModalIsVisible(true);
  };

  const onDeleteRow = (_id) => {
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
        Add a user
      </Button>

      {modalIsVisible && (
        <UserAddEditModal
          isVisible={modalIsVisible}
          setModalIsVisible={setModalIsVisible}
          initialInputData={dataToEdit}
          handleCancel={handleModalCancel}
        />
      )}

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
