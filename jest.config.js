const defaultConfig = require("jest-config");

module.exports = {
    rootDir: "src",
    moduleNameMapper: {
        "app/(.*)": ["<rootDir>/$1"],
    },
    transform: {
        "^.+\\.[t|j]sx?$": ["babel-jest", { rootMode: "upward" }],
    },
};
