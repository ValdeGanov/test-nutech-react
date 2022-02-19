import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import moment from "moment";
import useStyles from "./style";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { deletePost } from "../../../actions/posts.js";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.namaBarang}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.namaBarang}</Typography>
        <Typography variant="body2">Stock : {post.stock}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <Edit fontSize="medium" />
        </Button>
      </div>
      <CardContent>
        <Typography className={classes.title} variant="h6" gutterBottom>
          Harga Beli : Rp{post.hargaBeli}
        </Typography>
        <Typography className={classes.title} variant="h6" gutterBottom>
          Harga Jual : Rp{post.hargaJual}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() =>
            Swal.fire({
              title: "Apakah kamu yakin ingin menghapusnya?",
              text: "Kamu tidak dapat mengembalikan item yang sudah dihapus!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ya, saya yakin!",
              cancelButtonText: "Tidak",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  "Item terhapus!",
                  "Item sudah terhapus dari database.",
                  "berhasil"
                ).then(() => dispatch(deletePost(post._id)));
              }
            })
          }
        >
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
