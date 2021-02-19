"use strict";
require("dotenv").config();
var author;
const Discord = require("discord.js");
const fetch = require("node-fetch");
const client = new Discord.Client();
client.on("ready", () => {
  console.log("I am ready!");
});
client.on("message", (message) => {
  var entireMessage = message.content;
  var content = entireMessage.split(" ", 2);
  console.log(content);
  if (content[0] === "!code") {
    author = message.author;
    var language = content[1];
    var codeIndex = entireMessage.indexOf("```");
    var code = entireMessage.substring(codeIndex + 3, entireMessage.length - 3);
    console.log(code);
    if (!language || language.includes("`")) {
      message.channel.send(`${author}, you have not provided any language`);
    } else if (codeIndex === -1 || !code) {
      message.channel.send(`${author}, you have not provided any code`);
    }
    if (language == "c++") {
      fetch(process.env.FETCH, {
        method: "POST",
        body: JSON.stringify({
          langid: 1,
          code: code,
          input: "",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          console.log(resp);
          var output;
          if (resp.stdout) {
            output = resp.stdout;
          } else {
            output = resp.stderr;
          }
          message.channel.send(
            `${author}, I have received the following output \`\`\`${output}\`\`\``
          );
        })
        .catch((err) => console.log(err));
    } else if (language === "python") {
      fetch(process.env.FETCH, {
        method: "POST",
        body: JSON.stringify({
          langid: 2,
          code: code,
          input: "",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          console.log(resp);
          var output;
          if (resp.stdout) {
            output = resp.stdout;
          } else {
            output = resp.stderr;
          }
          message.channel.send(
            `${author}, I have received the following output \`\`\`${output}\`\`\``
          );
        })
        .catch((err) => console.log(err));
    } else if (language == "java") {
      fetch(process.env.FETCH, {
        method: "POST",
        body: JSON.stringify({
          langid: 3,
          code: code,
          input: "",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          console.log(resp);
          var output;
          if (resp.stdout) {
            output = resp.stdout;
          } else {
            output = resp.stderr;
          }
          message.channel.send(
            `${author}, I have received the following output \`\`\`${output}\`\`\``
          );
        })
        .catch((err) => console.log(err));
    }
  }
});
client.login(process.env.SECRET_KEY);
