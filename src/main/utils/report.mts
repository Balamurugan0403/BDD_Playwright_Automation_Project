import { generate } from "multiple-cucumber-html-reporter";
import path from "path";

const jsonDir = path.resolve(process.cwd(), "reports", "cucumber");
const reportPath = path.resolve(process.cwd(), "reports", "detailed-html");

generate({
    jsonDir: jsonDir,
    reportPath: reportPath,
    reportName: "Playwright BDD Report",
    pageTitle: "LMS test Report",
    displayDuration: false,
    metadata: {
        browser: {
            name: "chrome",
            version: "118",
        },
        device: "Machine",
        platform: {
            name: "Windows",
            version: "11",
        },
    },
});
