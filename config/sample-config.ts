import type { ConfigFile } from "../types";

const config: ConfigFile = {
  smtp: {
    server: "smtp.example.com",
    port: 587,
    userName: "userName",
    password: "p@ssword"
  }
};

module.exports = config;
