import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://chinmayab7787:778788@cluster0.gkfb1n9.mongodb.net/Todolists');
    console.log("DB Connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
