const code = `
type CheckBoxProps = {checked:boolean,width:number};
let cbp:CheckBoxProps = {
  checked: true,
  width: 100
}
const change = (props:CheckBoxProps)=>{
  setProps(props);
}
`;
module.exports = code;