const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

// const getDb = require("../util/database").getDb;
// const { ObjectId } = require("mongodb");
// class Product {
//   constructor(
//     title,
//     price,
//     description,
//     imageUrl,
//     id,
//     userId
//   ) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id && ObjectId(id);
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     if (this._id) {
//       return db.collection("products").updateOne(
//         { _id: this._id },
//         {
//           $set: this,
//         }
//       );
//     }

//     return db.collection("products").insertOne(this);
//   }

//   static fetchAll() {
//     return getDb()
//       .collection("products")
//       .find()
//       .toArray()
//       .then((prods) => {
//         return prods;
//       })
//       .catch((err) => console.log(err));
//   }

//   static fetchById(prodId) {
//     return getDb()
//       .collection("products")
//       .findOne({ _id: ObjectId(prodId) });
//   }

//   static deleteById(prodId) {
//     return getDb()
//       .collection("products")
//       .deleteOne({ _id: ObjectId(prodId) });
//   }
// }

// module.exports = Product;
