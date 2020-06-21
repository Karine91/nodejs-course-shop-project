const { ObjectId } = require("mongodb");

const getDb = require("../util/database").getDb;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    return getDb().collection("users").insertOne(this);
  }

  getCart() {
    const productIds = this.cart.items.map(
      (el) => el.productId
    );
    return getDb()
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find(
              (el) =>
                el.productId.toString() === p._id.toString()
            ).quantity,
          };
        });
      });
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(
      (elem) => {
        return (
          elem.productId.toString() ===
          product._id.toString()
        );
      }
    );

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex !== -1) {
      newQuantity =
        this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[
        cartProductIndex
      ].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };
    return getDb()
      .collection("users")
      .updateOne(
        { _id: ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  deleteFromCart(prodId) {
    const updatedProducts = this.cart.items.filter(
      (el) => el.productId.toString() !== prodId.toString()
    );
    return getDb()
      .collection("users")
      .updateOne(
        { _id: ObjectId(this._id) },
        { $set: { cart: { items: updatedProducts } } }
      );
  }

  addOrder() {
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: ObjectId(this._id),
            name: this.name,
          },
        };
        return getDb()
          .collection("orders")
          .insertOne(order);
      })
      .then(() => {
        this.cart = { items: [] };
        return getDb()
          .collection("users")
          .updateOne(
            { _id: ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  getOrders() {
    return getDb()
      .collection("orders")
      .find({ "user._id": ObjectId(this._id) })
      .toArray();
  }

  static findById(userId) {
    return getDb()
      .collection("users")
      .findOne({ _id: ObjectId(userId) });
  }
}

module.exports = User;
