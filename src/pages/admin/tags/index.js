import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import axios from "axios";
import Link from "@mui/material/Link";
import { Breadcrumbs } from "@mui/material";
import { Typography } from "@mui/material";
import ListOfTags from "@/components/TagsAdmin/ListOfTags";
import TagsForm from "@/components/TagsAdmin/TagsForm";

const UsersPage = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState(emptyTag);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    console.log("getting users UseEffect");
    axios
      .get("/api/tags/get?sort=desc")
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleFormInput = (event) => {
    let { name, value } = event.target;
    if (
      name === "textId" && value.includes(" ")
    ) {
      alert("The tag ID cannot contain a space");
    } else {
      if(name === "textId"){
        value = value.toLowerCase();
      }
      setNewTag({ ...newTag, [name]: value });
    }
  };

  const addNewTag = () => {
    if (
      !newTag.title ||
      !newTag.textId
    ) {
      alert("All field are required!");
    } else {
      axios
        .post("/api/tags/add", newTag)
        .then((response) => {
          console.log("Result of upload:");
          console.log(response.data);
          setTags(response.data);
          setNewTag(emptyTag);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleEditingBtn = (id) => {
    console.log(id);
    if (edit) {
      tags.push(newTag);
    }
    const editingTag = tags.splice(id, 1)[0];
    setNewTag({...editingTag});
    setTags([...tags]);
    setEdit(true);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  const deleteTag = (indx) => {
    axios
      .delete(`/api/tags/delete?id=${indx}`)
      .then((response) => {
        console.log("Result of update:");
        console.log(response.data);
        setTags(response.data);
        setNewTag(emptyTag);
        alert("The tag was successfully deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTag = () => {
    if (!newTag.title || !newTag.textId || !newTag.id) {
      alert("All field are required!");
    } else {
      axios
        .post("/api/tags/update", newTag)
        .then((response) => {
          console.log("Result of upload:");
          console.log(response.data);
          setTags(response.data);
          setNewTag(emptyTag);
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
        <TagsForm
          newTag={newTag}
          inputHandler={handleFormInput}
          addTag={addNewTag}
          edit={edit}
          updateTag={updateTag}
        />
        <ListOfTags
          tags={tags}
          handleEditingBtn={handleEditingBtn}
          deleteTag={deleteTag}
        />
      </div>
    </AdminLayout>
  );
};

export default UsersPage;

const emptyTag = {
  title: "",
  textId: ""
};
