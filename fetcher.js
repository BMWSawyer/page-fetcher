const fs = require('fs');
const request = require('request');
const readline = require('readline');

const input = process.argv.slice(2);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const fileWriting = (body) => {
  fs.writeFile(`${input[1]}`, body, (err3) => {
    if (err3) {
      console.log(err3);
    } else {
      console.log(`Downloaded and saved ${fs.statSync(input[1]).size} bytes to ${input[1]}`);
    }
    process.exit();
  });
}

request(`http://${input[0]}`, (error, response, body) => {
  fs.access(input[1], (err2) => {
    if (err2) {
      if (error || response.statusCode !== 200) {
        console.log(`The app terminated because of this: ${error}`);
        process.exit();
      } else {
        fileWriting(body);
      }
    } else {
      rl.question(`Inputted file path already exists. Do you want to overwrite it? Y/N`, (answer) => {
        if (answer === 'Y') {
          fileWriting(body);
        } else {
          console.log('You have decided not to overwrite the file. The app is closing now!');
          process.exit();
        }
      });
    }
  });
});