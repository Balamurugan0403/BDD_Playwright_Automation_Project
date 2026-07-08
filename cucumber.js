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
        "progress",
        "allure-cucumberjs/reporter",
        "json:reports/cucumber-report.json",
        "html:reports/cucumber-report.html",
        "rerun:rerun/@rerun.txt"
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
<<<<<<< HEAD
            "progress",
        "allure-cucumberjs/reporter",
        "json:reports/cucumber-report.json",
        "html:reports/cucumber-report.html",
        "rerun:rerun/@rerun.txt"
=======
            "rerun:rerun/@rerun.txt",
            "json:reports/cucumber-report.json",
            "message:reports/messages.ndjson",
            "html:reports/cucumber-report.html",
            "progress",
            "allure-cucumberjs/reporter",
>>>>>>> 7319276 (Changed the order of reports)
        ],

        parallel: 1
    }
};
