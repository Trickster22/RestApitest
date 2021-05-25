const { request, response } = require('express')
const express = require('express')
const path = require('path')
const {v4} = require('uuid')

const app = express()

let CONTACTS = [
    {id:v4(),name: "Миша", marked: false}
]

app.use(express.json())

// GET
app.get('/api/contacts', (request, response) => {
    
        response.status(200).json(CONTACTS)
      
    
 
})

app.post('/api/contacts', (request,response) => {
    const contact = {...request.body, id: v4()}
    CONTACTS.push(contact)
    response.status(201).json(contact)
})


app.delete('/api/contacts/:id', (req,res) =>{
    CONTACTS = CONTACTS.filter(c=>c.id!==req.params.id)
    res.status(200).json({message: 'Контакт был удален'})
})

app.put('/api/contacts/:id', (req, res) => {
    const idx = CONTACTS.findIndex(c => c.id === req.params.id)
    CONTACTS[idx] = req.body
    res.json(CONTACTS[idx])
  })


app.use(express.static(path.resolve(__dirname,'client')))

app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname,'client', 'index.html'))
})

app.listen(3003, () => console.log('Server has started...'))