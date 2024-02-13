const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

// const writeFileAsync = util.promisify(fs.writeFile);


const teamMembers = [];


function managerPrompt() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Manager's name",
      },
      {
        type: 'input',
        name: 'id',
        message: "Manager's employee ID",
      },
      {
        type: 'input',
        name: 'email',
        message: "Manager's email address",
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: "Manager's office number",
      },
    ])
    .then((answers) => {
      const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
      teamMembers.push(manager);
      promptMenu();
    });
}

function engineerPrompt() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Engineer's name",
      },
      {
        type: 'input',
        name: 'id',
        message: "Engineer's ID",
      },
      {
        type: 'input',
        name: 'email',
        message: "Engineer's email address",
      },
      {
        type: 'input',
        name: 'github',
        message: "Engineer's GitHub username",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
      teamMembers.push(engineer)
      promptMenu();
    })
}

function internPrompt() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Intern's name",
      },
      {
        type: 'input',
        name: 'id',
        message: "Intern's ID",
      },
      {
        type: 'input',
        name: 'email',
        message: "Intern's email address",
      },
      {
        type: 'input',
        name: 'school',
        message: "Intern's school",
      },
    ])
    .then((answers) => {
      const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
      teamMembers.push(intern);
      promptMenu();
    })
}

function promptMenu() {
  inquirer
    .prompt(
      {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do next?',
        choices: [
          'Add an engineer',
          'Add an intern',
          'Finish building the team',
        ]
      })
    .then((answers) => {
      switch (answers.menu) {
        case 'Add an engineer':
          engineerPrompt();
          break;
        case 'Add an intern':
          internPrompt();
          break;
        case 'Finish building the team':
          generateHTML();
          break;
      }
    });
}


function generateHTML() {
  fs.writeFile(outputPath, render(teamMembers), (err) => {
    if (err) throw err;
    console.log('Successfully wrote to team.html');
  });
}

managerPrompt();