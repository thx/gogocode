import foo from './foo'
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

lodash.capitalize('foo')
add(300, 200)
const Foo = () => {
  return (
    <>
      <Button />
      <MuxButton />
      {/* JSXOpeningElement */}
      <Antd.Select />
    </>
  )
}

export default Foo
