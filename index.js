const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Setting up the output directory and file path
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Importing the render function which generates the HTML page
const render = require("./src/page-template.js");


// const writeFileAsync = util.promisify(fs.writeFile);


// Array to store team members
const teamMembers = [];

// Function to prompt user for manager details
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
      // Creating a new Manager object and pushing it to teamMembers array
      const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
      teamMembers.push(manager);
      // Prompting user for next action
      promptMenu();
    });
}

// Function to prompt user for engineer details
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
      // Creating a new Engineer object and pushing it to teamMembers array
      const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
      teamMembers.push(engineer)
      // Prompting user for next action
      promptMenu();
    })
}

// Function to prompt user for intern details
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
      // Creating a new Intern object and pushing it to teamMembers array
      const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
      teamMembers.push(intern);
      // Prompting user for next action
      promptMenu();
    })
}

// Function to prompt user for next action
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
      // Redirecting based on user choice
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

// Function to generate HTML file using team members data and render function
function generateHTML() {
  fs.writeFile(outputPath, render(teamMembers), (err) => {
    if (err) throw err;
    console.log('Successfully wrote to team.html');
  });
}

// Starting the application by prompting for manager details
managerPrompt();