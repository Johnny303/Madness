require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const EmployeeModel = require("./db/employee.model")
const EquipmentModel = require("./db/equipment.model")
const BrandsModel = require("./db/brand.model")
const CompanyModel = require("./db/company.model")
const PositionModel = require("./db/positions.model")

const { MONGO_URL, PORT = 8080 } = process.env

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable")
  process.exit(1)
}

const randomNumber = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

const app = express()
app.use(express.json())

app.get("/work", async (req,res) => {
  const hours = req.query.hours
  const label = req.query.label
  const id = req.query.id
  const employee = await EmployeeModel.findOneAndUpdate({_id: id},{
    $push: {workLog: [{"hours": hours, "label": label}]}
  })
  return res.json(employee)
})

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find()
    .populate("brand")
    .sort({ yearsOfExp: -1 })
  return res.json(employees)
})
app.get("/api/companies/", async (req, res) => {
  const companies = await CompanyModel.find()
  return res.json(companies)
})

app.get("/api/create/company?", async (req, res) => {
  const newCompany = req.query.newCompany
  const companies = await CompanyModel.create({ name: newCompany })
  companies.save()
  return res.json(companies)
})

app.get("/api/similar", async (req, res) => {
  const level = req.query.level
  const position = req.query.position
  const employees = await EmployeeModel.find({
    level: level,
    position: position,
  })
  return res.json(employees)
})

app.get("/api/employees/sort?", async (req, res) => {
  const sortMethod = req.query.sortMethod
  const employees = await EmployeeModel.find()
    .populate("brand")
    .sort({ name: sortMethod })
  return res.json(employees)
})
app.get("/api/brands/", async (req, res) => {
  const employees = await BrandsModel.find().sort({ created: "desc" })
  return res.json(employees)
})

app.get("/api/employees/sortByLevel", async (req, res) => {
  const method = req.query.sortMethod
  const employees = await EmployeeModel.find().sort({ level: method })
  return res.json(employees)
})

app.get("/api/yearsOfExp?", async (req, res, next) => {
  const years = req.query.years

  try {
    const employees = await EmployeeModel.find({ yearsOfExp: years })
    return res.json(employees)
  } catch (err) {
    return res.status(200)
  }
})

app.get("/api/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id).populate("brand")
  return res.json(employee)
})
app.get("/notes/:id", async (req, res) => {
  const note = req.query.note

  const employee = await EmployeeModel.findByIdAndUpdate(req.params.id, {
    $push: { notes: note },
  })

  return res.json(employee)
})

app.get("/api/equipment/:id", async (req, res) => {
  const equipment = await EquipmentModel.findById(req.params.id)
  return res.json(equipment)
})

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body

  try {
    const saved = await EmployeeModel.create(employee)
    return res.json(saved)
  } catch (err) {
    return next(err)
  }
})

app.post("/api/equipment/", async (req, res, next) => {
  const equipment = req.body

  try {
    const saved = await EquipmentModel.create(equipment)
    return res.json(saved)
  } catch (err) {
    return next(err)
  }
})

app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    console.log(req.body)
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    )
    return res.json(employee)
  } catch (err) {
    return next(err)
  }
})
app.patch("/api/employees/present/:id", async (req, res, next) => {
  try {
    console.log(req.body)
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    )
    return res.json(employee)
  } catch (err) {
    return next(err)
  }
})
app.get("/api/employees/search/:name", async (req, res, next) => {
  try {
    const name = req.params.name
    const employee = await EmployeeModel.find({ name: { $regex: name } })
    return res.json(employee)
  } catch (err) {
    return next(err)
  }
})
app.get("/api/employees/new/createHeight", async (req, res, next) => {
  try {
    const documents = await EmployeeModel.find({})
    documents.forEach(async doc => {
      const randomNum = Math.floor(Math.random() * (190 - 140) + 140)
      await EmployeeModel.updateOne(
        { _id: doc._id },
        { $set: { height: randomNum } }
      )
    })

    return res.json(documents)
  } catch (err) {
    return next(err)
  }
})

app.patch("/api/equipment/:id", async (req, res, next) => {
  try {
    console.log(req.body)
    const equipment = await EquipmentModel.findOneAndUpdate(
      { _id: req.params.id },

      { $set: { ...req.body } },

      { new: true }
    )
    return res.json(equipment)
  } catch (err) {
    return next(err)
  }
})
app.patch("/api/equipment/decrease/:name", async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findOneAndUpdate(
      { name: req.params.name },

      { $inc: { amount: -1 } },

      { new: true }
    )
    return res.json(equipment)
  } catch (err) {
    return next(err)
  }
})

app.patch("/api/equipment/increase/:name", async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findOneAndUpdate(
      { name: req.params.name },

      { $inc: { amount: +1 } },

      { new: true }
    )
    return res.json(equipment)
  } catch (err) {
    return next(err)
  }
})

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id)
    const deleted = await employee.delete()
    return res.json(deleted)
  } catch (err) {
    return next(err)
  }
})
app.delete("/api/equipment/:id", async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findById(req.params.id)
    const deleted = await equipment.delete()
    return res.json(deleted)
  } catch (err) {
    return next(err)
  }
})

app.get("/employees/superheros", async (req, res) => {
  try {
    const superheros = await EmployeeModel.find({ position: "Superhero" })
    return res.json(superheros)
  } catch (err) {
    return err
  }
})

app.get("/api/equipment", async (req, res) => {
  try {
    const equipment = await EquipmentModel.find()
    return res.json(equipment)
  } catch (err) {
    return err
  }
})

const main = async () => {
  await mongoose.connect(MONGO_URL)

  app.listen(PORT, () => {
    console.log("App is listening on 8080")
    console.log("Try /api/employees route right now")
  })
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
