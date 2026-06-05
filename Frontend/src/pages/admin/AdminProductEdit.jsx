import { useState, useMemo, useEffect } from "react"
import { useParams } from "react-router-dom";
import useFetchProducts from "../../hooks/useFetchProducts"
import DragDropImage from "../../components/DragDropImage"
import api from "../../utils/axios";

export default function AdminProductEdit() {
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
    
    //Handle edit
    const handleEdit = async () => {
        // If null values error
        const hasNullImage = images.some(img => img === null);
        const hasNullInfo = Object.values(info).some(value => value === null);
        if (hasNullImage || hasNullInfo) {
            console.log("Some fields are missing");
            return;
        }

        // Send only changed fields
        console.log("original:" + originalValues);
        console.log("updates: " + images[0].name, info);
        const formData = new FormData();
        
        formData.append("id", id);
        (originalValues.img !== images[0].name) && formData.append("image", images[0]);
        (originalValues.name !== info.name) && formData.append("name", info.name);
        (originalValues.type !== info.type) && formData.append("type", info.type);
        (originalValues.price !== info.price) && formData.append("price", info.price);
        (originalValues.quantity !== info.quantity) && formData.append("quantity", info.quantity);
        
        try {
            console.log("inside handle add")
            const response = await api.patch("/products", formData,
                {params: {type: info.type}} //destination in query param (if image change)
            );
            alert(response.data);
        } catch (error) {
            alert(error);
        }
    }


    //Initial set
    
    //Fetch id from params
    const {id} = useParams();
    const search = useMemo(() => ({ id }), [id]);

    //Fetch Product data
    const {uploads_path, backendData} = useFetchProducts(search);

    //Keep copy of original to watch only for changed fields
    const [originalValues, setOriginalValues] = useState();

    useEffect(() => {
        if (!backendData) return;

        const loadData = async () => {
            for (const item of backendData) {
                setInfo({name: item.name, type: item.type, price: item.price, quantity: item.quantity});

                const url = `${uploads_path}${item.type}/${item.img}`;
                const response = await fetch(url);
                const blob = await response.blob();
                const file = new File(
                    [blob],
                    item.img,
                    { type: blob.type }
                );
                setImages([file]);
            }
        };
        loadData();

        setOriginalValues(backendData[0]);
    }, [uploads_path, backendData]);
    
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
            <input type="text" name="name" id="name" value={info.name} onChange={(e) => handleChange(e)} />

            <label htmlFor="type">Type</label>
            <input type="text" name="type" id="type" value={info.type} onChange={(e) => handleChange(e)} />

            <label htmlFor="price">Price</label>
            <input type="text" name="price" id="price" value={info.price} onChange={(e) => handleChange(e)} />

            <label htmlFor="quantity">Quantity</label>
            <input type="text" name="quantity" id="quantity" value={info.quantity} onChange={(e) => handleChange(e)} />

            <button type="submit" onClick={() => handleEdit()}>Edit Product {id}</button>
        </div>
    </div>
}