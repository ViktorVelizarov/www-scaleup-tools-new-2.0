import React from "react";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

function UserForm({ newUser, inputHandler, addUser }) {
  return (
    <div className="w-[100%] mt-10 flex flex-col">
      <h2 className="mb-5 text-xl font-bold">Add new user:</h2>
      <TextField
        id="user-email"
        label="User Email"
        InputLabelProps={{
          style: { border: "none" },
        }}
        name="email"
        variant="filled"
        value={newUser.email}
        onChange={inputHandler}
        className="mb-5 w-[100%]"
      />
      <FormControl className="w-[100%] mb-5">
        <FormLabel style={{ border: "none" }}>Role</FormLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={newUser.role}
          label="Role"
          InputLabelProps={{
            style: { border: "none" },
          }}
          name="role"
          variant="filled"
          onChange={inputHandler}
        >
          <MenuItem value={"admin"}>Admin</MenuItem>
          <MenuItem value={"editor"}>Editor</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={addUser}
        className="bg-sky-500 w-[100%] py-4 my-5 font-semibold"
      >
        Add user
      </Button>
    </div>
  );
}

export default UserForm;
