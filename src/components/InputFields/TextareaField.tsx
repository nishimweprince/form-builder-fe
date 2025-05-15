import { TextareaFieldsProps } from "./inputs.types"

const TextareaField: React.FC<TextareaFieldsProps> = ({
    label, className, ...fieldProps
}) => {
  return (
    <div>
        <label className="block mb-1 font-medium text-sm text-gray-700">{label}</label>
        <textarea  
        id={fieldProps.name}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition ${className}`} 
        {...fieldProps}
        ></textarea>
    </div>
  )
}

export default TextareaField