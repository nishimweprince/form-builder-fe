import { useState } from "react"
import InputField from "../components/InputField/InputField"

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password:"",
    });
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log("Form submitted", formData);
        

    }
  return (
    <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className="border bg-blue">
        <InputField
        label="username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        />
        <InputField
        label="email" 
        type="email" 
        name="email"
        value={formData.email}
        onChange={handleChange}
         />
         <InputField
         label= "password"
         type= "password"
         name= "password"
         value={formData.password}
         onChange={handleChange}
         />
         <button type="submit" className=" border bg-amber-200">Register</button>
        </form>
        
    </div>
  )
}

export default Register