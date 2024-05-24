import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AdminLayout from "@/Layouts/AdminLayout";
import ListOfUsers from "@/components/Users/ListOfUsers";
import ToolsForm from "@/components/ToolsAdmin/ToolsForm";
import axios from "axios";
import Link from "@mui/material/Link";
import { Breadcrumbs } from "@mui/material";
import { Typography } from "@mui/material";
import ListOfTools from "@/components/ToolsAdmin/ListOfTools";


const UsersPage = () => {
  const [tools, setTools] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTool, setNewTool] = useState(emptyTool);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    console.log("getting users UseEffect");
    axios
      .get("/api/tags/get")
      .then((response) => {
        console.log(response.data);
        const tagsOptions = response.data.map((tag) => {
          const tagOption = {
            label: tag.title,
            value: tag.id,
          };
          return tagOption;
        });
        setTags(tagsOptions);
      })
      .catch((error) => console.log(error));
    axios
      .get("/api/tools/get")
      .then((response) => {
        console.log(response.data);
        setTools(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleFormInput = (event) => {
    if (event.target) {
      const { name, value } = event.target;
      if (
        (name === "image" && value.length < 4294967294) ||
        (name === "description" && value.length < 148) ||
        name === "title"
      ) {
        setNewTool({ ...newTool, [name]: value });
      }else{
        alert(
          "Max length for description: 148 characters (including spaces). Max length for SVG: 4 294 967 294 characters (includings spaces)"
        );
      }
    } else {
      setNewTool({ ...newTool, ["tags"]: [...event] });
    }
  };

  const checkSVG = (svg) => {
    // Check length
    if (svg.length > 4294967294) {
      return false;
    }
    // Check if SVG (ignoring trailing whitespace) ends with </svg>
    if (!svg.trim().endsWith("</svg>")) {
      return false;
    }
    // Check for xmlns or xmlns:xlink attribute after optional <?xml> and <!DOCTYPE> elements
    const svgTagStartIndex = svg.search(/<svg\b/i);
    if (svgTagStartIndex === -1) {
      return false; // Return false if no <svg> tag is found
    }
    const svgTagEndIndex = svg.indexOf(">", svgTagStartIndex) + 1;
    const svgStart = svg.slice(svgTagStartIndex, svgTagEndIndex);
    if (!(/xmlns=/.test(svgStart) || /xmlns:xlink=/.test(svgStart))) {
      return false;
    }
    return true;
  };

  const addNewTool = () => {
    if (
      !newTool.title ||
      !newTool.description ||
      !newTool.image ||
      !newTool.tags.length
    ) {
      alert("All field are required!");
    } else if (!checkSVG(newTool.image)) {
      alert(
        'The SVG must be less than 4,294,967,295 characters long, the SVG code must end with the "</svg>" element and the <svg> element must have an xmlns or xmlns:xlink attribute in the beginning, for example <svg xmlns:xlink="somelink">'
      );
    } else {
      axios
        .post("/api/tools/add", newTool)
        .then((response) => {
          console.log("Result of upload:");
          console.log(response.data);
          setTools(response.data);
          setNewTool(emptyTool);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleEditingBtn = (id) => {  
    if(edit){
      tools.push(newTool);
    }
    const editingTool = tools.splice(id, 1)[0];
    editingTool.tags = editingTool.tags.map((tag) => {
      if(!tag.value){
        const tagOption = {
          label: tag.tag.title,
          value: tag.tag.id,
        };
        console.log(tagOption);
        return tagOption;
      }else{
        return tag;
      }
    });
    setNewTool(editingTool);
    setTools([...tools]);
    setEdit(true);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  const deleteTool = (indx) => {
    axios
      .delete(`/api/tools/delete?id=${indx}`)
      .then((response) => {
        console.log("Result of update:");
        console.log(response.data);
        setTools(response.data);
        setNewTool(emptyTool);
        setEdit(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTool = () => {
    if (
      !newTool.title ||
      !newTool.description ||
      !newTool.image ||
      !newTool.tags.length
    ) {
      alert("All field are required!");
    } else if (!checkSVG(newTool.image)) {
      alert(
        'The SVG must be less than 100,000 characters long, the SVG code must end with the "</svg>" element and the <svg> element must have an xmlns or xmlns:xlink attribute in the beginning, for example <svg xmlns:xlink="somelink">'
      );
    } else {
      axios
        .put("/api/tools/update", newTool)
        .then((response) => {
          console.log("Result of update:");
          console.log(response.data);
          setTools(response.data);
          setNewTool(emptyTool);
          setEdit(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
            Tools
          </Typography>
        </Breadcrumbs>
        <ToolsForm
          newTool={newTool}
          tagsOptions={tags}
          inputHandler={handleFormInput}
          addTool={addNewTool}
          edit={edit}
          updateTool={updateTool}
        />
        <ListOfTools tools={tools} handleEditingBtn={handleEditingBtn} deleteTool={deleteTool}/>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;

const emptyTool = {
  title: "",
  image: "",
  description: "",
  tags: [],
};
