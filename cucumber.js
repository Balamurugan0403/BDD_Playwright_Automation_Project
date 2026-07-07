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
        format: [
            "progress",
            "rerun:rerun/@rerun.txt",
            "json:reports/cucumber-report.json",
            "message:reports/messages.ndjson",
            "allure-cucumberjs/reporter"
        ]
    }
};