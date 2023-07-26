import mongoose from "mongoose";

const Adminschema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 10,
  },
  
},
{timeStamps: true}
);

const Admin = mongoose.model("Admin", Adminschema)
export default Admin;
