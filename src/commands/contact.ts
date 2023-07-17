import logger from "../helpers/logger";

const action = () => {
  logger.info('你可以通过以下方式找到我😊：')
  logger.info('email: 2358460586@qq.com\n\nwechat: xzy20000627');
};
export default {
  command: "contact",
  description: "获取作者的联系方式",
  action,
};
