/* eslint-disable no-unused-vars */
const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url = `mongodb+srv://admin:${password}@cluster0.mcpqygt.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const personSchema = new mongoose.Schema(
  {
    name: String,
    number: String,
  },
  { collection: "persons" }
)
const Person = mongoose.model("Person", personSchema)

if (password && newNumber && newName) {
  const person = new Person({
    name: newName,
    number: newNumber,
  })

  person.save().then(result => {
    console.log(`added ${newName} number ${newNumber} to phonebook`)
    mongoose.connection.close()
  })
} else if (password) {
  console.log("Phonebook:")
  Person.find({}).then((result) => {
    result.forEach((person) => {

      const { name, number } = person
      console.log(`${name} ${number}`)

    })
    mongoose.connection.close()
  })
}
