import { motion } from "framer-motion"
import { useSnapSection } from "../hooks/useSnapSection"
import { staggerContainer, fadeUp } from "../lib/animations"

const capitulos = [
    { letra: "L", num: 1, titulo: "Liberar el Pasado" },
    { letra: "E", num: 2, titulo: "Encontrar a Dios en el Proceso" },
    { letra: "V", num: 3, titulo: "Visualizar Nuevos Sueños" },
    { letra: "A", num: 4, titulo: "Aclarar tu Visión" },
    { letra: "N", num: 5, titulo: "Nuevos Hábitos y Enfoque" },
    { letra: "T", num: 6, titulo: "Trazar tu Plan" },
    { letra: "A", num: 7, titulo: "Actúa con Fe" },
    { letra: "T", num: 8, titulo: "Transforma tu Tiempo" },
    { letra: "E", num: 9, titulo: "Empieza una Nueva Etapa" },
]

const extras = [
    "Sección Especial: Volver a Soñar",
    "Descubre tus Dones y Talentos",
    "Plan de 30 Días",
    "Conclusión: Tu Historia No Ha Terminado",
]

export default function Contenido() {
    const { ref, isActive } = useSnapSection('contenido')

    return (
        <section
            id="contenido"
            ref={ref as React.RefObject<HTMLElement>}
            className="w-full flex flex-col items-center justify-center px-6 py-16 md:py-24 bg-[#FBF4EB]"
        >
            <motion.div
                className="max-w-2xl w-full flex flex-col items-center"
                variants={staggerContainer}
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
            >
                <motion.p variants={fadeUp} className="font-cormorant text-[#3F4321] uppercase tracking-[0.2em] font-medium text-xs md:text-sm">
                    Lo que encontrarás adentro
                </motion.p>

                <motion.h2 variants={fadeUp} className="font-playfair font-bold text-[#372212] text-3xl md:text-5xl mt-3 mb-2 text-center leading-tight">
                    Contenido
                </motion.h2>

                <motion.div variants={fadeUp} className="w-16 h-[2px] bg-[#FB6F92] mb-8 md:mb-12" />

                {/* Introducción */}
                <motion.p variants={fadeUp} className="font-cormorant italic text-[#372212]/70 text-base md:text-lg mb-6 text-center">
                    Introducción: Cuando la vida se detiene…
                </motion.p>

                {/* Capítulos */}
                <motion.div variants={staggerContainer} className="w-full flex flex-col">
                    {capitulos.map((cap, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUp}
                            className="flex items-center gap-4 py-3 border-b border-[#FB6F92]/20 group"
                        >
                            <span className="font-playfair font-bold text-[#FB6F92] text-xl md:text-2xl w-6 shrink-0 text-center">
                                {cap.letra}
                            </span>
                            <span className="font-cormorant text-[#372212]/50 text-sm shrink-0">
                                Cap. {cap.num}
                            </span>
                            <div className="flex-1 h-px bg-[#372212]/15 mx-2" />
                            <span className="font-cormorant text-[#372212] text-base md:text-lg font-medium text-right">
                                {cap.titulo}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Secciones especiales */}
                <motion.div variants={staggerContainer} className="w-full flex flex-col mt-4">
                    {extras.map((item, i) => (
                        <motion.p
                            key={i}
                            variants={fadeUp}
                            className="font-cormorant italic text-[#372212]/60 text-sm md:text-base py-2 border-b border-[#FB6F92]/10 text-center last:border-0"
                        >
                            {item}
                        </motion.p>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}
