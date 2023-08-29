import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts, setCategory } from "../../redux/slices/productsData";
import Nav from "../../components/Nav/Nav";
import Paginado from "../../components/Paginado/Paginado";
import Ordenamiento from "../../components/Ordenamiento/Ordenamiento";
import Product from "../../components/Product/Product";
import Carousel from "../../components/Carousel/Carousel";
import ReviewCarrusel from "../../components/ReviewsCarousel/ReviewsCarousel";
import Footer from "../../components/Footer/Footer";
import styles from "./Home.module.css"
import { clearCart } from "../../redux/slices/productsData";
import axios from "axios";
import productEmpty from "../../assets/empty.svg"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import img2 from '../../assets/check.png';


export default function Home() {
  const dispatch = useDispatch();
  const { products, currentPage } = useSelector((state) => state.products);

  // PAGINATION VARS
  const cardsInPage = 21;
  const totalCards = products.length;
  const lastIndex = currentPage * cardsInPage;
  const firstIndex = lastIndex - cardsInPage;
  const cardsShowed = products.slice(firstIndex, lastIndex);

  const storedProducts = JSON.parse(localStorage.getItem("PurchaseInfo"));
  const notificationConfirmed = JSON.parse(localStorage.getItem("preferenceMP"));
  const purchasedProducts = JSON.parse(localStorage.getItem("cart"));

  async function purchaseUser () {  
    await axios.post("/purchase", storedProducts);
    if ( notificationConfirmed ) {await axios.post("/notification/purchase", notificationConfirmed)};
  }
  
  useEffect(() => {
    if (window.location.search.includes("status=approved")) {

      async function decrementUnits () {
      for (const product of purchasedProducts) {
          const { data } = await axios.get(`/product/${product.id}`);
          const decrementPurchase = data.unit - product.unit;
          await axios.put(`/product/${product.id}`, { unit: decrementPurchase, state: true });
      }
    };
    decrementUnits();

      purchaseUser()
      dispatch(clearCart())
      localStorage.removeItem("PurchaseInfo")
      localStorage.removeItem("preferenceMP")
      Swal.fire({
        title: `Compra exitosa`,
        imageUrl: img2,
        imageWidth: 100,
        imageHeight: 100,
        confirmButtonText: "Aceptar",
        background: "white",
        width: "40%",
        heightAuto: false,
        height: "1%",
        padding: "3rem",
        buttonsStyling: false,
        customClass: {
          title: "mesageAlert",
          confirmButton: "buttonAlert",
        },
      });
    }
    dispatch(allProducts());
    dispatch(setCategory())
  }, []);
  
  return (
    <div id="Home">
      <div>
        <Nav/>
        
        <Carousel />
        
       

        <h1 className={styles.container}> 🛍️ Mini Market 🛍️  </h1>
        <br></br>

        <Paginado
          cardsInPage={cardsInPage}
          totalCards={totalCards}
          currentPage={currentPage}
        />

      
        <Ordenamiento/>

        <div className="container">
          <div className="row justify-content-center">

            
             {cardsShowed.length !== 0

            ? cardsShowed.map((item) => (
              item.unit !== 0 
              ?(item.state 
                ?  <div className="col-md-4 mb-3" key={item.id}>
                <Product
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                />
                  </div> 
                  : null) 
              : null
              )) 
            : <div className={styles.containerImageEmptyUser}>
                <img className={styles.imageEmptyUser} src={productEmpty} alt="El producto no existe" />
                <i className={styles.noUserText}>El producto no existe</i>
              </div> 
            }
          </div>
          <ReviewCarrusel />
        </div>

        <Footer />
      </div>
    </div>
  );
}
