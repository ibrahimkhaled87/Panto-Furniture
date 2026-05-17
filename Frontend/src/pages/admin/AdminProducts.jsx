import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchProducts from "../../hooks/useFetchProducts"
import DeleteOverlay from "../../components/DeleteOverlay";

export default function AdminProducts() {
    // Navigation object
    const navigate = useNavigate();

    // Get search values
    const [search, setSearch] = useState({search: "", type: ""});
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

    //For overlay status
    const [overlayId, setOverlayId] = useState(null);

    const {uploads_path, backendData} = useFetchProducts(search, overlayId);

    return <div className="adminProducts">
        <div className="addBtn" onClick={() => navigate("add")}>
            <p><span>+</span> Add New Product</p>
        </div>

        <div className="searchArea">
            <input type="text" name="search" placeholder="Search product" onChange={(e) => handleChange(e)}/>
            <div className="filter type">
                <label htmlFor="type">TYPE</label>
                <select name="type" id="type" onChange={(e) => handleChange(e)}>
                    <option value="">All</option>
                    <option value="chair">Chair</option>
                    <option value="bed">Bed</option>
                    <option value="sofa">Sofa</option>
                </select>
            </div>
        </div>
        <table>
            <thead>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Actions</th>
            </thead>
            <tbody>
                {!backendData ? <p>Loading...</p> : backendData.map((item, index) => 
                    <tr className={(index+1)%2 === 0 ? "even" : ""}>
                        <td>{item.id}</td>
                        <td><img src={uploads_path+item.type+"/"+item.img} alt="" /></td>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.quantity}</td>
                        <td>
                            <div className="buttons">
                                <div className="button edit" onClick={() => navigate(`edit/${item.id}`)}>Edit</div>
                                <div className="button delete" onClick={() => setOverlayId(item.id)}>Delete</div>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>


        <DeleteOverlay id={overlayId} onClose={() => setOverlayId(null)} />
    </div>
}