import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  namaBarang: String,
  hargaBeli: Number,
  hargaJual: Number,
  stock: Number,
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

postSchema.path("namaBarang").validate(async (namaBarang) => {
  const namaBarangCount = await mongoose.models.PostMessage.countDocuments({
    namaBarang,
  });
  return !namaBarangCount;
}, "Nama barang sudah ada!");

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
