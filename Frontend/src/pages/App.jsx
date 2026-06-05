import { useEffect, useState, useMemo } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import Product from "../components/Product";
import Review from "../components/Review";
import Footer from "../components/Footer";
import useDragScroll from "../hooks/useDragScroll";
import useFetchProducts from "../hooks/useFetchProducts";
import useTransX from "../hooks/useTransX";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

function App() {
    // Best selling selected type
    const [clickedType, setClickedType] = useState('chair');
    // Fetch top products
    const [topProducts, setTopProducts] = useState();
    useEffect(() => {
        async function getData() {
            try {
                const response = await api.get(`/products/top`, {params: {type: clickedType}});
                setTopProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [clickedType]);


    // useTransX call
    const {right, left} = useTransX();

    // UseDragScroll call
    useDragScroll();

    // Read search value
    const [search, setSearch] = useState();
    const limit = 4;
    const params = useMemo(
        () => ({ search, limit }),
        [search, limit]
    );
    let {uploads_path, backendData} = useFetchProducts(params);
    const numberOfPages = Math.ceil( (backendData?.[0]?.total_count ?? 0) / limit );

    // Navigation object
    const navigate = useNavigate();

    return <div className="app">
        <div className="hero">
            <Header /> 
            <h1>Make your interior more minimalistic & modern</h1>
            <p>Turn your room with panto into a lot more minimalist and modern with ease and speed</p>
            <div className="search">
                <input type="text" name="search" placeholder="Search furniture" onChange={(e) => setSearch(e.target.value)}/>
                <button type="submit">
                    <img src="images/search.svg" alt="" />
                </button>
                
                {!search? null : 
                <div className="popdown">
                    {backendData.map(item => <div className="item" onClick={() => navigate(`/productpage/${item.id}`)}>
                        <img src={uploads_path+item.type+"/"+item.img} alt="" />
                        <p>{item.name}</p>
                    </div> )}
                    {numberOfPages===1 ? null : <div className="more item" onClick={() => navigate(`/shop?search=${search}`)}>
                        <p>View All &rarr;</p>
                    </div> }
                </div>
                }
            </div>
        </div>

        <div className="why">
            <h1>Why<br/> Choosing Us</h1>
            <div className="cards">
                <Card 
                    headline="Luxury facilities" 
                    description="The advantage of hiring a workspace with us is 
                        that gives you comfortable service and all-round facilities." 
                    link="" 
                />
                <Card 
                    headline="Affordable Price" 
                    description="You can gete a workspace of the highest quality at an 
                        affordable price and still enjoy the facilities that are oly here" 
                    link="" 
                />
                <Card 
                    headline="Many Choices" 
                    description="We provide many unique work space choices so that 
                        you can choose the workspace to your liking" 
                    link="" 
                />
            </div>
        </div>

        <div className="best-selling">
            <h1>Best<br/> Selling Products</h1>
            <ul>
                <li onClick={() => setClickedType('chair')} className={clickedType==='chair'? "clicked" : ""}>Chair</li>
                <li onClick={() => setClickedType('bed')} className={clickedType==='bed'? "clicked" : ""}>Beds</li>
                <li onClick={() => setClickedType('sofa')} className={clickedType==='sofa'? "clicked" : ""}>Sofa</li>
                <li onClick={() => setClickedType('lamp')} className={clickedType==='lamp'? "clicked" : ""}>Lamp</li>
            </ul>
            <div className="arrows">
                <img src="images/left.svg" alt="" className="left" onClick={left}/>
                <img src="images/right.svg" alt="" className="right" onClick={right}/> 
            </div>
            <div className="products">
                {typeof(topProducts) === 'undefined' ? <p>Loading...</p> : topProducts.map(element =>
                    <Product 
                        key={element.id} id={element.id}
                        img={uploads_path+element.type+"/"+element.img}
                        name={element.name} type={element.type} price={"$"+element.price} 
                        rating={"⭐".repeat(Math.floor(element.rating)) + "☆".repeat(5 - Math.floor(element.rating))}
                    />
                )}
            </div>
        </div>
        <div className="experience">
            <img src="images/image1.jpg" alt="" />
            <div className="text">
                <p className="title">EXPEREIENCES</p>
                <Card 
                    headline="We Provide You The Best Experience"
                    description="You don't have to worry about the result because all of these interiors 
                        are made by people who are professionals in their fields with an elegant and lucirious style
                        and with premium quality materials"
                />    
            </div>
        </div>
        <div className="material">
            <div className="images">
                <img src="images/image2.png" alt="" />
                <img src="images/image3.png" alt="" />
                <img src="images/image4.jpg" alt="" />
            </div>
            <div className="text">
                <p className="title">MATERIALS</p>
                <Card 
                    headline="Very Serious Materials For Making Furniture"
                    description="Because panto was very serious about designing furniture for our
                        environment, using a very expensive and famous capital but at a relativly
                        low price"
                />    
            </div>
        </div>
        <div className="testimonial">
            <div className="title">TESTIMONIALS</div>
            <h1>Our Client Reviews</h1>
            <div className="reviews">
                <Review name="Bang Upin1" location="Pedagang Asongan" detail="Terimaksih banyak, kini 
                    runanganku menjadi lebih mewah dan terihat mahal" rating="⭐⭐⭐⭐" 
                />
                <Review name="Bang Upin2" location="Pedagang Asongan" detail="Terimaksih banyak, kini 
                    runanganku menjadi lebih mewah dan terihat mahal" rating="⭐⭐⭐⭐" 
                />
                <Review name="Bang Upin3" location="Pedagang Asongan" detail="Terimaksih banyak, kini 
                    runanganku menjadi lebih mewah dan terihat mahal" rating="⭐⭐⭐⭐" 
                />
            </div>
        </div>

        <Footer />
    </div>
}


export default App;
