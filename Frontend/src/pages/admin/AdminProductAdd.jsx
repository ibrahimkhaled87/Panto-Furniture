import { useState } from "react"
import DragDropImage from "../../components/DragDropImage"
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";

export default function AdminProductAdd() {
    //Navigation Object
    const navigate = useNavigate();

    //Get images
    const [images, setImages] = useState([null])
    const updateImage = (index, value) => {
        setImages(prev => {
            const copy = [...prev];
            copy[index] = value;
            return copy;
        });
    };

    //Get product info
    const [info, setInfo] = useState({name:null, type:null, price:null, quantity:null});
    const handleChange = (e) => {
        const {name, value} = e.target;
        setInfo(prev => ({
            ...prev,
            [name]: value
        }))
    };
    
    //Handle add
    const handleAdd = async () => {
        const hasNullImage = images.some(img => img === null);
        const hasNullInfo = Object.values(info).some(value => value === null);
        if (hasNullImage || hasNullInfo) {
            console.log("Some fields are missing");
            return;
        }

        const formData = new FormData();
        formData.append("image", images[0]);
        formData.append("name", info.name);
        formData.append("type", info.type);
        formData.append("price", info.price);
        formData.append("quantity", info.quantity);
        try {
            console.log("inside handle add")
            const response = await api.post("/products", formData,
                {params: {type: info.type}} //destination in query param
            );
            alert(response.data);
            navigate("../products");
        } catch (error) {

        }
    }

    
    return <div className="adminProductAdd">
        <div className="dragDrops">
            <p>Main Image</p>
            {images.map((img, i) => (
                <DragDropImage
                key={i}
                image={img}
                setImage={(val) => updateImage(i, val)}
                />
            ))}
        </div>

        <div className="info">
            <label htmlFor="name">Product Name</label>
            <input type="text" name="name" id="name" onChange={(e) => handleChange(e)} />

            <label htmlFor="type">Type</label>
            <input type="text" name="type" id="type" onChange={(e) => handleChange(e)} />

            <label htmlFor="price">Price</label>
            <input type="text" name="price" id="price" onChange={(e) => handleChange(e)} />

            <label htmlFor="quantity">Quantity</label>
            <input type="text" name="quantity" id="quantity" onChange={(e) => handleChange(e)} />

            <button type="submit" onClick={() => handleAdd()}>Add New Product</button>
        </div>
    </div>
}