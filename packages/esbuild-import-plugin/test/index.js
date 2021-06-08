import Foo from './foo'
/* ImportSpecfier */
import { MuxButton, MuxSelect } from '@alife/mux-components'
/* DefaultImportSpecifier & ImportSpecfier */
import lodash, { add } from 'lodash'
/* DefaultImportSpecifier */
import Antd from 'antd'

// ! VariableDeclarator
const Button = Antd.Button
/* ArrayExpression */
const list = [Antd.Button, Antd.Select]
/* LogicalExpression */
const bool = Antd.Button || Antd.Select || true
/* ArrowFunctionExpression */
const bar = () => Antd.Button

const App = () => {
  return (
    <>
      <Foo />
      <Button />
      <MuxButton />
      {/* JSXOpeningElement */}
      <Antd.Select />
    </>
  )
}

export default App
