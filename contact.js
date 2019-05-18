#! /usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const {addContact, getContact} = require('./logic');

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

program.parse(process.argv); 