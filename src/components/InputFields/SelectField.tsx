import { selectFieldsProps } from "./inputs.types"


const SelectField: React.FC<selectFieldsProps> = ({
    label,
    options,
    className,
    ...fieldProps

}) => {
  return (
    <div>
        <label 
        htmlFor={fieldProps.name}
        className="block mb-1 font-medium text-sm text-gray-700"
        >
            {label}
        </label>
        <select 
        id="fieldProps.name"
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition ${className}`}
        {...fieldProps}       
        >
            <option value="">Select {label.toLowerCase()}</option>
            {options.map((option)=>(
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
  )
}

export default SelectField