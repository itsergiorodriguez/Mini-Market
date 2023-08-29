import { useState } from "react";
import style from "./CreateProduct.module.css";
import Validation from "./Validations";
import axios from "axios"
import Swal from "sweetalert2";
import img1 from "../../../../assets/check.png"

export default function CreateProduct() {
  async function CreateProduct (newProduct) {
    const {name, category, price, description, image, brand, unit} = newProduct;
    if (name && category && price && description && image && brand && unit) {
      await axios.post('/product',newProduct)
      Swal.fire({
        title: 'Buen trabajo!' ,
        imageUrl: img1,
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
    }else{
      
      Swal.fire({
        title: "Datos Incorrectos/ Faltantes." ,
        icon: 'warning',
        background: "aliceblue",
        toast: 'true',
        position:'top',     
        confirmButtonText:'OK',
        padding: '1,4rem',
        confirmButtonColor:'#ff8000',
      });
    }
  }

    const [newProduct, setNewProduct] = useState({
        name: "",
        brand: "",
        image: "",
        unit: 0,
        price: 0,
        description: "",
        category: [],
        score: 0,
    })

    const [errors, setErrors] = useState({
        name: "",
        brand: "",
        image: "",
        unit: undefined,
        price: undefined,
        description: "",
        category: [],
        score: undefined,
      })

      const categoriesSet = [...new Set(newProduct.category)]
      
    function handlerChange (event){
        setNewProduct({
            ...newProduct,
            [event.target.name]: event.target.value,
        })
        setErrors(
            Validation({
                ...newProduct,
                [event.target.name]: event.target.value,
            })
        )
    }

    function handlerSelectChange (event) {
        const value = event.target.value;
          if (value !== "" && !newProduct.category.includes(value)) {
              setNewProduct({
                  ...newProduct,
                  category:[...newProduct.category, value]
              })
              setErrors(
                  Validation({
                    ...newProduct,
                    category:[newProduct.category]
                  })
              )
        }
    }

    function handlerSubmit (event) {
        event.preventDefault();
        setNewProduct({
            name: "",
            brand: "",
            image: "",
            unit: "",
            price: 0,
            description: "",
            category: [],
            score: 0,
        })
        CreateProduct(newProduct)
    }

    const preset_key = "szmwmrsq";
    const cloud_name = "dvu3hvpzu";
    const URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

    function handlerUploadImage (event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset_key);
      axios.post(URL, formData)
        .then((response) => { setNewProduct({ ...newProduct, image: response.data.secure_url });
      })
      .catch((err) => alert(err));
    }

  return (
    <div className={style.formView}>
      <form className={style.form} >
        <h2 className={style.titleCreate}>Crear Producto</h2>
        <div className={style.blocksInputs}>
          <div className={style.inputLeft}>
            <label>Nombre</label>
            <input className={style.inputs} type="text"
            value={newProduct.name}
            name="name"
            onChange={handlerChange}
            autoComplete="off"/>
            <p className={style.error}>{errors.name}</p>
          </div>
          <div className={style.inputRight}>
            <label>Marca</label>
            <input className={style.inputs} type="text"
            value={newProduct.brand}
            name="brand"
            onChange={handlerChange}
            autoComplete="off"/>
            <p className={style.error}>{errors.brand}</p>
          </div>
        </div>

        <div className={style.blocksInputs}>
          <div className={style.inputLeft}>
            <label>Imagen</label>
            <input className={`${style.inputs} ${style.inputs_file}`} type="file"
            name="image"
            onChange={handlerUploadImage}
            autoComplete="off"/>
            <p className={style.error}>{}</p>
          </div>
          <div className={style.inputRight}>
            <label>Unidades</label>
            <input className={style.inputs} type="number"
            value={newProduct.unit}
            name="unit"
            min="0"
            onChange={handlerChange}
            autoComplete="off"/>
            <p className={style.error}>{errors.unit}</p>
          </div>
        </div>

        <div className={style.blocksInputs}>
          <div className={style.inputLeft}>
            <label>Precio</label>
            <input className={style.inputs} type="number"
            value={newProduct.price}
            name="price"
            min="0"
            onChange={handlerChange}
            autoComplete="off"/>
            <p className={style.error}>{errors.price}</p>
          </div>
          <div className={style.inputRight}>
          <select value={newProduct.category} name="category" onChange={handlerSelectChange} aria-multiselectable className={style.select}>
                <option value="" className={style.options}>Categoria</option>
                <option value="Almacen" className={style.options}>Almacen</option>
                <option value="Perfumeria" className={style.options}>Perfumeria</option>
                <option value="Lacteos y productos frescos" className={style.options}>Lacteos y productos frescos</option>
                <option value="Comida" className={style.options}>Comida</option>
                <option value="pastas" className={style.options}>pastas</option>
                <option value="embutidos" className={style.options}>embutidos</option>
                <option value="Carnes" className={style.options}>Carnes</option>
                <option value="Bebidas" className={style.options}>Bebidas</option>
                <option value="Limpieza" className={style.options}>Limpieza</option>
                <option value="Lacteos" className={style.options}>Lacteos</option>
                <option value="Verduras" className={style.options}>Verduras</option>
                <option value="Aperitivos" className={style.options}>Aperitivos</option>
                <option value="Panaderia" className={style.options}>Panaderia</option>
                <option value="higiene personal" className={style.options}>higiene personal</option>
            </select>
          </div>
        </div>
    
        <div className={style.blocksInputs}>
        <div className={style.inputRight}>
          <label>Descripcion</label>
            <textarea className={style.textArea} type="text"
            value={newProduct.description}
            name="description"
            onChange={handlerChange}
            autoComplete="off"/>
            <p className={style.error}>{errors.description}</p>
          </div>
          <div className={style.inputRightSelect}>
            <p className={style.error}>{errors.category}</p>
            <div className={style.viewOptions}>
                {categoriesSet?.map((ele, i) => <p key={i} className={style.categoryInBlock}>
                  {ele}
                </p>)}
            </div>
          </div>
          
        </div>

        <div className={style.blocksInputs}>
         
        </div>

        <button className={
            !errors.name &&
            /*!errors.image && */
            !errors.brand && 
            !errors.price &&
            !errors.description && 
            !errors.category  &&
            !errors.unit 
            ?style.btnActive
            :style.btnDesactive} type="submit" onClick={handlerSubmit}>Crear</button>

      </form>
    </div>
  );
}