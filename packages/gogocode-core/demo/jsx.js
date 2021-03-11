const $ = require('../index');

const code = `
import { Button, jsx } from "@alifd/next";

const Button1 = () => {
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
        

        <Button type="normal" warning text="as" sss>Normal</Button>
      </div>
    </div>
  );
};

export default Button1;
`

const res = $(code)
    .replace(`import { $$$ } from "@alifd/next";`, `import { $$$ } from "antd";`)
    .replace(`<Button type="normal" $$$></Button>`, `<Button type="default" $$$></Button>`)
    .replace(`<Button text $$$></Button>`, `<Button $$$ type="link"></Button>`)
    .replace(`<Button warning $$$></Button>`, `<Button danger $$$></Button>`)
    .generate()

console.log(res)