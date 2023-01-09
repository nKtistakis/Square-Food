const { MongoClient } = require("mongodb");
var mongodb = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.

// const mongo_host = process.env.MONGO_HOST || "127.0.0.1";
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = "squarefood";

async function getMenu() {
  console.log("Returning menu");
  try {
    await client.connect();
    const menuCollection = client.db(dbName).collection("menuItems");
    let results = await menuCollection.find().toArray();

    if (results.length === 0) {
      console.log("Will init menu...");
      await initMenu();
      results = await menuCollection.find().toArray();
    }

    const menu = await results.reduce((categories, item) => {
      const group = categories[item.category] || [];
      group.push(item);
      categories[item.category] = group;
      return categories;
    }, {});

    return menu;
  } catch (e) {
    return "Serverside error geting menu: " + e;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function initMenu() {
  const menu = require("./menu-template.json");

  try {
    await client.connect();
    const menuCollection = client.db(dbName).collection("menuItems");
    const result = await menuCollection.insertMany(menu.items);
    console.log(result);
  } catch (e) {
    return "Serverside error geting User: " + e;
  } // Dont disconect so we querry again without needing a new connection
}

//---------------------------------------------------------------------------------------------------------------------

async function addOrder(order) {
  console.log("Adding order");

  try {
    await client.connect();
    const ordersCollection = client.db(dbName).collection("orders");

    let results = await ordersCollection.insertOne(order);
    console.log(results);
  } catch (e) {
    return "Serverside error adding order: " + e;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  return;
}

async function completeOrder(id) {
  console.log("Deleting order");

  try {
    await client.connect();
    const ordersCollection = client.db(dbName).collection("orders");

    let results = await ordersCollection.deleteOne({
      _id: new mongodb.ObjectID(id),
    });
    console.log(results);
  } catch (e) {
    return "Serverside error adding order: " + e;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function getOrders() {
  console.log("Returning orders");
  try {
    await client.connect();
    const ordersCollection = client.db(dbName).collection("orders");
    let results = await ordersCollection.find().toArray();

    return results;
  } catch (e) {
    return "Serverside error geting orders: " + e;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = { getMenu, addOrder, getOrders, completeOrder };