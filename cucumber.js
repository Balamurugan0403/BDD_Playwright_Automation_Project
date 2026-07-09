module.exports = {
    default: {
        requireModule: ["ts-node/register"],

        require: [
            "src/test/steps/**/*.ts",
            "src/test/hooks/**/*.ts"
        ],

        // paths: [
        //     "src/test/features/**/*.feature"
        // ],

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
            "progress",
            "rerun:rerun/@rerun.txt",
            "json:reports/cucumber-report.json",
            "message:reports/messages.ndjson",
            "html:reports/cucumber-report.html",
            "allure-cucumberjs/reporter"
        ],
        parallel: 2
>>>>>>> 323b9dd (CourseCategory feature Created)
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
    ],
=======
            "progress",
            "rerun:rerun/@rerun.txt",
            "json:reports/cucumber-report.json",
            "message:reports/messages.ndjson",
            "html:reports/cucumber-report.html",
            "allure-cucumberjs/reporter"
        ],
>>>>>>> 323b9dd (CourseCategory feature Created)
        parallel: 1
    }
};
