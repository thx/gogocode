"use strict";

var _react = _interopRequireDefault(require("react"));

var _message3 = _interopRequireDefault(require("antd/lib/message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _message3.default)('xxx');

_message3.default.error('error');

var testIf = function testIf(message) {
  if (message) return message;
};

var testIf2 = function testIf2() {
  if (_message3.default) return _message3.default;
};

var testExpression = function testExpression(message) {
  return message + 'test';
};

var testExpression2 = function testExpression2() {
  return _message3.default + 'test';
};

var testNestFunction = function testNestFunction(message) {
  return function (a) {
    return message;
  };
};

var testNestFunction2 = function testNestFunction2() {
  return function (a) {
    return _message3.default;
  };
};

var testFunction = function testFunction(message) {
  message.error('error');
  return message.test;
};

var testFunction1 = function testFunction1() {
  return _message3.default.error('error');
};

var testFunction2 = function testFunction2(message) {
  return message.error('error');
};

var testFunction3 = function testFunction3(message) {
  if (message) {
    message = message.test.message;

    for (var i = 0; i < 10; i++) {
      var _message2 = i;

      if (_message2 > 4) {
        return _message2;
      }
    }
  }

  message = null;
  return message;
};

function App() {
  var message = 'xxx';
  return /*#__PURE__*/_react.default.createElement("div", null, message);
}
