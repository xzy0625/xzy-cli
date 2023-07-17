"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneProject = exports.checkProjectExist = exports.formatInfo = exports.getQuestions = void 0;
const path = require("path");
const handlebars = require("handlebars");
const inquirer = require("inquirer");
const logger_1 = require("../helpers/logger");
const spinner_1 = require("../helpers/spinner");
const chalk = require("chalk");
const fs = require("fs-extra");
const execa = require("execa");
const gitCmds = (git) => [
    "git init",
    "git branch -M master",
    `git remote add origin ${git}`,
];
// 获取用户输入
const getQuestions = async (projectName) => {
    return await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: `package name: (${projectName})`,
            default: projectName,
        },
        {
            type: "input",
            name: "description",
            message: "description",
        },
        {
            type: "input",
            name: "author",
            message: "author",
        },
        {
            type: "input",
            name: "git",
            message: "git仓库",
        },
    ]);
};
exports.getQuestions = getQuestions;
const formatInfo = (qustion) => {
    let { git } = qustion;
    if (git.endsWith("/")) {
        git = git.slice(0, -1); // 去除最后一个字符/
    }
    // editPattern
    const base = `/${git.slice(git.lastIndexOf("/") + 1)}/`;
    const editPattern = `${git}/tree/master/docs/:path`;
    return Object.assign(Object.assign({}, qustion), { git,
        base,
        editPattern });
};
exports.formatInfo = formatInfo;
// 检查是否已经存在相同名字工程
const checkProjectExist = async (targetDir) => {
    if (fs.existsSync(targetDir)) {
        const answer = await inquirer.prompt({
            type: "list",
            name: "checkExist",
            message: `\n仓库路径${targetDir}已存在同名文件，请选择是否需要覆盖原路径（删除原文件后新建）`,
            choices: ["是", "否"],
        });
        if (answer.checkExist === "是") {
            logger_1.default.warn(`已删除${targetDir}...`);
            fs.removeSync(targetDir);
            return false;
        }
        else {
            logger_1.default.info("您已取消创建");
            return true;
        }
    }
    return false;
};
exports.checkProjectExist = checkProjectExist;
const cloneProject = async (targetDir, projectName, template, projectInfo) => {
    spinner_1.default.start(`开始创建目标文件 ${chalk.cyan(targetDir)}`);
    // 复制'project-template'到目标路径下创建工程
    await fs.copy(path.join(__dirname, "..", "..", `project_template/${template}`), targetDir);
    // handlebars模版引擎解析用户输入的信息存在package.json
    const packagePath = `${targetDir}/package.json`;
    const configPath = `${targetDir}/docs/.vitepress/config.js`;
    // 读取文件内容
    const packageContent = fs.readFileSync(packagePath, "utf-8");
    const configContent = fs.readFileSync(configPath, "utf-8");
    // 覆盖模版内容
    const packageResult = handlebars.compile(packageContent)(projectInfo);
    const configResult = handlebars.compile(configContent)(projectInfo);
    // 写入新内容
    fs.writeFileSync(packagePath, packageResult);
    fs.writeFileSync(configPath, configResult);
    logger_1.default.info("开始安装项目所需依赖");
    try {
        // 新建工程装包
        execa.commandSync("yarn", {
            stdio: "inherit",
            cwd: targetDir,
        });
    }
    catch (error) {
        // 报错就用npm试下
        execa.commandSync("npm install", {
            stdio: "inherit",
            cwd: targetDir,
        });
    }
    if (projectInfo.git) {
        logger_1.default.info("开始关联项目到git");
        // 关联git
        gitCmds(projectInfo.git).forEach((cmd) => execa.commandSync(cmd, {
            stdio: "inherit",
            cwd: targetDir,
        }));
    }
    spinner_1.default.succeed(`目标文件创建完成 ${chalk.yellow(projectName)}\n👉 输入以下命令开始创作吧!:`);
    logger_1.default.info(`$ cd ${projectName}\n$ yarn dev\n`);
};
exports.cloneProject = cloneProject;
/**
 * action接受两个参数，一个是command解析出的命令，一个是option中的选项
 * xzy-dev create project --template template --context context
projectName为project，cmdArgs为 { template: 'template', context: 'context' }
 */
const action = async (projectName, cmdArgs) => {
    try {
        // 目标路径
        const targetDir = path.join((cmdArgs && cmdArgs.context) || process.cwd(), projectName);
        // 使用的模版
        const template = cmdArgs.template || "vitepress";
        // 检查文件是否存在
        if (!(await (0, exports.checkProjectExist)(targetDir))) {
            // 获取用户输入
            const projectInfo = (0, exports.formatInfo)(await (0, exports.getQuestions)(projectName));
            console.log(projectInfo, "...");
            await (0, exports.cloneProject)(targetDir, projectName, template, projectInfo);
        }
    }
    catch (err) {
        console.log(err, "?..");
        spinner_1.default.fail(err);
        return;
    }
};
exports.default = {
    command: "create <registry-name>",
    description: "创建一个npm私服仓库",
    optionList: [
        ["--context <context>", "上下文路径(新建文件路径)"],
        ["--template <template>", "选择哪个模版"],
    ],
    action,
};
