/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config()
const mongoose = require("mongoose")
const names = require("./names.json")
const levels = require("./levels.json")
const positions = require("./positions.json")
const EmployeeModel = require("../db/employee.model")
const BrandsModel = require("../db/brand.model")
const bools = require("./bools.json")
const brandNames = require("./brands.json")
const employeeModel = require("../db/employee.model")
const ids = require("./brandIds.json")
const PositionModel = require("../db/positions.model")

const mongoUrl = process.env.MONGO_URL

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable")
  process.exit(1) // exit the current program
}

const pick = from => from[Math.floor(Math.random() * (from.length - 0))]

// let theID

// async function getId() {
//   const response = await BrandsModel.aggregate([{ $sample: { size:1 } }])
//   const data = response
//   theID = data[0]._id.toHexString()
//   console.log(theID);
// }

// getId()


const positionsToPopulate = [
  {name : "Main Actor", salary: 1200},
  {name : "Comic Relief", salary: 1000},
  {name : "Love Interests", salary: 1050},
  {name : "Protagonist", salary: 2000},
  {name : "Antagonist", salary: 2200},
  {name : "Operatour", salary: 2300},
  {name : "Director", salary: 1100},
  {name : "Joker", salary: 1200},
  {name : "Superhero", salary: 1350},
]


const number = [1,2,3,4,5]
const populateEmployees = async () => {

  await EmployeeModel.deleteMany({})

  const employees = names.map(name => ({
    name,
    level: pick(levels),
    position: pick(positions),
    present: pick(bools),
    brand: pick(ids),
    workLog: []
  }))

  await EmployeeModel.create(...employees)
  await EmployeeModel.find().populate("brand").exec()

  console.log("Employees created")
}



const populateBrands = async () => {
  await BrandsModel.deleteMany({})

  const brands = brandNames.map(brand => ({
    name: brand,
  }))

  await BrandsModel.create(...brands)
  console.log("Brands created")
}

const populatePositions = async () => {
  await PositionModel.deleteMany({})

  await PositionModel.insertMany(positionsToPopulate)
  console.log("position create");
  
}

const main = async () => {
  await mongoose.connect(mongoUrl)

  await populateEmployees()
  await populatePositions()
  await mongoose.disconnect()
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
