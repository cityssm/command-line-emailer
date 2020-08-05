import * as process from "process";

import type { ConfigFile, EmailTemplate } from "./types";

import * as nodemailer from "nodemailer";

const cmd = "node sendMail [config] [template] [toEmail] [templateParameters]";

/*
 * Check the arguments
 */

const args = process.argv;

if (args.length < 5) {
  console.error("Error: Incorrect format");
  console.log(cmd);
  process.exit(1);
}

/*
 * Load the config file
 */

const configFilePath = "./config/" + args[2] + ".js";

let config: ConfigFile;

try {
  config = require(configFilePath);
}
catch (e) {
  console.error("Error: Config " + configFilePath + " not found.");
  console.log(cmd);
  process.exit(1);
}

/*
 * Load the template
 */

const templateFilePath = "./templates/" + args[3] + ".js";

let template: EmailTemplate;

try {
  template = require(templateFilePath);
}
catch (e) {
  console.error("Error: Template " + templateFilePath + " not found.");
  console.log(cmd);
  process.exit(1);
}

/*
 * Get the email address
 */

const toEmailAddress = args[4];

/*
 * Load the command line parameters for use by the template.
 */

const templateParameters: { [parameterName: string]: string } = {};

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

/*
 * Ensure the required parameters are available.
 */

for (const requiredParameter of template.requiredParameters || []) {

  if (!templateParameters[requiredParameter]) {
    console.error("Error: Missing required template parameter " + requiredParameter);
    console.log(cmd);
    process.exit(1);
  }
}

/*
 * Build the email subject and body.
 */

const emailSubject = template.subject(templateParameters);
const emailBody = template.body(templateParameters);

/*
 * Create SMTP transporter object.
 */

const transporter = nodemailer.createTransport({
  host: config.smtp.server,
  port: config.smtp.port,
  auth: {
    user: config.smtp.userName,
    pass: config.smtp.password
  }
});

const messageConfig: nodemailer.SendMailOptions = {
  from: template.from,
  to: toEmailAddress,
  subject: emailSubject
};

if (template.bodyIsHTML) {
  messageConfig.html = emailBody;
} else {
  messageConfig.text = emailBody;
}

transporter.sendMail(messageConfig, function(err, info) {

  if (err) {
    console.error("Error sending message.");
    console.error(err.message);
    process.exit(1);
  }

  console.log(info);
  process.exit(0);
});
