import { useMemo, useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import Header from "../components/Header"
import Footer from "../components/Footer"
import useFetchProducts from "../hooks/useFetchProducts"
import { useGuestCart } from "../context/GuestCartContext";
import ProductAdd from "../components/ProductAdd";

function ProductPage() {
    //Fetch id from params, fetch product
    const {id} = useParams();
    const search = useMemo(() => ({ id }), [id]);
    const {uploads_path, backendData} = useFetchProducts(search);

    //Fetch product images into Arr
    const preparedArr = [
        "images/image1.jpg",
        "images/image2.png",
        "images/image3.png"
    ]
    const [imagesArr, setImagesArr] = useState(preparedArr);
    useEffect(() => {
        if(!backendData) return;
        const backendImgs = backendData.map(item => uploads_path+item.type+"/"+item.img);
        setImagesArr([...backendImgs, ...preparedArr]);
    }, [backendData])


    // clickChange
    const [fade, setFade] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    function clickChange(index) {
        setFade(true); //fade

        setTimeout(() => {
            setCurrentIndex(index); //set current index
            setFade(false)
        }, 100) //fade time
    }

    //Fetch count from cart
    const {guestCart, updateItem} = useGuestCart();
    const existingItem = guestCart.find(item => item.id ===parseInt(id));
    const [count, setCount] = useState(existingItem?.count || 0)
    useEffect(() => {
        updateItem(parseInt(id), count);
    }, [count])


    return <div className="productPage">
        <Header />

        {!backendData ? <p>Loading...</p> : 
            backendData.map(item => {
                return (
                    <div className="content">
                        {/* Image Carousel */}
                        <div className="imageCarousel">
                            <div className="imgGrid">
                                {imagesArr.map((img, i) => (
                                    <img
                                        key={i}
                                        src={img}
                                        alt=""
                                        className={i === currentIndex ? "checked" : ""}
                                        onClick={() => clickChange(i)}
                                    />
                                ))}
                            </div>
                            
                            <div className="mainImgWrapper">
                                <img src={imagesArr[currentIndex]} alt="" className={`main ${fade? 'fade-out' : ''}`} />
                            </div>
                        </div>
                        {/* Details */}
                        <div className="details">
                            <h1>{item.name}</h1>
                            <p className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sunt fugit rerum quaerat soluta facilis</p>
                            <p className="rating">{"★".repeat(item.rating)+"☆".repeat(5-item.rating)} <span>(121)</span></p>
                            <div className="line"></div>
                            <h3 className="price">{"$"+item.price.toFixed(2)} <span>or $99.99/month</span></h3>
                            <p className="desc">Suggested payments with 6 month special financing</p>
                            <div className="line"></div>
                            <div className="contain">
                                <ProductAdd count={count} setCount={setCount}/>
                                <p className="desc left-items">Only <span>12 items</span> left! <br />Don't miss it</p>
                            </div>
                            <div className="buttons">
                                <div className="button buy">Buy Now</div>
                                <div className="button add">Add to Cart</div>
                            </div>
                        </div>
                    </div>
                );
            })
        }

        <Footer />
    </div>
}

export default ProductPage;