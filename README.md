# Command Line Emailer

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c689a67783fc4dcebe0847f049809a6f)](https://app.codacy.com/gh/cityssm/command-line-emailer?utm_source=github.com&utm_medium=referral&utm_content=cityssm/command-line-emailer&utm_campaign=Badge_Grade_Dashboard)

The `CDO.Message` object has documented issues communicating with SMTP servers
when `STARTTLS` is required.  This can make it difficult to send email messages
through modern email servers from classic ASP web applications.

Command Line Emailer is a simple yet flexible tool that was built
to help extend the life of some classic ASP web applications,
although it can be used for other purposes, like as part of command line scripts.

It is best used for one-off email messages, like account activations
and password recoveries.

**Node.js is required.**
**Don't forget to run `npm install` to grab the dependencies.**

## Usage

```bash
node sendMail [config] [template] [toEmail] [templateParameters]
```

**The first three command parameters are required!**

`[config]` \*Required

-   The name of the config file in the config folder.
-   No `.js` extension necessary.
-   See [sample-config.ts](config/sample-config.ts) for help getting started.

`[template]` \*Required

-   The name of the template configuration file in the template folder.
-   No `.js` extension necessary.
-   See [sample-template.ts](templates/sample-template.ts) for help getting started.

`[toEmail]` \*Required

-   The email address that will be receiving the email message.

`[templateParameters]` \*Optional

-   Any parameters that should be filled in.
-   Include the parameter name and parameter value, separated by an equals sign.
-   Use double quotes around parameters that have spaces.

## Example

```bash
node sendMail config passwordRecovery user@example.com "userName=User Name" password=newP@ssword
```

## Classic ASP Example

```ASP
Set objShell = CreateObject("WScript.Shell")

objShell.run("node c:/pathTo/commandLineEmailer/sendMail config passwordRecovery user@example.com userName=user password=newP@ssword")
```
