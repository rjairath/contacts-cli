
const program = require('commander');
const {addContact, getContact} = require('./logic');

program
	.version("0.0.1")
	.description("contact manager");

program
	.command("addContact <firstName> <lastName> <phone> <email>")
	.alias("a")
	.description("add a contact")
	.action((firstName, lastName, phone, email)=>{
		addContact({firstName, lastName, phone, email});
	});

program
	.command("getContact <name>")
	.alias("g")
	.description("get contact details")
	.action((name)=>{
		getContact(name);
	});

program.parse(process.argv); 