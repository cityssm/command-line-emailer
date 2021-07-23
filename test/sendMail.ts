import * as assert from "assert";

import * as sampleConfig from "../config/sample-config";
import { fork } from "child_process";


describe("sendMail", () => {

  const cmd = "node sendMail [config] [template] [toEmail] [templateParameters]";

  it("No parameters, output usage instructions", (done) => {

    const sendMail = fork("sendMail", [], {
      silent: true
    });

    sendMail.stdout.on("data", (data: string) => {
      assert.ok(data.includes(cmd));
      done();
    });
  });

  it("Invalid config file, output error", (done) => {

    const invalidConfigFileName = "abcdefg";

    const sendMail = fork("sendMail", [
      invalidConfigFileName,
      "sample-template",
      sampleConfig.smtp.userName,
      "userName=testUser"
    ], {
        silent: true
      });

    sendMail.stderr.on("data", (data: string) => {
      assert.ok(data.includes(invalidConfigFileName + ".js not found"));
      done();
    });

  });

  it("Invalid template file, output error", (done) => {

    const invalidTemplateFileName = "abcdefg";

    const sendMail = fork("sendMail", [
      "sample-config",
      invalidTemplateFileName,
      sampleConfig.smtp.userName,
      "userName=testUser"
    ], {
        silent: true
      });

    sendMail.stderr.on("data", (data: string) => {
      assert.ok(data.includes(invalidTemplateFileName + ".js not found"));
      done();
    });

  });

  it("Invalid parameter syntax, output error", (done) => {

    const invalidParameter = "abcdefg";

    const sendMail = fork("sendMail", [
      "sample-config",
      "sample-template",
      sampleConfig.smtp.userName,
      invalidParameter
    ], {
        silent: true
      });

    sendMail.stderr.on("data", (data: string) => {
      assert.ok(data.includes("Invalid parameter " + invalidParameter));
      done();
    });
  });

  it("Missing required parameter, output error", (done) => {

    const sendMail = fork("sendMail", [
      "sample-config",
      "sample-template",
      sampleConfig.smtp.userName,
      "param=value"
    ], {
        silent: true
      });

    sendMail.stderr.on("data", (data: string) => {
      assert.ok(data.includes("Missing required template parameter"));
      done();
    });
  });

  it("All valid parameters, exit code = 0", (done) => {

    const sendMail = fork("sendMail", [
      "sample-config",
      "sample-template",
      sampleConfig.smtp.userName,
      "userName=testUser"
    ], {
        silent: true
      });

    sendMail.on("close", (code) => {
      assert.strictEqual(code, 0);
      done();
    });
  });
});
