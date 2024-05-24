import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

function ListOfUsers({ users, deleteUser, updateUser }) {
  return (
    <List className="w-[100%]">
      {users.map((user, indx) => (
        <ListItem
          key={indx}
          secondaryAction={
            <>
              <IconButton
                edge="end"
                aria-label="delete"
                name={indx.toString()}
                onClick={() => updateUser(indx)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                name={indx.toString()}
                onClick={() => deleteUser(indx)}
              >
                <DeleteIcon />
              </IconButton>
            </>
          }
        >
          <ListItemText primary={`${user.email}`} secondary={`${user.role}`} />
        </ListItem>
      ))}
    </List>
  );
}

export default ListOfUsers;
