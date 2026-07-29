import brushlessMotorCar from "../../assets/brushless-motor-car.webp";
import cncLathe from "../../assets/cnc-lathe.webp";
import rcAircraft from "../../assets/rc-aircraft-cutout.webp";
import so101RoboticArm from "../../assets/so101-robotic-arm.webp";
import wearableCollector from "../../assets/wearable-collector.webp";
import plane01 from "../../assets/plane/plane-01.webp";
import plane02 from "../../assets/plane/plane-02.webp";
import plane03 from "../../assets/plane/plane-03.webp";
import plane04 from "../../assets/plane/plane-04.webp";
import plane05 from "../../assets/plane/plane-05.webp";
import plane06 from "../../assets/plane/plane-06.webp";
import plane07 from "../../assets/plane/plane-07.webp";
import plane08 from "../../assets/plane/plane-08.webp";
import plane09 from "../../assets/plane/plane-09.webp";
import plane10 from "../../assets/plane/plane-10.webp";
import plane11 from "../../assets/plane/plane-11.webp";
import plane12 from "../../assets/plane/plane-12.webp";
import plane13 from "../../assets/plane/plane-13.webp";
import cnc01 from "../../assets/cnc/cnc-01.webp";
import cnc02 from "../../assets/cnc/cnc-02.webp";
import cnc03 from "../../assets/cnc/cnc-03.webp";
import cnc04 from "../../assets/cnc/cnc-04.webp";
import cnc05 from "../../assets/cnc/cnc-05.webp";
import cnc06 from "../../assets/cnc/cnc-06.webp";
import cnc07 from "../../assets/cnc/cnc-07.webp";
import cnc08 from "../../assets/cnc/cnc-08.webp";
import cnc09 from "../../assets/cnc/cnc-09.webp";
import car01 from "../../assets/car/car-01.webp";
import car02 from "../../assets/car/car-02.webp";
import car03 from "../../assets/car/car-03.webp";
import car04 from "../../assets/car/car-04.webp";
import car05 from "../../assets/car/car-05.webp";
import car06 from "../../assets/car/car-06.webp";
import car07 from "../../assets/car/car-07.webp";
import car08 from "../../assets/car/car-08.webp";
import wear01 from "../../assets/wearable/wearable-01.webp";
import wear02 from "../../assets/wearable/wearable-02.webp";
import wear03 from "../../assets/wearable/wearable-03.webp";
import wear04 from "../../assets/wearable/wearable-04.webp";
import wear05 from "../../assets/wearable/wearable-05.webp";
import wear06 from "../../assets/wearable/wearable-06.webp";
import wear07 from "../../assets/wearable/wearable-07.webp";
import so101a from "../../assets/so101/so101-01.webp";
import so101b from "../../assets/so101/so101-02.webp";
import so101c from "../../assets/so101/so101-03.webp";
import so101d from "../../assets/so101/so101-04.webp";
import so101e from "../../assets/so101/so101-05.webp";
import so101f from "../../assets/so101/so101-06.webp";
import so101g from "../../assets/so101/so101-07.webp";
import type { Language } from "../i18n.tsx";

type ProjectCopy = {
  /** Headline on the projects grid. */
  title: string;
  /** Longer headline used inside the detail panel. */
  detailTitle: string;
  /** Legacy single-column copy; used when the project has no `blocks`. */
  paragraphs?: string[];
};

/** Where the title sits relative to the image on the landing grid. */
export type ProjectLayout = "left" | "right" | "top" | "bottom";

/** One stacked piece of a rich detail panel, rendered top to bottom. */
export type DetailBlock =
  | { kind: "text"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "figures"; images: string[] }
  | { kind: "link"; href: string; label: string };

/** A project resolved into a single language, ready to render. */
export type Project = ProjectCopy & {
  /** Stable id used to open the detail panel. */
  key: string;
  image: string;
  layout: ProjectLayout;
  /** When the work happened, shown under the detail title. */
  date?: string;
  /** Interleaved text/image blocks. When present, they replace `paragraphs`. */
  blocks?: DetailBlock[];
};

/** Fields that don't change with language: the same photos and dates either way. */
type SharedFields = {
  key: string;
  image: string;
  layout: ProjectLayout;
  date?: string;
  blocks?: DetailBlock[];
};

type ProjectEntry = SharedFields & Record<Language, ProjectCopy>;

// Text and images lifted from docs/Portfolio.md. The copy is the author's own
// Spanish (typos tidied), so both languages share it for now.
const PLANE_BLOCKS: DetailBlock[] = [
  { kind: "figures", images: [plane01] },
  {
    kind: "text",
    text: "Construí un avión a combustión desde cero, inspirado en el Messerschmitt Bf 109, donde me encargué de desarrollar el empenaje, la wing box y el análisis de la propulsión.",
  },
  { kind: "figures", images: [plane02, plane03] },
  {
    kind: "text",
    text: "Simulé el empenaje y la wing box con las principales cargas y también hice un análisis claro del tren de aterrizaje.",
  },
  { kind: "figures", images: [plane04, plane05, plane06, plane07] },
  {
    kind: "text",
    text: "También simulé la estructura externa de nuestro avión, manufacturado con madera balsa cubierta de monokote. Además desarrollé el análisis de la relación entre el ángulo de la propela, la longitud y la cuerda con el poder del motor, considerando el consumo del combustible.",
  },
  { kind: "figures", images: [plane08, plane09] },
  { kind: "figures", images: [plane10, plane11] },
  {
    kind: "text",
    text: "Al final el avión voló en las afueras de la ciudad, sin problemas de propulsión ni fallas mecánicas en ninguna de las piezas.",
  },
  { kind: "figures", images: [plane12, plane13] },
];

const CNC_BLOCKS: DetailBlock[] = [
  { kind: "figures", images: [cnc01] },
  {
    kind: "text",
    text: "Construí un CNC desde 0. Primero analicé los existentes in-house, inspirado por este video.",
  },
  {
    kind: "link",
    href: "https://www.youtube.com/watch?v=UzSRKnSuSbM",
    label: "Ver el video de referencia",
  },
  {
    kind: "text",
    text: "Desarrollé una idea inicial de diseño, tamaño y componentes.",
  },
  { kind: "figures", images: [cnc02] },
  {
    kind: "text",
    text: "Analicé la mejor opción de materiales para la construcción, buscando una relación entre el proceso de ensamble, vibraciones, peso, backlash y fabricación.",
  },
  { kind: "figures", images: [cnc03, cnc04] },
  { kind: "figures", images: [cnc05] },
  {
    kind: "text",
    text: "Utilicé múltiples equipos de manufactura, por ejemplo: máquina fresadora, CNC Haas, torno, taladro de banco, cortadora láser, cortadora plasma y soldadura por electrodo.",
  },
  { kind: "figures", images: [cnc06] },
  { kind: "figures", images: [cnc07, cnc08, cnc09] },
  {
    kind: "text",
    text: "Al final teníamos tolerancias fuera de lo buscado debido a las vibraciones, entonces tomé la decisión de comprar 15 kg de arena sílica e incorporarla en la base de nuestra máquina, reduciendo las vibraciones un 24%.",
  },
];

// The md's generic "brushed vs brushless" web diagram is dropped; only Diego's
// own photos, renders, and drawings are kept.
const CAR_BLOCKS: DetailBlock[] = [
  { kind: "figures", images: [car01] },
  {
    kind: "text",
    text: "Se tenía que desarrollar un motor lineal, pero era demasiado fácil. Así que decidí, en mis primeros semestres de ingeniería, hacer un motor brushless.",
  },
  { kind: "figures", images: [car02] },
  {
    kind: "text",
    text: "Luego de un buen research del funcionamiento de los motores.",
  },
  {
    kind: "text",
    text: "En base a entender el funcionamiento, diseñé e imprimí con una Ender 3 V2 un primer estator, integrando baleros, eje y embobinado.",
  },
  { kind: "figures", images: [car03, car04, car05] },
  {
    kind: "text",
    text: "Confiaba demasiado en el torque de mi motor que desarrollé mis propios rines en el torno con aluminio 6061, y además, para buscar una buena relación de fricción con el suelo, desarrollé mis propias ruedas (experiencia previa de ver a gente construir sumos), donde hice mis moldes impresos con PLA y los rellené con la mezcla correcta de silicón (caucho de silicón y catalizador).",
  },
  { kind: "figures", images: [car06] },
  {
    kind: "text",
    text: "Recorrió lo necesario, 1 m, pero se tuvieron que imprimir las ruedas en plástico PLA debido al peso y el torque máximo del motor.",
  },
  { kind: "figures", images: [car07] },
  { kind: "figures", images: [car08] },
  {
    kind: "link",
    href: "https://drive.google.com/drive/folders/1d4yGmu9sEwhqprJoip8Zm3cul2uQznqX",
    label: "Ver videos de funcionamiento",
  },
];

// Text and image grouping follow docs/Portfolio.md project 7 exactly.
const WEARABLE_BLOCKS: DetailBlock[] = [
  { kind: "figures", images: [wear01, wear02] },
  {
    kind: "text",
    text: "Me ofrecieron trabajar consiguiendo egocentric data y decidí crear mi propia empresa para recolectar egocentric data. Desarrollé Holley, es una diadema para capturar video en primera persona, con una cámara Innomaker, una Raspberry Pi Zero 2W, impresión 3D y botones normalmente abiertos.",
  },
  { kind: "figures", images: [wear03, wear04] },
  {
    kind: "text",
    text: "La cámara y la Raspberry capturan chunks, o se puede decir frames, que se transfieren por wifi a la computadora. Optimicé el formato de envío y agregué un disipador de calor porque mi cabeza se quemaba al capturar data por más de 2 horas.",
  },
  { kind: "figures", images: [wear05] },
  {
    kind: "text",
    text: "La computadora se encargaba de convertir esos filmes que llegan en un video mp4. Logré optimizar el sistema para mantener 30 fps estables, mientras podemos tener la Raspberry en el cinturón del pantalón con un ventilador y mejor disipación de calor por medio de un disipador de aluminio.",
  },
  {
    kind: "link",
    href: "https://github.com/diego-bau3/Holley",
    label: "Ver el código en GitHub",
  },
  {
    kind: "link",
    href: "https://ready2l.com/",
    label: "Visitar el sitio web (ready2l.com)",
  },
  { kind: "figures", images: [wear06, wear07] },
];

// docs/Portfolio.docx project 13 ("SO101") — the docx has 4 projects the md
// export dropped; this one keeps the full write-up and its 11 images.
const SO101_BLOCKS: DetailBlock[] = [
  { kind: "figures", images: [so101a, so101b, so101c] },
  {
    kind: "text",
    text: "Compré, imprimí y ensamblé cuatro brazos SO101; la idea era capturar data y entrenar modelos. Decidí construir mi propio setup, entonces diseñé, corté y ensamblé mis propias mesas con diferentes colores de fondo para asegurarme de tener variedad, y les instalé unos aros de luces LED para también tener una iluminación distinta. Diseñé e imprimí soportes para las cámaras, para poder ajustar el ángulo de visión a mi parecer.",
  },
  {
    kind: "text",
    text: "También hice un análisis de esfuerzos básico donde quería ver la concentración de esfuerzos y asegurarme si se podía optimizar la pieza.",
  },
  { kind: "figures", images: [so101d] },
  {
    kind: "text",
    text: "Luego de este análisis hice otro con diseño generativo mucho más sólido, con las fuerzas en todos los ejes después de hacer un diagrama de fuerzas, buscando que al acelerarse el brazo no se pandeara.",
  },
  { kind: "figures", images: [so101e, so101f] },
  {
    kind: "text",
    text: "Esta fue la geometría que se logró conseguir: de 50 gramos pasamos a 30 gramos, además se imprimió con PLA-CF e infill giroide. Logrando una pieza incluso más resistente que la pasada pero con 40% menos material, que se traduce a más carga nominal del brazo.",
  },
  {
    kind: "text",
    text: "Por último hice un análisis de los esfuerzos del brazo completo y cómo caían sobre los motores, para poder sustentarlo. Y como era de esperarse, las 2 articulaciones con el brazo de palanca mayor sufrían el mayor esfuerzo, por lo que decidí cambiarlos a 12 V haciendo un puente desde mi step-down. ¿Por qué no cambié todos? Bueno, no tiene sentido cambiar un motor en la muñeca que puede rotar una carga de 2 kg, cuando en realidad el brazo en las articulaciones puede cargar 600 gramos; para eso se utilizó el análisis de esfuerzos.",
  },
  { kind: "figures", images: [so101g] },
];

const ENTRIES: ProjectEntry[] = [
  {
    key: "aircraft",
    layout: "top",
    image: rcAircraft,
    date: "Noviembre – Diciembre 2024",
    blocks: PLANE_BLOCKS,
    en: {
      title: "Combustion-Powered RC Aircraft",
      detailTitle: "Messerschmitt Bf 109 a motor de combustión",
    },
    es: {
      title: "Avión RC con motor de combustión",
      detailTitle: "Messerschmitt Bf 109 a motor de combustión",
    },
  },
  {
    key: "cnc",
    layout: "top",
    image: cncLathe,
    date: "Marzo – Junio 2026",
    blocks: CNC_BLOCKS,
    en: {
      title: "CNC Lathe from Scratch",
      detailTitle: "Torno CNC in-house",
    },
    es: {
      title: "Torno CNC desde cero",
      detailTitle: "Torno CNC in-house",
    },
  },
  {
    key: "car",
    layout: "top",
    image: brushlessMotorCar,
    date: "Noviembre – Diciembre 2021",
    blocks: CAR_BLOCKS,
    en: {
      title: "Custom Brushless Motor Car",
      detailTitle: "Vehículo con motor brushless hecho a mano",
    },
    es: {
      title: "Carro con motor brushless hecho a mano",
      detailTitle: "Vehículo con motor brushless hecho a mano",
    },
  },
  {
    key: "wearable",
    layout: "top",
    image: wearableCollector,
    blocks: WEARABLE_BLOCKS,
    en: {
      title: "Wearable Data Collector for Robotics",
      detailTitle: "Recolección de datos vestible para robótica",
    },
    es: {
      title: "Recolector de datos vestible para robótica",
      detailTitle: "Recolección de datos vestible para robótica",
    },
  },
  {
    key: "so101",
    layout: "top",
    image: so101RoboticArm,
    blocks: SO101_BLOCKS,
    en: {
      title: "SO-101 Robotic Arm Learning System",
      detailTitle: "SO-101",
    },
    es: {
      title: "Sistema de aprendizaje con brazo robótico SO-101",
      detailTitle: "SO-101",
    },
  },
];

export function projectsFor(language: Language): Project[] {
  return ENTRIES.map((entry) => ({
    key: entry.key,
    image: entry.image,
    layout: entry.layout,
    date: entry.date,
    blocks: entry.blocks,
    ...entry[language],
  }));
}
