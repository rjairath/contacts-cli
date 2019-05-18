
const mongoose = require('mongoose');
const assert = require('assert');

const db = mongoose.connect('mongodb://127.0.0.1:27017/contact-manager');

const contactSchema = new mongoose.Schema({
	firstName: {type: String, lowercase: true},
	lastName: {type: String, lowercase: true},
	phone: {type: String, lowercase: true},
	email: {type: String, lowercase: true}
});

const Contact = mongoose.model('Contact', contactSchema);

const addContact = (contact)=>{
	Contact.create(contact, (err)=>{
		assert.equal(null, err);
	    console.info('New contact added');
	    mongoose.connection.close();
	});
};

const getContact = (name)=>{
	let search = new RegExp(name, 'i');
	Contact.find({$or: [{firstName: search}, {lastName: search}]})
	.exec((err, contact)=>{
		assert.equal(null, err);
		console.log(contact);
		console.log(`${contact.length} matches`);
		mongoose.connection.close();
	})	
	// db.disconnect();
};

const updateContact = (_id, contact)=>{
	Contact.update({_id}, contact)
	.exec((err, status) => {
	    assert.equal(null, err);
	    console.info('Updated successfully');
	    mongoose.connection.close();
	});
};

const deleteContact = (_id)=>{
	Contact.remove({_id})
	.exec((err, status)=>{
		assert.equal(null, err);
		console.info("Deleted successfully");
		mongoose.connection.close();
	})
};

const getContactList = () => {
  Contact.find()
  .exec((err, contacts) => {
    assert.equal(null, err);
    console.log(contacts);
    console.log(`${contacts.length} total`);
    mongoose.connection.close();
  })
};

module.exports = {addContact, getContact, updateContact, deleteContact, getContactList};	 
