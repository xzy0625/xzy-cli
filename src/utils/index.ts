import * as globby from 'globby'
import * as path from 'path' // 这引入方式有毒
const fs = require('fs-extra');
import * as pacote from 'pacote'
import logger from "../helpers/logger";

export interface IPackageInfo {
  version: string;
  name: string;
}

// 获取某个路径下的所有文件路径
export const getPathList = (pathName: string): string [] => {
  let PathList: string[] = [];
  try {
    PathList = globby.sync(pathName, { cwd: path.resolve(__dirname, '..'), deep: 1 }) || [];
  } catch (error: any) {
    logger.error(error);
  }
  return PathList;
};


// 获取当前包的信息
export const getPkgInfo = (): IPackageInfo => {
  const jsonPath = path.join(__dirname, '../../package.json')
  const jsonContent = fs.readFileSync(jsonPath, 'utf-8')
  const jsonResult = JSON.parse(jsonContent)
  return jsonResult as IPackageInfo;
}

// 获取最新包最新版本
export const getLatestVersion = async (pkgName: string) => {
  const manifest = await pacote.manifest(`${pkgName}@latest`)
  return manifest.version
}