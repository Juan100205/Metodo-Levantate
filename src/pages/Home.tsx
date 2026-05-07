import Hero from "../components/HeroSection";
import Contenido from "../components/Contenido";
import Identificacion from "../components/Identificacion";
import Solucion from "../components/Solucion";
import LoQueRecibes from "../components/LoQueRecibes";
import Testimonios from "../components/Testimonios";
import Oferta from "../components/Oferta";
import Preguntas from "../components/Preguntas";
import FinalCTA from "../components/FinalCTA";

export default function Home() {
    return (
        <main className="w-full flex flex-col">
            <Hero />
            <Identificacion />
            <Solucion />
            <Contenido />
            <LoQueRecibes />
            <Testimonios />
            <Oferta />
            <Preguntas />
            <FinalCTA />
        </main>
    )
}