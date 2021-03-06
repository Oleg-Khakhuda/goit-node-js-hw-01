const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')

const readContent = async () => {
    const content = await fs.readFile(
        path.join(__dirname, 'db', 'contacts.json'),
        'utf8',
    )
    const result = JSON.parse(content)
    return result
}

const listContacts = async () => {
  return await readContent()
}

const getContactById = async (contactId) => {
    const contacts = await readContent()
    const contact = contacts.find((contact) => contact.id === contactId)
    return contact
}

const removeContact = async (contactId) => {
  const contacts = await readContent()
  const deleteContact = contacts.findIndex(contact => contact.id === contactId)
  if (deleteContact !== -1) {
    const removed = contacts.splice(deleteContact, 1)
    await fs.writeFile(
        path.join(__dirname, 'db', 'contacts.json'),
        JSON.stringify(contacts, null, 2)
    )
  return removed
  } else {
      return 'Index not found';
    }
}

const addContact = async (name, email, phone) => {
    const contact = await readContent()
  const newContact = { name, email, phone, id: crypto.randomUUID() }
  if (Object.values(newContact).every((newContact) => newContact)) {
    contact.push(newContact)
    await fs.writeFile(
        path.join(__dirname, 'db', 'contacts.json'),
        JSON.stringify(contact, null, 2),
    )
    return newContact
  } else {
    return 'Empty fields';
  }
    
}

module.exports = {listContacts, getContactById, removeContact, addContact}