"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cat_breeder_main_handler = void 0;
var axios_1 = __importDefault(require("axios"));
var dayjs_1 = __importDefault(require("dayjs"));
var breeder_1 = require("../data/breeder");
var today = dayjs_1.default().format('YYYY-MM-DD');
// 今日铲屎官
var breeder = (breeder_1.breederList.filter(function (i) { return i.time === today; })[0] || {}).breeder;
// 铲屎官userid
var breederUserId = (breeder_1.breeders.filter(function (i) { return i.name === breeder; })[0] || {}).userid;
var messagePush = function () {
    if (breederUserId) {
        var morningContent = "\u4ECA\u65E5\u94F2\u5C4E\u5B98\u3010" + breeder + "\u3011\uFF0C\u522B\u5FD8\u8BB0\u8BB0\u5F55\u732B\u54AA\u6392\u4FBF\u60C5\u51B5\u54E6~ \n\u8868\u683C\u5730\u5740\uFF1Ahttps://doc.weixin.qq.com/txdoc/word?scode=AN8AYAcVAAYFhfENK0AFIALwYWAFY&docid=w2_ABgALgYWAFY0Pz0LadSQECXlthS4V&type=0";
        var params = {
            msgtype: 'text',
            text: {
                content: morningContent,
                mentioned_list: [breederUserId]
            }
        };
        axios_1.default.post('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=76fc80cd-9273-4232-8e11-44f6c0147342', params);
    }
};
var cat_breeder_main_handler = function () {
    return messagePush();
};
exports.cat_breeder_main_handler = cat_breeder_main_handler;
