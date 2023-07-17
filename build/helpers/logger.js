"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk = require("chalk");
// 日志打印类，可以加入日志级别
class Logger {
    warn(text) {
        console.log(chalk.yellow(`\n${text}\n`));
    }
    info(text) {
        console.log(chalk.cyan(`\n${text}\n`));
    }
    error(text) {
        console.log(chalk.red(`\n${text}\n`));
    }
}
exports.Logger = Logger;
const logger = new Logger();
exports.default = logger;
