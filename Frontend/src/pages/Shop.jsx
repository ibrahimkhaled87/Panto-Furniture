import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Product from "../components/Product";
import Footer from "../components/Footer";
import useFetchProducts from "../hooks/useFetchProducts";

function Shop() {
    const [searchParams, setSearchParams] = useSearchParams();
    const limit = "4"; //hardcoded
    
    //Read search values + page from inputs INTO url
    function handleChange(e) {
        const {name, value} = e.target;
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            if(value)
                params.set(name, value);
            else
                params.delete(name);
            return params
        })
    }
    
    //Fetch backend data (search + pagination)
    const params = useMemo(() => {return { ...Object.fromEntries(searchParams.entries()), limit: limit };}, [searchParams]);
    let {uploads_path, backendData} = useFetchProducts(params);
    const numberOfButtons = Math.ceil( (backendData?.[0]?.total_count ?? 0) / limit );

    return <div className="shop">
        <Header />
        <div className="search">
            <input type="text" name="search" placeholder="Search furniture" value={Object.fromEntries(searchParams).search || ""} onChange={handleChange}/>

            <div className="filters">
                <label htmlFor="type">Type</label>
                <select id="type" name="type" onChange={handleChange}>
                    <option value="">All</option>
                    <option value="chair">Chair</option>
                    <option value="bed">Bed</option>
                    <option value="sofa">Sofa</option>
                    <option value="lamp">Lamp</option>
                </select>

                <label htmlFor="rating">Rating</label>
                <select id="rating" name="rating" onChange={handleChange}>
                    <option value="0">All</option>
                    <option value="4">4+</option>
                    <option value="3">3+</option>
                </select>
            </div>
        </div>
        <div className="products">
            {typeof(backendData) === 'undefined' ? <p>Loading...</p> : backendData.map(element =>
                <Product 
                    key={element.id} id={element.id}
                    img={uploads_path+element.type+"/"+element.img}
                    name={element.name} type={element.type} price={"$"+element.price} 
                    rating={"⭐".repeat(Math.floor(element.rating)) + "☆".repeat(5 - Math.floor(element.rating))}
                />
            )}
        </div>
        <div className="page-buttons">
            {numberOfButtons>1? Array.from({ length: numberOfButtons }, (_, i) => (
                <button name="page" value={i + 1} onClick={handleChange}>{i + 1}</button>
            )) : null}
        </div>
        <Footer />
    </div>
}

export default Shop;