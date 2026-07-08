module.exports = {
    default: {
        requireModule: [
            "ts-node/register"
        ],

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
            "rerun:rerun/@rerun.txt",
            "json:reports/cucumber-report.json",
            "message:reports/messages.ndjson",
            "html:reports/cucumber-report.html",
            "progress",
            "allure-cucumberjs/reporter",
        ],

        parallel: 1
    },

    rerun: {
        requireModule: [
            "ts-node/register"
        ],

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
            "rerun:rerun/@rerun.txt",
            "json:reports/cucumber-report.json",
            "message:reports/messages.ndjson",
            "html:reports/cucumber-report.html",
            "progress",
            "allure-cucumberjs/reporter",
        ],

        parallel: 1
    }
};