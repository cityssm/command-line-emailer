# command-line-emailer
A command line email tool, to help extend the life of some legacy ASP web applications.

## Usage

``` bash
node sendMail [config] [template] [toEmail] [templateParameters]
```

**All command parameters are required!**

`[config]`
- The name of the config file in the config folder.
- No `.js` extension necessary.

`[template]`
- The name of the template configuration file in the template folder.
- No `.js` extension necessary.

`[toEmail]`
- The email address that should be in the to field of the email.

`[templateParameters]`
- Any parameters that should be filled in.

## Example

```bash
node sendMail config passwordRecovery user@example.com userName=user password=newP@ssword
```
