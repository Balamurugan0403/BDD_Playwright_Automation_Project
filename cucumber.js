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
<<<<<<< HEAD
        "progress",
        "allure-cucumberjs/reporter",
        "json:reports/cucumber-report.json",
        "html:reports/cucumber-report.html",
        "rerun:rerun/@rerun.txt"
    ],
        parallel: 1
=======
            "rerun:rerun/@rerun.txt",
            "json:reports/cucumber-report.json",
            "message:reports/messages.ndjson",
            "html:reports/cucumber-report.html",
            "allure-cucumberjs/reporter",
            "progress"
        ],
        parallel: 2
>>>>>>> 2b378df (added a add course feature)
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
            "allure-cucumberjs/reporter",
            "progress"
>>>>>>> 2b378df (added a add course feature)
        ],
        parallel: 1
    }
};
