"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../helpers/logger");
const action = () => {
    logger_1.default.info('你可以通过以下方式找到我😊：');
    logger_1.default.info('email: 2358460586@qq.com\n\nwechat: xzy20000627');
};
exports.default = {
    command: "contact",
    description: "获取作者的联系方式",
    action,
};
