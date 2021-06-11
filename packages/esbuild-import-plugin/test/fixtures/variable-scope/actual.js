import { message } from 'antd';

message('xxx');

message.error('error');

const testIf = (message) => {
  if (message) return message
}

const testIf2 = () => {
  if (message) return message
}

const testExpression = message => message + 'test'
const testExpression2 = () => message + 'test'

const testNestFunction = message => a => message
const testNestFunction2 = () => a => message
const testFunction = message => {
  message.error('error');
  return message.test;
}
const testFunction1 = () => message.error('error');
const testFunction2 = message => message.error('error');
const testFunction3 = message => {
  if(message) {
    message = message.test.message;
    for (let i = 0; i < 10; i++) {
      const message = i;
      if (message > 4) {
        return message;
      }
    }
  }
  message = null;
  return message;
}

function App() {
  const message = 'xxx';
  return <div>{message}</div>;
}
