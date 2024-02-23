const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      `mongodb+srv://siyad:Ig1iUDeYIbse5Sgs@cluster0.lejceek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("db connected successfully");
    connect.connection.name, connect.connection.hostname;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
