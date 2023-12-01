/* eslint-disable no-unused-vars */
const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
// const readme = require("./README.md");
const fs = require("fs")
const marked = require("marked")
require("dotenv").config()

const Person = require("./models/person")

app.use(cors())
app.use(express.json())
morgan.token("content", function (req, res) {
  return JSON.stringify(req.body)
})
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
)
app.use(express.static("dist"))

app.get("/api", (req, res) => {
  res.send("<h3>Phonebook backend</h3><a href='readme'>Readme</a>")
})

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get("/api/readme", (req, res) => {
  fs.readFile("./README.md", "utf8", (err, data) => {
    console.log(data)
    res.send(marked.parse(data))
  })
})

app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `<p>Phonebook has info for ${
        persons.length
      } people</p><p>${new Date().toString()}</p>`
    )
  })
})


app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person)
    })
    .catch((err) => next(err))
})


app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(res.status(204).end())
    .catch((err) => {
      next(err)
    })
})

app.post("/api/persons/", (req, res, next) => {
  const body = req.body
  console.log(body)
  if (body === undefined) {
    return res.status(400).json({ error: "content missing" })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((err) => next(err))
})

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" })
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message })
  } else {
    next(err)
  }
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
