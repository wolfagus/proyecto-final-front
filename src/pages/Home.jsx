/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import cocina from '../assets/images/cocina.png';
import './Home.css';
import products from '../assets/fake-data/products.js';
import ProductCard from '../components/Product-card/ProductCard.jsx';
import cocineros from '../assets/images/cocinaRestaurante.jpg';


const Home = () => {

const [category, setCategory] = useState ('ALL');
const [allProducts, setAllProducts] = useState (products);

useEffect(() => {
  if (category === 'ALL'){
    setAllProducts (products)
  }

  if (category === 'BURGER'){
    const filteredProducts= products.filter (item=>item.category === 'Burger' )
    setAllProducts (filteredProducts)
  }


  if (category === 'PIZZA'){
    const filteredProducts= products.filter (item=>item.category === 'Pizza' )
    setAllProducts (filteredProducts)
  }

  if (category === 'CHICKEN'){
    const filteredProducts= products.filter (item=>item.category === 'Chicken' )
    setAllProducts (filteredProducts)
  }


  if (category === 'ENSALADA'){
    const filteredProducts= products.filter (item=>item.category === 'Ensalada' )
    setAllProducts (filteredProducts)
  }
}, [category]);



  return (
    <><section className="cocineros">
<Col lg='12' md='12'>
  <div>
    <img src={cocineros} alt="cocinero" className="w-100" />
  </div>
  </Col>
</section>


    <section className="mb-5">
      <Container className="d-flex">
        <Row>
          <Col lg='5' md='5'>
            <div className="hero__content app__header">
              <h5 className="mb-2">TE INVITAMOS A CONOCER </h5>
              <h1 className="mb-4 hero__title"> LA <span>CASA</span> DEL VERDADERO <span>PLACER.</span></h1>
              <p className="mb-3">Abierto todos los días a partir de las 19.00 hs. Espacio petfriendly.</p>
              <p className="mb-3"><span>Muñecas 643, San Miguel de Tucumán, prov. de Tucumán. Argentina.</span></p>
            </div>
          </Col>
          <Col lg='7' md='7'>
            <div className="hero__img">
              <img src={cocina} alt="cocinero" className='w-100 mt-1' />
            </div>
          </Col>
        </Row>
      </Container>
    </section>


{/* GOOGLE MAPS */}
<section className="mb-0">
<iframe style= {{ width:"100%", height:"360px" }} src="https://maps.google.com/maps?q=Mu%C3%B1ecas%20643,%20San%20Miguel%20de%20Tucum%C3%A1n,%20Argentina&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
</section>

{/* MENUS 
    <section>
<Container>
  <Row>
    <Col lg='12' className="text-center">
      <h1 className="foodTitle mb-0 mt-5" > - Comidas Populares - </h1>
    </Col>
    <Col lg='12'> 
      <div className="food__category d-flex align-items-center justify-content-center mt-0">
        <button className="all__btn m-1 btn-dark d-flex" onClick={()=> setCategory ('ALL')}> Ver todo</button>
        
        <button className="m-1 btn-dark d-flex" onClick={()=> setCategory ('ENSALADA')}> Ensalada</button>

        <button className="m-1 btn-dark d-flex" onClick={()=> setCategory ('BURGER')}> Hamburguesa</button>

        <button className="m-1 btn-dark d-flex" onClick={()=> setCategory ('PIZZA')}> Pizza</button>

        <button className="m-1 btn-dark d-flex" onClick={()=> setCategory ('CHICKEN')}> Pollo</button>
      </div> 
    </Col>

{
  allProducts.map (item=> (
    <Col lg='3' md='4' key={item.id} className="mt-5">
      <ProductCard item={item}  />
    </Col>
  ) )
}



  </Row>
</Container>
      </section>*/}</>

  )
}





export default  Home; 
