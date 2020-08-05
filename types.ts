export interface ConfigFile {
  smtp: {
    server: string;
    port: number;
    userName: string;
    password: string;
  }
}

export interface EmailTemplate {
  from: string;
  subject: (templateParameters: { [parameterName: string]: string }) => string;
  body: (templateParameters: { [parameterName: string]: string }) => string;
  bodyIsHTML: boolean;
  requiredParameters?: string[];
}
