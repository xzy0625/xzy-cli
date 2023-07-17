const pkg = require('../package.json');
const fs = require('fs');
const path = require('path');

const VERSION = {
  PATCH: 'patch', // 补丁版本
  MINOR: 'minor', // 次版本号
  MAJOR: 'major', // 主版本号
}

// type类型
const [type = VERSION.PATCH] = process.argv.slice(2);

// 参数合法性校验
if (!Object.values(VERSION).includes(type)) {
  throw Error(`type can only be one of ${typeList}`);
}


function getVersion(type) {
  console.log("++++++++++++++", type, pkg.version)
  let [level1, level2, level3] = pkg.version.split('.');
  if (type === VERSION.PATCH) {
    level3 = Number(level3) + 1;
  } else if (type === VERSION.MINOR) {
    level2 = Number(level2) + 1;
  } else if (type === VERSION.MAJOR) {
    level1 = Number(level1) + 1;
  }
  return [level1, level2, level3].join('.');
}

pkg.version = getVersion(type);

console.log('============= published version: ', pkg.version, '==============');

fs.writeFileSync(
  path.resolve(__dirname, '../package.json'),
  JSON.stringify(pkg, undefined, 2),
);
