"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process = require("process");
const nodemailer = require("nodemailer");
const cmd = "node sendMail [config] [template] [toEmail] [templateParameters]";
const args = process.argv;
if (args.length < 5) {
    console.error("Error: Incorrect format");
    console.log(cmd);
    process.exit(1);
}
const configFilePath = "./config/" + args[2] + ".js";
let config;
try {
    config = require(configFilePath);
}
catch (e) {
    console.error("Error: Config " + configFilePath + " not found.");
    console.log(cmd);
    process.exit(1);
}
const templateFilePath = "./templates/" + args[3] + ".js";
let template;
try {
    template = require(templateFilePath);
}
catch (e) {
    console.error("Error: Template " + templateFilePath + " not found.");
    console.log(cmd);
    process.exit(1);
}
const toEmailAddress = args[4];
const templateParameters = {};
for (let index = 5; index < args.length; index += 1) {
    const fullParameter = args[index];
    if (!args[index].includes("=")) {
        console.error("Error: Invalid parameter " + fullParameter);
        console.log(cmd);
        process.exit(1);
    }
    templateParameters[fullParameter.substring(0, fullParameter.indexOf("="))] =
        fullParameter.substring(fullParameter.indexOf("=") + 1);
}
for (const requiredParameter of template.requiredParameters || []) {
    if (!templateParameters[requiredParameter]) {
        console.error("Error: Missing required template parameter " + requiredParameter);
        console.log(cmd);
        process.exit(1);
    }
}
const emailSubject = template.subject(templateParameters);
const emailBody = template.body(templateParameters);
const transporter = nodemailer.createTransport({
    host: config.smtp.server,
    port: config.smtp.port,
    auth: {
        user: config.smtp.userName,
        pass: config.smtp.password
    }
});
const messageConfig = {
    from: template.from,
    to: toEmailAddress,
    subject: emailSubject
};
if (template.bodyIsHTML) {
    messageConfig.html = emailBody;
}
else {
    messageConfig.text = emailBody;
}
transporter.sendMail(messageConfig, function (err, info) {
    if (err) {
        console.error("Error sending message.");
        console.error(err.message);
        process.exit(1);
    }
    console.log(info);
    process.exit(0);
});
