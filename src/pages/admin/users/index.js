import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AdminLayout from "@/Layouts/AdminLayout";
import ListOfUsers from "@/components/Users/ListOfUsers";
import UserForm from "@/components/Users/UserForm";
import axios from "axios";
import Link from "@mui/material/Link";
import { Breadcrumbs } from "@mui/material";
import { Typography } from "@mui/material";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState(emptyUser);

  useEffect(() => {
    console.log("getting users UseEffect");
    axios
      .get("/api/users/get")
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleFormInput = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addNewUser = () => {
    const updatedUsers = [...users];
    updatedUsers.push(newUser);
    setNewUser(emptyUser);
    setUsers(updatedUsers);
  };

  const deleteUser = (indx) => {
    const updatedUsers = [...users];
    updatedUsers.splice(indx, 1);
    setUsers(updatedUsers);
  };

  const updateUser = (indx) => {
    console.log("updating users");
    const updatingUser = { ...users[indx] };
    const updatedUsers = [...users];
    updatedUsers.splice(indx, 1);
    if (newUser.email) {
      updatedUsers.push(newUser);
    }
    setNewUser(updatingUser);
    setUsers(updatedUsers);
  };

  const saveUsers = () => {
    axios
      .post("/api/users/update", users)
      .then((response) => {
        console.log(response);
        alert("Successfully updated");
      })
      .catch((error) => console.log(error));
  };

  return (
    <AdminLayout>
      <div className="w-[100%] md:w-[75%] flex flex-col items-center">
        <Breadcrumbs aria-label="breadcrumb" className="text-sky-700 my-10">
          <Link
            href="/admin"
            underline="always"
            className="text-sky-700 font-semibold text-xl"
          >
            Home
          </Link>
          <Typography className="text-sky-700 font-semibold text-xl">
            Users
          </Typography>
        </Breadcrumbs>
        <h1 className="mb-5 text-xl font-bold">Users that have access:</h1>
        <ListOfUsers
          users={users}
          deleteUser={deleteUser}
          updateUser={updateUser}
        />
        <UserForm
          newUser={newUser}
          inputHandler={handleFormInput}
          addUser={addNewUser}
        />
        <Button variant="contained" onClick={saveUsers} className="bg-sky-500 w-[100%] py-4 mb-10 font-semibold">
          Save users
        </Button>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;

const emptyUser = {
  email: "",
  role: "editor",
};
