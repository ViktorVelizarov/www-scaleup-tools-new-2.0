import React from "react";
import { MultiSelect } from "react-multi-select-component";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

function ToolsForm({ newTool, tagsOptions, inputHandler, addTool, edit, updateTool }) {
  return (
    <div className="w-[100%] mt-5 flex flex-col">
      <h2 className="mb-5 text-xl font-bold">Tool form:</h2>
      <TextField
        id="tool-title"
        label="Title"
        InputLabelProps={{
          style: { border: "none" },
        }}
        name="title"
        variant="filled"
        value={newTool.title}
        onChange={inputHandler}
        className="mb-5 w-[100%]"
      />
      <label for="tool-image" className="font-bold">
        SVG:
      </label>
      <textarea
        id="tool-image"
        label="SVG"
        name="image"
        value={newTool.image}
        onChange={inputHandler}
        className="block mb-5 w-[100%] bg-[#e3e7ea] p-1 rounded-sm"
      >
      </textarea>
      <TextField
        id="tool-description"
        label="Description"
        InputLabelProps={{
          style: { border: "none" },
        }}
        name="description"
        variant="filled"
        multiline
        value={newTool.description}
        onChange={inputHandler}
        className="mb-5 w-[100%]"
      />
      <label
        htmlFor="type-of-qury"
        class="block text-lg border-none font-semibold leading-6"
      >
        Tags:
      </label>
      {console.log(newTool)}
      <div class="mt-2.5">
        <MultiSelect
          options={tagsOptions}
          value={newTool.tags}
          hasSelectAll={false}
          name
          onChange={inputHandler}
          labelledBy="Tags"
        />
      </div>
      {edit ? (
        <Button
          variant="contained"
          onClick={updateTool}
          className="bg-sky-500 w-[100%] py-4 my-5 font-semibold"
        >
          Update Tool
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={addTool}
          className="bg-sky-500 w-[100%] py-4 my-5 font-semibold"
        >
          Add Tool
        </Button>
      )}
    </div>
  );
}

export default ToolsForm;
