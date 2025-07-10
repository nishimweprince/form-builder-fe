import { useEffect, useState } from "react"
import { getUsers } from "../services/authService";
import { User } from "../types/user.type";



export const useUsers = () =>{

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<String | null>(null);

    useEffect(()=>{

        const fetchUsers = async()=>{
            setLoading(true);
            try {
                const data = await getUsers()
                setUsers(data);
                setError(null)
                
            } catch (error) {
                setError("Failed to fetch Users")
            }
            finally{
                setLoading(false);
            }
        }
        fetchUsers()
    }, [])

    return {users, loading, error}

}