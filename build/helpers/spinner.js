"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spinner = void 0;
const ora = require("ora");
const chalk = require("chalk");
class Spinner {
    constructor() {
        // 开始加载
        this.start = (text) => {
            const msg = `${text}...\n`;
            this.spinner.start(msg);
            this.spinner.stopAndPersist({
                symbol: "✨",
                text: msg,
            });
        };
        // 加载成功
        this.succeed = (text) => {
            this.spinner.stopAndPersist({
                symbol: "🎉",
                text: `${text}\n`,
            });
        };
        // 加载失败
        this.fail = (text) => {
            this.spinner.fail(chalk.red(text));
        };
        this.spinner = ora();
    }
}
exports.Spinner = Spinner;
const spinner = new Spinner();
exports.default = spinner;
