const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const manager = [
    {
        type: "input",
        name: "name",
        message: "Manager's name:"
    },
    {
        type: "input",
        name: "ID",
        message: "Manager's ID:"
    },
    {
        type: "input",
        name: "email",
        message: "Manager's Email address:"
    },
    {
        type: "input",
        name: "office",
        message: "Manager's Office number:"
    },
];

const engineer = [
    {
        type: "input",
        name: "name",
        message: "Engineer's name:"
    },
    {
        type: "input",
        name: "ID",
        message: "Engineer's ID:"
    },
    {
        type: "input",
        name: "email",
        message: "Engineer's Email address:"
    },
    {
        type: "input",
        name: "office",
        message: "Engineer's GitHub username:"
    },
];

const intern = [
    {
        type: "input",
        name: "name",
        message: "Intern's name:"
    },
    {
        type: "input",
        name: "ID",
        message: "Intern's ID:"
    },
    {
        type: "input",
        name: "email",
        message: "Intern's Email address:"
    },
    {
        type: "input",
        name: "school",
        message: "Intern's school:"
    },
];

const chooseNext = [
    {
        type: "list",
        name: "newEmployee",
        message: "Select next employee:",
        choices: [
            "Engineer",
            "Intern",
            "None"
        ]
    },
];

function init() {
    inquirer
        .prompt(questions)
        .then(answers => {
            console.log(answers);
            axios.get("https://api.github.com/users/"+answers.name)
                .then(response => {
                    var imageUrl = response.data.avatar_url;
                    answers.image = imageUrl;
                    fs.writeFile("ReadMe.md", generateMarkdown(answers), function (err) {
                        if (err) {
                            throw err;
                        };
                        console.log("New ReadMe has been generated.")

                    })
                })
        })
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
