import { getLatestVersion, getPathList, getPkgInfo } from "./utils/index";
import { program } from "commander";
import logger from "./helpers/logger";
import * as chalk from "chalk";
const figlet = require("figlet");

const printLastVersion = async (version: string, name: string) => {
  const latestVersion = await getLatestVersion(name);
  if (latestVersion !== version) {
    logger.info(
      `当前包有最新版本，可更新版本，${chalk.green(version)} -> ${chalk.green(
        latestVersion
      )} \n执行npm install -g ${name}`
    );
  }
};

const start = async () => {
  // 获取所有命令
  const commandsPath = await getPathList("./commands/*.*s");

  // 注册命令
  commandsPath.forEach((commandPath) => {
    const commandObj = require(`./${commandPath}`);
    const { command, description, optionList, action } = commandObj.default;
    const curp = program
      .command(command)
      .description(description)
      .action(action);

    optionList &&
      optionList.map((option: [string]) => {
        curp.option(...option);
      });
  });

  const packageInfo = getPkgInfo();
  const { version, name } = packageInfo;

  // 配置版号，执行zy --version显示版本
  program.version(version);

  // 监听 --help 指令,加上额外的提示
  program.on("--help", async function () {
    // 美化logo
    console.log(
      "\r\n" +
        figlet.textSync("xzy-cli", {
          font: "3D-ASCII",
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 80,
          whitespaceBreak: true,
        })
    );
    // 前后两个空行调整格式，更舒适
    console.log();
    console.log(
      `Run ${chalk.cyan(
        "xzy <command> --help"
      )} for detailed usage of given command.`
    );
    console.log();
  });

  program.on("command:*", async ([cmd]) => {
    program.outputHelp();
    logger.error(`未知命令 command ${chalk.yellow(cmd)}.`);
    await printLastVersion(version, name)
    process.exitCode = 1;
  });

  // 调用参数解析去匹配命令
  program.parseAsync(process.argv);
};

start();
