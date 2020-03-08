const inquirer = require("inquirer"); //<--questions
const fs = require("fs"); //<--Create file
const util = require("util"); //<-- promisify
const axios = require("axios"); //<--GitHub API


// const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
   return inquirer.prompt([
      {
        type: "input",
        name: "username",
        message: "What is your GitHub unsername?"
      },
      {
        type: "input",
        name: "project",
        message: "Where is your project's name?"
      },
      {
        type: "input",
        name: "description",
        message: "Please write a short description of your project"
      },
      {
        type: "list",
        name: "license",
        message: "What kind of license should your project have?",
        choices: [
            "MIT", 
            "APACHE 2.0", 
            "GPL 3.0", 
            "BSD 3",
            "None"
          ]
      },
      {
        type: "input",
        name: "tests",
        message: "What command should be run to run tests?"
      },
      {
        type: "input",
        name: "usage",
        message: "What does the user need to know about using the repo?"
      },
      {
        type: "input",
        name: "contributing",
        message: "What does the user need to know about contributing to the repo?"
      }
    ])
    .then(function(result) {
      // console.log(`Initial res: ${result.description}`);
        // const { username, project } = result
        const queryUrl = `https://api.github.com/repos/${result.username}/${result.project}`;
        // console.log(`URL: ${queryUrl}`);
    
        axios.get(queryUrl).then(function(res) {
          // const avatar = res.data.owner.avatar_url;
          // const projectLink = res.data.html_url;

          // console.log(res.data.owner.avatar_url);
          // console.log(res.data.html_url);
          // console.log(result.usage)

          //below
          
          
          
          //above
          // console.log('Res: ', res);
          // console.log('Res: ', JSON.stringify(res));
          const readme = generateREADME(result, res);

      
          return fs.writeFile("README.md", readme, () => console.log('Completed writing file'));
        })
        .catch(function(err) {
          console.log(err);
        })
        .finally(() => console.log('Operation complete'))
      })
      
    }



    function generateREADME(result, res) {
      return `
    # Project Name
    
    ${result.project}
    
    [![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)


    ## Description
     ${result.description}
    
    ## Table of Contents
    [Installation](#installation)
    [Usage](#usage)
    [License](#license)
    [Contributing](#contributing)
    [Tests](#tests)
    [Questions](#questions)
    
    ## Installation
    
    To install necessary dependencies, run the following command:
    
    ${result.tests}
    
    ## Usage
    
    ${result.usage}
    
    ## License
    
    This project is licensed under the ${result.license} license
    
    ##Contributing
    
    ${result.contributing}
    
    ##Tests
    
    To run tests, run the following command: 
    
    ${result.test}
    
    ##Questions
    
    Please reach out if you have any questions regarding this project.
    
    <img src="${res.data.owner.avatar_url}" />
    
    My email: 
    
    `;
    }
      
      
      promptUser()
      
      
  // .then(function(result, res) {
  //   const readme = generateREADME(result, res);
  //   return writeFileAsync("README.md", readme);
  // })
  // .then(function() {
  //   console.log("Successfully wrote to README.md");
  // })
  // .catch(function(err) {
  //   console.log(err);
  // });