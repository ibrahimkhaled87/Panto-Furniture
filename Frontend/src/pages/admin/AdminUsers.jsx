import { useState, useEffect } from "react"
import api from "../../utils/axios";

export default function AdminUsers() {
    // Get search values
    const [search, setSearch] = useState({search: ""});
    function handleChange(e) {
        const {name, value} = e.target;
        setSearch(prev => ({
            ...prev,
            [name]: value
        }))
    }
    useEffect(() => {
        console.log(search);
    }, [search])

    //Fetch users
    const [users, setUsers] = useState();
    useEffect(() => {
        const getData = async() => {
            try {
                const response = await api.get("/users", {params: search});
                setUsers(response.data);
            } catch (error) {
                console.log(error); 
            }
        }
        getData();
    }, [search])

    return <div className="adminUsers">
        <div className="searchArea">
            <input type="text" name="search" placeholder="Search user" onChange={(e) => handleChange(e)}/>
        </div>

        <div className="users">
            {!users? <p>Loading...</p> : users.map(user => (
                <div className="userCard">
                    <img src="/images/profile.svg" alt="" />
                    <div className="info">
                        <h2>{user.f_name+" "+user.l_name}</h2>
                        <p>{user.username}</p>
                        <p>{user.status}</p>
                    </div>
                </div>
            )) }
        </div>
    </div>
}