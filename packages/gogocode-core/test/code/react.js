const code = `
import * as React from 'react';
import styles from './index.module.scss';
import { Button } from "@alifd/next";

const Btn = () => {
  return (
    <div>
      <h2>转译前</h2>
      <div>
        <Button type="normal">Normal</Button>
        <Button type="primary">Prirmary</Button>
        <Button type="secondary">Secondary</Button>
        
        <Button type="normal" text>Normal</Button>
        <Button type="primary" text>Primary</Button>
        <Button type="secondary" text>Secondary</Button>
        
        <Button type="normal" warning>Normal</Button>
      </div>
    </div>
  );
};

export default Btn;
`;
const compareCode =  `
import * as React from 'react';
import styles from './index.module.scss';
import { Button } from "antd"

const Btn = () => {
  return (
    <div>
      <h2>转译后</h2>
      <div>
        <Button type="default" ></Button>
        <Button type="primary">Prirmary</Button>
        <Button type="secondary">Secondary</Button>
        
        <Button type="link" type="default"></Button>
        <Button type="link" type="primary"></Button>
        <Button type="link" type="secondary"></Button>
        
        <Button danger type="default"></Button>
      </div>
    </div>
  );
};

export default Btn;
`;

module.exports = { code, compareCode };

