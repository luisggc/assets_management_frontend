import { DELETE_COMPANY, COMPANIES } from "../api/CompanyQueries";
import { useState } from "react";
import { Button } from "antd";
import CRUDTable from "../components/CRUDTable";
import CompanyAddEditModal from "../components/modals/CompanyAddEditModal";
import { useQuery, useMutation } from "@apollo/client";
import LoadingData from "../components/LoadingData";
import openNotification from "../components/openNotification";

export default function CompanysListPage() {
  const { loading, error, data } = useQuery(COMPANIES);
  const [deleteCompany, deleteCompanyResponse] = useMutation(DELETE_COMPANY, {
    onCompleted: () => openNotification("Company removed!", "success"),
    onError: () => openNotification("Company not removed!", "error"),
  });

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [dataToEdit, setDataToEdit] = useState();

  if (!data)
    return <LoadingData {...{ loading: loading | deleteCompanyResponse?.loading, error }} />;

  const itens = data?.companies;

  const columnsToDisplay = [
    {
      value: "name",
      label: "Name",
      type: "string",
    },
  ];

  const deleteItem = async (_id) => {
    deleteCompany({
      variables: { _id },
      update: (cache, { data: { deleteCompany } }) => {
        //console.log(deleteCompany);
        const data = cache.readQuery({ query: COMPANIES });
        //console.log(data.companies);
        //console.log(data.companies.filter((_) => _._id !== deleteCompany?._id));
        cache.writeQuery({
          query: COMPANIES,
          data: { ...data, companies: data.companies.filter((_) => _._id !== deleteCompany?._id) },
        });
      },
    });
  };

  const onEditRow = (_id) => {
    setDataToEdit(itens.filter((d) => d?._id === _id)[0]);
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
        Add a company
      </Button>

      <CompanyAddEditModal
        isVisible={modalIsVisible}
        setModalIsVisible={setModalIsVisible}
        initialInputData={dataToEdit}
        handleCancel={handleModalCancel}
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
