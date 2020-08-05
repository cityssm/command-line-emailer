import type { EmailTemplate } from "../types";

export const template: EmailTemplate = {
  from: "sender@example.com",
  subject: () => "Sample Email Message",
  body: (templateParameters) => {
    return `<p><strong>This message is being sent to ${templateParameters.userName}.</strong></p>`;
  },
  bodyIsHTML: true,
  requiredParameters: ["userName"]
};
