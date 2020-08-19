"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
exports.template = {
    from: "sender@example.com",
    subject: () => "Sample Email Message",
    body: (templateParameters) => {
        return `<p><strong>This message is being sent to ${templateParameters.userName}.</strong></p>`;
    },
    bodyIsHTML: true,
    requiredParameters: ["userName"]
};
module.exports = exports.template;
