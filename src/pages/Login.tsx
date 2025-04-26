import { ChangeEvent, useState } from "react"
import InputField from "../components/InputField/InputField";



const Login: React.FC = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const handleChange =(e: React.ChangeEvent<HTMLInputElement>) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log("login successfully", formData);
        
    }
  
  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        <InputField
        label="email"
        type="email"
        value ={formData.email}
        name= "email"
        onChange= {handleChange}
        />
        <InputField
        label="password"
        type="password"
        value={formData.password}
        name="password"
        onChange={handleChange}/>
        <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login