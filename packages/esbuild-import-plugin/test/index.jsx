import * as React from 'react'
import Foo from './module'
/* ImportSpecfier */
import { MuxButton, MuxSelect } from '@alife/mux-components'
/* DefaultImportSpecifier & ImportSpecfier */
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
    <div>
      <Foo />
      <Button />
      <MuxButton />
      {/* JSXOpeningElement */}
      <Antd.Select />
    </div>
  )
}

export default App
