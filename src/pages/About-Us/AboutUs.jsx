import React from "react";
import { Container } from "react-bootstrap";
import "./About-us.css";

const AboutUs = () => {
  return (
    <Container fluid className="bg-about-us">
      <div>
        <h1 className="name-restaurante">Mr Chef</h1>
        <h2 className="text-about-us">
          El punto de encuentro donde compartir buenos momentos. <br />
          Servimos comida y vinos trabajando en una estrecha relación con
          productores y artesanos locales. <br /> A través de un servicio
          amigable, buscamos generar momentos de felicidad. <br />
          Ahora sumamos novedosas propuestas nocturnas: noches de música,
          excelente coctelería, tapeos y encantadoras cenas.
        </h2>
      </div>
    </Container>
  );
};

export default AboutUs;
