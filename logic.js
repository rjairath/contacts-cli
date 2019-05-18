
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

module.exports = {addContact, getContact};	 
