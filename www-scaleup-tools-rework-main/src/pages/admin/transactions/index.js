import { useState, useEffect } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Link from "next/link";
import moment from "moment";
import qs from "qs";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] =useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 225 },
    { field: "date", headerName: "Date", width: 225 },
    { field: "processed", headerName: "Processed", width: 100 },
    { field: "paid", headerName: "Paid", width: 100 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "query",
      headerName: "Query name",
      width: 250,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 200,
    },
    {
      field: "bookingInfo",
      headerName: "Calendly link",
      width: 600,
    },
    { field: "ico", headerName: "ICO", width: 100 },
    { field: "dic", headerName: "DIC", width: 125 },
    { field: "company", headerName: "Company name", width: 300 },
    {
      field: "companyCountry",
      headerName: "Company country",
      width: 300,
    },
    {
      field: "companyCity",
      headerName: "Company city",
      width: 300,
    },
    {
      field: "companyStreet",
      headerName: "Company street",
      width: 300,
    },
    {
      field: "companyPostal",
      headerName: "Company postal",
      width: 300,
    },
  ];

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = () => {
    const getTransactions = `/api/transactions/getAll`;
    axios
      .get(getTransactions)
      .then((res) => {
        const rows = res.data.map((transaction, key) => {
          transaction.id = transaction._id;
          transaction.processed = transaction.processed ? "Yes" : "No";
          transaction.paid = transaction.paid ? "Yes" : "No";
           transaction.date = moment(transaction.date).format(
             "MMMM Do YYYY, h:mm:ss a"
           );
          return transaction;
        });
        console.log("ROWS:");
        console.log(rows);
        setTransactions(rows);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const switchTransaction = (currentState) => {
    console.log("Processing...");
    console.log(currentState)
    console.log("choosed ids:");
    console.log(rowSelectionModel);
    const data = {
      ids: rowSelectionModel,
      processedState: currentState,
    };
    const processTransaction = `/api/transactions/changeProcessStatus`;
    axios
      .put(processTransaction, data, {})
      .then((res) => {
        console.log(res);
        const rows = res.data.map((transaction, key) => {
          transaction.id = transaction._id;
          transaction.processed = transaction.processed ? "Yes" : "No";
          transaction.paid = transaction.paid ? "Yes" : "No";
          transaction.date = moment(transaction.date).format(
            "MMMM Do YYYY, h:mm:ss a"
          );
          return transaction;
        });
        console.log("ROWS:");
        console.log(rows);
        setTransactions(rows);
        setRowSelectionModel([]);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const deleteTransactions = () => {
    const selectedBookings = transactions.filter((transaction) => {
      return rowSelectionModel.includes(transaction._id)
    }).map((transaction) => transaction.bookingInfo);
    console.log("Bookings that are going to be deleted:");
    console.log(selectedBookings);
    const ids = qs.stringify(rowSelectionModel);
    axios.put('/api/calendly/cancelMultipleBookings', {"bookings": selectedBookings})
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    axios.delete(`/api/transactions/deleteSelected?${ids}`)
      .then((res) => {
        console.log(res.data);
        const rows = res.data.map((transaction, key) => {
          transaction.id = transaction._id;
          transaction.processed = transaction.processed ? "Yes" : "No";
          transaction.paid = transaction.paid ? "Yes" : "No";
          transaction.date = moment(transaction.date).format(
            "MMMM Do YYYY, h:mm:ss a"
          );
          return transaction;
        });
        setTransactions(rows);
        setRowSelectionModel([]);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getConfirmation = (action) => {
    confirmAlert({
      title: "Confirm to change",
      message: `Are you sure you want to change the state of that transaction processing?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => switchTransaction(action),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const getConfirmationToDelete = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: `Are you sure you want to delete that transactions?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteTransactions(),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className="px-8 py-5 box-border ">
      <Box sx={{ height: 400, width: "100%" }}>
        {console.log("selected transactions:")}
        {console.log(rowSelectionModel)}
        <DataGrid
          rows={transactions}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
        />
      </Box>
      <div className="flex justify-center">
        <button
          className="mr-5 bg-sky-500 px-2 py-2 mt-5 rounded-md text-white hover:bg-sky-800"
          onClick={() => getConfirmation(true)}
        >
          <i class="fa fa-check" aria-hidden="true"></i>
          Mark as processed
        </button>
        <button
          className="mr-5 bg-sky-500 px-2 py-2 mt-5 rounded-md text-white hover:bg-sky-800"
          onClick={() => getConfirmation(false)}
        >
          <i class="fa fa-times" aria-hidden="true"></i>
          Mark as unprocessed
        </button>
        <button
          className="mr-5 bg-sky-500 px-2 py-2 mt-5 rounded-md text-white hover:bg-sky-800"
          onClick={() => getConfirmationToDelete()}
        >
          <i class="fa fa-times" aria-hidden="true"></i>
          Delete transactions
        </button>
        <Link
          className="mr-5 bg-sky-500 px-2 py-2 mt-5 rounded-md text-white hover:bg-sky-800"
          href="/admin"
        >
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
          Back
        </Link>
      </div>
    </div>
  );
};

export default TransactionsPage;
