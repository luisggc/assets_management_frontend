import CRUDTable from "./CRUDTable";
import { useState, useEffect } from "react";
import { query } from "../api/index.js";
import { Skeleton, Spin, Button } from "antd";
import AddEditModal from "./AddEditModal";

const ListPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [itens, setItens] = useState();
  const [addModalIsVisible, setAddModalIsVisible] = useState(false);
  const [editModalIsVisible, setEditModalIsVisible] = useState(false);
  const [dataToEdit, setDataToEdit] = useState();

  const columnsToDisplay = {
    name: {
      label: "Name",
    },
  };

  const loadDataTable = async () => {
    setIsLoading(true);
    const requestBody = {
      query: `{
          companies {
          name
          _id
          }
      }`,
    };
    const data = await query(requestBody);
    setItens(data.companies);
    setIsLoading(false);
    //Could set here error messagens if API fails
  };

  const deleteItem = async (_id) => {
    const requestBody = {
      query: `mutation {
                deleteCompany(_id: "${_id}")
        }`,
    };
    console.log(requestBody);
    await query(requestBody);
  };

  useEffect(() => {
    loadDataTable();
  }, []);

  const onEditRow = (_id) => {
    console.log(_id);
    setDataToEdit(itens.filter((d) => d?._id === _id)[0]);
    setEditModalIsVisible(true);
  };

  const onDeleteRow = (_id) => {
    deleteItem(_id);
    loadDataTable();
  };

  const onSubmitAddRow = (inputData) => {
    console.log("inputData", inputData);
    const requestData = async () => {
      const requestBody = {
        query: `mutation {
        createCompany(name: "${inputData.name}") {
          name
          }
      }`,
      };
      await query(requestBody);
      console.log(requestBody)
      //Could set here error messagens if API fails
    };
    requestData();
    loadDataTable();
  };

  const onSubmitEditRow = (data) => {
    console.log("inputData", data);
    const requestData = async () => {
      const requestBody = {
        query: `mutation {
        editCompany(CompanyInput: {_id: "${data._id}", name: "${data.name}"}){
            name
        }
      }`
      };
      await query(requestBody);
      //Could set here error messagens if API fails
    };
    requestData();
    loadDataTable();
  };

  return (
    <div>
      {!isLoading ? (
        <>
          <Button
            onClick={() => setAddModalIsVisible(true)}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            Add a row
          </Button>
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
          <AddEditModal
            isVisible={addModalIsVisible}
            setModalIsVisible={setAddModalIsVisible}
            fields={columnsToDisplay}
            onSubmit={onSubmitAddRow}
            title="Create a Company"
          />
          <AddEditModal
            isVisible={editModalIsVisible}
            setModalIsVisible={setEditModalIsVisible}
            fields={columnsToDisplay}
            onSubmit={onSubmitEditRow}
            title="Edit a Company"
            data={dataToEdit}
          />
        </>
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
