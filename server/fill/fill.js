require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const types = require("./types.json");
const EquipmentModel = require("../db/equipment.model");

const mongoUrl = "mongodb+srv://Zrna:Mongo@theemployees.rzm074z.mongodb.net/";

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const fillEquipment = async () => {
    await EquipmentModel.deleteMany({});
  
    const equipment = names.map((name) => ({
      name,
      type: pick(types),
      amount: Math.floor(Math.random() * 10),
    }));
  
    await EquipmentModel.create(...equipment);
    console.log("Equipment created");
  };

  const main = async () => {
    await mongoose.connect(mongoUrl);
  
    await fillEquipment();
  
    await mongoose.disconnect();
  };
  
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
  