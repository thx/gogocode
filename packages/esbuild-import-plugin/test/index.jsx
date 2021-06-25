import React from 'react'
import ReactDOM from 'react-dom'
import Antd, { TimePicker } from 'antd'
import MyButton from 'antd/lib/button'
// const MyButton = Antd.Button
const { Table, Select: MySelect } = Antd
const { Input } = Antd

const App = () => {
  return (
    <>
      <MyButton />
      <TimePicker />
      <Input />
      <Table />
      <MySelect />
      <Antd.Button>click me!!</Antd.Button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
