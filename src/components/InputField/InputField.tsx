import { InputFieldProps } from "./InputField.types"


const InputField: React.FC<InputFieldProps> = ({label,name, type,value, onChange}) => {
  return (
    <div>
        <label>{label}</label> <br />
        <input type={type} name={name} value={value} onChange={onChange} />
    </div>
  )
}

export default InputField