// src/components/SideDecor.jsx
// Descripci�n: Componente para mostrar decoraciones laterales en la p�gina, utilizando im�genes de assets.

import leftPng from '../assets/clever_crow.png';
import rightPng from '../assets/clever_crow_1.png';
import '../styles/sideDecor.css';

export default function SideDecor() {
    return (
        <>
            <img src={leftPng} alt="Decoraci�n izquierda" className="side-decor left" />
            <img src={rightPng} alt="Decoraci�n derecha" className="side-decor right" />
        </>
    );
}
