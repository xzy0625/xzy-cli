"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestVersion = exports.getPkgInfo = exports.getPathList = void 0;
const globby = require("globby");
const path = require("path"); // 这引入方式有毒
const fs = require('fs-extra');
const pacote = require("pacote");
const logger_1 = require("../helpers/logger");
// 获取某个路径下的所有文件路径
const getPathList = (pathName) => {
    let PathList = [];
    try {
        PathList = globby.sync(pathName, { cwd: path.resolve(__dirname, '..'), deep: 1 }) || [];
    }
    catch (error) {
        logger_1.default.error(error);
    }
    return PathList;
};
exports.getPathList = getPathList;
// 获取当前包的信息
const getPkgInfo = () => {
    const jsonPath = path.join(__dirname, '../../package.json');
    const jsonContent = fs.readFileSync(jsonPath, 'utf-8');
    const jsonResult = JSON.parse(jsonContent);
    return jsonResult;
};
exports.getPkgInfo = getPkgInfo;
// 获取最新包最新版本
const getLatestVersion = async (pkgName) => {
    const manifest = await pacote.manifest(`${pkgName}@latest`);
    return manifest.version;
};
exports.getLatestVersion = getLatestVersion;
