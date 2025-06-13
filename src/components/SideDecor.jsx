// src/components/SideDecor.jsx
// Descripción: Componente para mostrar decoraciones laterales en la página, utilizando imágenes de assets.

import leftPng from '../assets/clever_crow.png';
import rightPng from '../assets/clever_crow_1.png';
import '../styles/sideDecor.css';

export default function SideDecor() {
    return (
        <>
            <img src={leftPng} alt="Decoración izquierda" className="side-decor left" />
            <img src={rightPng} alt="Decoración derecha" className="side-decor right" />
        </>
    );
}
