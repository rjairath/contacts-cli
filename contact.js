#! /usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const {addContact, getContact, updateContact, deleteContact, getContactList} = require('./logic');

const questions = ([
	{
		type: "input",
		message: "firstName...",
		name: "firstName"	
	},
	{
		type: "input",
		message: "lastName...",
		name: "lastName"
	},
	{
		type: "input",
		message: "phone...",
		name: "phone"
	},
	{
		type: "input",
		message: "email...",
		name: "email"
	}
]);

program
	.version("0.0.1")
	.description("contact manager");

program
	.command("addContact")//Remove the arguments here
	.alias("a")
	.description("add a contact")
	.action(()=>{
		inquirer.prompt(questions)
		.then((response)=>{
			addContact(response);
		})
	});

program
	.command("getContact <name>")
	.alias("g")
	.description("get contact details")
	.action((name)=>{
		getContact(name);
	});

program
	.command("updateContact <_id>")
	.alias("u")
	.description("update contact details")
	.action((_id)=>{
		inquirer.prompt(questions)
		.then((response)=>{
			updateContact(_id, response);
		})
	});

program
	.command("deleteContact <_id>")
	.alias("d")
	.description("delete selected contact details")
	.action((_id)=>{
		deleteContact(_id);
	});

program
	.command("getContactList")
	.alias("l")
	.description("get all contacts")
	.action(()=>{
		getContactList();
	});

program.parse(process.argv); 