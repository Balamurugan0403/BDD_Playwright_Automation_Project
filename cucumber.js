module.exports = {
    default: {
        requireModule: ["ts-node/register"],

        require: [
            "src/test/steps/**/*.ts",
            "src/test/hooks/**/*.ts"
        ],

        paths: [
            "src/test/features/**/*.feature"
        ],

        formatOptions: {
            snippetInterface: "async-await"
        },

        publishQuiet: true,
        dryRun: false,
        format: [
            "progress",
            "rerun:rerun/@rerun.txt",
            "json:reports/cucumber-report.json",
            "message:reports/messages.ndjson",
            "html:reports/cucumber-report.html",
            "allure-cucumberjs/reporter"
        ],
        parallel: 2
    },
    rerun:{
        requireModule: ["ts-node/register"],

        require: [
            "src/test/steps/**/*.ts",
            "src/test/hooks/**/*.ts"
        ],

        formatOptions: {
            snippetInterface: "async-await"
        },

        publishQuiet: true,
        dryRun: false,
        format: [
            "progress-bar",
            "rerun:rerun/@rerun.txt",
            "json:reports/cucumber-report.json",
<<<<<<< HEAD
            "message:reports/messages.ndjson"
=======
            "message:reports/messages.ndjson",
            "html:reports/cucumber-report.html",
            "allure-cucumberjs/reporter"
>>>>>>> 10dd3521b7612c4ef72140b572b1a0c105606598
        ],
        parallel: 1
    }
};