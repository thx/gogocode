var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var import_message = __toModule(require("antd/lib/message/index"));
(0, import_message.default)("xxx");
import_message.default.error("error");
const testIf = (message2) => {
  if (message2)
    return message2;
};
const testIf2 = () => {
  if (import_message.default)
    return import_message.default;
};
const testExpression = (message2) => message2 + "test";
const testExpression2 = () => import_message.default + "test";
const testNestFunction = (message2) => (a) => message2;
const testNestFunction2 = () => (a) => import_message.default;
const testFunction = (message2) => {
  message2.error("error");
  return message2.test;
};
const testFunction1 = () => import_message.default.error("error");
const testFunction2 = (message2) => message2.error("error");
const testFunction3 = (message2) => {
  if (message2) {
    message2 = message2.test.message;
    for (let i = 0; i < 10; i++) {
      const message3 = i;
      if (message3 > 4) {
        return message3;
      }
    }
  }
  message2 = null;
  return message2;
};
function App() {
  const message2 = "xxx";
  return /* @__PURE__ */ React.createElement("div", null, message2);
}
