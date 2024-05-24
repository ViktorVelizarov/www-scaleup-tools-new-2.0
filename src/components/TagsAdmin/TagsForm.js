import React from "react";
import { MultiSelect } from "react-multi-select-component";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

function TagsForm({
  newTag,
  inputHandler,
  addTag,
  edit,
  updateTag,
}) {
  return (
    <div className="w-[100%] mt-5 flex flex-col">
      <h2 className="mb-5 text-xl font-bold">Tag form:</h2>
      <TextField
        id="tool-title"
        label="Title"
        InputLabelProps={{
          style: { border: "none" },
        }}
        name="title"
        variant="filled"
        value={newTag.title}
        onChange={inputHandler}
        className="mb-5 w-[100%]"
      />
      <TextField
        id="tool-title"
        label="Tag ID (one word without spaces)"
        InputLabelProps={{
          style: { border: "none" },
        }}
        name="textId"
        variant="filled"
        value={newTag.textId}
        onChange={inputHandler}
        className="mb-5 w-[100%]"
      />
      {edit ? (
        <Button
          variant="contained"
          onClick={updateTag}
          className="bg-sky-500 w-[100%] py-4 my-5 font-semibold"
        >
          Update Tool
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={addTag}
          className="bg-sky-500 w-[100%] py-4 my-5 font-semibold"
        >
          Add Tool
        </Button>
      )}
    </div>
  );
}

export default TagsForm;
