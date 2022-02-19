import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./style";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    namaBarang: "",
    hargaBeli: "",
    hargaJual: "",
    stock: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id == currentId) : null
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      namaBarang: "",
      hargaBeli: "",
      hargaJual: "",
      stock: "",
      selectedFile: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Stock
        </Typography>
        <TextField
          name="namaBarang"
          variant="outlined"
          label="Nama Barang"
          fullWidth
          value={postData.namaBarang}
          onChange={(e) =>
            setPostData({ ...postData, namaBarang: e.target.value })
          }
          required
        />
        <TextField
          name="hargaBeli"
          variant="outlined"
          label="Harga Beli"
          fullWidth
          value={postData.hargaBeli}
          onChange={(e) =>
            setPostData({ ...postData, hargaBeli: e.target.value })
          }
          helperText="Input harus berupa angka"
          required
        />
        <TextField
          name="hargaJual"
          variant="outlined"
          label="Harga Jual"
          fullWidth
          value={postData.hargaJual}
          onChange={(e) =>
            setPostData({ ...postData, hargaJual: e.target.value })
          }
          helperText="Input harus berupa angka"
          required
        />
        <TextField
          name="stock"
          variant="outlined"
          label="Stock"
          fullWidth
          value={postData.stock}
          onChange={(e) => setPostData({ ...postData, stock: e.target.value })}
          helperText="Input harus berupa angka"
          required
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
