module.exports = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        ["@babel/preset-typescript", { isTsx: true }],
        "@babel/preset-react",
    ],
};
