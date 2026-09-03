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
import bomba01 from "../../assets/bomba/bomba-01.webp";
import bomba02 from "../../assets/bomba/bomba-02.webp";
import bomba03 from "../../assets/bomba/bomba-03.webp";
import bomba04 from "../../assets/bomba/bomba-04.webp";
import bomba05 from "../../assets/bomba/bomba-05.webp";
import centrifugalPumpCutout from "../../assets/bomba/centrifugal-pump-cutout-v2.png";
import harv01 from "../../assets/harv/harv-01.webp";
import harv02 from "../../assets/harv/harv-02.webp";
import harv03 from "../../assets/harv/harv-03.webp";
import harv04 from "../../assets/harv/harv-04.webp";
import gripper01 from "../../assets/gripper/gripper-01.webp";
import gripperCutout from "../../assets/gripper/gripper-01-cutout.webp";
import gripper02 from "../../assets/gripper/gripper-02.webp";
import gripper03 from "../../assets/gripper/gripper-03.webp";
import gripper04 from "../../assets/gripper/gripper-04.webp";
import pieceMagnetVideo from "../../assets/videos/piece-magnet.mp4";
import pieceMagnetPoster from "../../assets/videos/piece-magnet-poster.webp";
import type { Language, SectionId } from "../i18n.tsx";
import { PROJECT_SLUGS } from "./projectManifest.ts";

type ProjectCopy = {
  /** Headline on the projects grid. */
  title: string;
  /** Compact title shown above the object inside its hangar bay. */
  bayTitle: string;
  /** Longer headline used inside the detail panel. */
  detailTitle: string;
  /** Engineering discipline shown in cards and project telemetry. */
  discipline: string;
  /** Short factual introduction for the project dossier. */
  overview: string;
  /** Compact technical facets shown under the overview. */
  tags: string[];
  /** Captions for the first three process images. */
  process: string[];
  /** Legacy single-column copy; used when the project has no `blocks`. */
  paragraphs?: string[];
};

export type ProjectStatus = "completed" | "in-development";

export type ProjectPeriod = {
  /** ISO year-month, for example `2024-11`. */
  start: string;
  /** ISO year-month. Omit when the project only has a start month. */
  end?: string;
};

type LocalizedText = Record<Language, string>;

/** Where the title sits relative to the image on the landing grid. */
export type ProjectLayout = "left" | "right" | "top" | "bottom";

/** One stacked piece of a rich detail panel, rendered top to bottom. */
export type DetailBlock =
  | { kind: "text"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "figures"; images: string[] }
  | { kind: "video"; src: string; poster?: string }
  | { kind: "link"; href: string; label: string };

/**
 * Source blocks keep language-dependent copy beside shared media and URLs.
 * The public `Project` type is resolved to one language by `projectsFor`.
 */
type LocalizedDetailBlock =
  | { kind: "text"; text: LocalizedText }
  | { kind: "heading"; text: LocalizedText }
  | { kind: "figures"; images: string[] }
  | { kind: "video"; src: string; poster?: string }
  | { kind: "link"; href: string; label: LocalizedText };

/** A project resolved into a single language, ready to render. */
export type Project = ProjectCopy & {
  /** Stable id used to open the detail panel. */
  key: string;
  /** Stable, language-independent URL segment. */
  slug: string;
  image: string;
  layout: ProjectLayout;
  /** Which grid section the card lives under. */
  section: SectionId;
  /** Structured date range, localized at render time. */
  period?: ProjectPeriod;
  /** Explicit lifecycle state. Omit when it has not been confirmed. */
  status?: ProjectStatus;
  /** Interleaved text/image blocks. When present, they replace `paragraphs`. */
  blocks?: DetailBlock[];
};

/** Fields that don't change with language: the same photos and dates either way. */
type SharedFields = {
  key: string;
  slug: string;
  image: string;
  layout: ProjectLayout;
  section: SectionId;
  period?: ProjectPeriod;
  status?: ProjectStatus;
  blocks?: LocalizedDetailBlock[];
};

type ProjectEntry = SharedFields & Record<Language, ProjectCopy>;

// Text and images are sourced from docs/Portfolio.md and Portfolio.docx.
// Copy is localized block-by-block while media and destinations remain shared.
const PLANE_BLOCKS: LocalizedDetailBlock[] = [
  { kind: "figures", images: [plane01] },
  {
    kind: "text",
    text: {
      en: "I built a combustion-powered RC aircraft from the ground up, inspired by the Messerschmitt Bf 109. I was responsible for the empennage, wing box and propulsion analysis.",
      es: "Construí desde cero un avión RC con motor de combustión inspirado en el Messerschmitt Bf 109. Me encargué del desarrollo del empenaje, la caja alar y el análisis de propulsión.",
    },
  },
  { kind: "figures", images: [plane02, plane03] },
  {
    kind: "text",
    text: {
      en: "I simulated the empennage and wing box under their primary loads and performed a separate analysis of the landing gear.",
      es: "Simulé el empenaje y la caja alar bajo sus cargas principales, y realicé un análisis independiente del tren de aterrizaje.",
    },
  },
  { kind: "figures", images: [plane04, plane05, plane06, plane07] },
  {
    kind: "text",
    text: {
      en: "I also simulated the external structure, manufactured from balsa wood and covered with Monokote. For the propulsion study, I analyzed how propeller pitch, diameter and chord related to engine power and fuel consumption.",
      es: "También simulé la estructura exterior, manufacturada con madera balsa y recubierta con Monokote. Para el estudio de propulsión, analicé la relación entre el paso, el diámetro y la cuerda de la hélice, la potencia del motor y el consumo de combustible.",
    },
  },
  { kind: "figures", images: [plane08, plane09] },
  { kind: "figures", images: [plane10, plane11] },
  {
    kind: "text",
    text: {
      en: "The aircraft completed its flight test outside the city without propulsion problems or mechanical failures in any component.",
      es: "El avión completó su prueba de vuelo en las afueras de la ciudad sin problemas de propulsión ni fallas mecánicas en ninguno de sus componentes.",
    },
  },
  { kind: "figures", images: [plane12, plane13] },
];

const CNC_BLOCKS: LocalizedDetailBlock[] = [
  { kind: "figures", images: [cnc01] },
  {
    kind: "text",
    text: {
      en: "I built a CNC lathe from the ground up. I began by studying existing in-house machines, using this video as an initial reference.",
      es: "Construí un torno CNC desde cero. Comencé analizando máquinas desarrolladas internamente y utilicé este video como referencia inicial.",
    },
  },
  {
    kind: "link",
    href: "https://www.youtube.com/watch?v=UzSRKnSuSbM",
    label: {
      en: "Watch the reference video",
      es: "Ver video de referencia",
    },
  },
  {
    kind: "text",
    text: {
      en: "I developed the initial concept, overall dimensions and component architecture.",
      es: "Desarrollé el concepto inicial, las dimensiones generales y la arquitectura de componentes.",
    },
  },
  { kind: "figures", images: [cnc02] },
  {
    kind: "text",
    text: {
      en: "I evaluated material options by balancing assembly, vibration, weight, backlash and manufacturability.",
      es: "Evalué distintas opciones de materiales considerando el ensamble, las vibraciones, el peso, el juego mecánico y la facilidad de manufactura.",
    },
  },
  { kind: "figures", images: [cnc03, cnc04] },
  { kind: "figures", images: [cnc05] },
  {
    kind: "text",
    text: {
      en: "Manufacturing involved a manual mill, a Haas CNC machine, a lathe, a drill press, laser and plasma cutters, and shielded-metal arc welding.",
      es: "La manufactura involucró una fresadora manual, un centro CNC Haas, un torno, un taladro de banco, cortadoras láser y de plasma, y soldadura por arco con electrodo revestido.",
    },
  },
  { kind: "figures", images: [cnc06] },
  { kind: "figures", images: [cnc07, cnc08, cnc09] },
  {
    kind: "text",
    text: {
      en: "Initial tolerances fell outside the target because of vibration. I added 15 kg of silica sand to the machine base, reducing vibration by 24%.",
      es: "Las tolerancias iniciales quedaron fuera del objetivo debido a las vibraciones. Incorporé 15 kg de arena sílica en la base de la máquina y reduje las vibraciones un 24%.",
    },
  },
];

// The md's generic "brushed vs brushless" web diagram is dropped; only Diego's
// own photos, renders, and drawings are kept.
const CAR_BLOCKS: LocalizedDetailBlock[] = [
  { kind: "figures", images: [car01] },
  {
    kind: "text",
    text: {
      en: "The original assignment was to develop a linear motor, but I wanted a greater challenge. During my first semesters of engineering, I decided to build a brushless motor instead.",
      es: "El proyecto original consistía en desarrollar un motor lineal, pero quería un reto mayor. Durante mis primeros semestres de ingeniería, decidí construir un motor brushless.",
    },
  },
  { kind: "figures", images: [car02] },
  {
    kind: "text",
    text: {
      en: "I began with an in-depth study of brushless motor operation and commutation.",
      es: "Comencé con una investigación detallada sobre el funcionamiento y la conmutación de los motores brushless.",
    },
  },
  {
    kind: "text",
    text: {
      en: "Based on that research, I designed and printed the first stator on an Ender 3 V2, integrating bearings, a shaft and the windings.",
      es: "A partir de esa investigación, diseñé e imprimí el primer estator en una Ender 3 V2 e integré los rodamientos, el eje y los devanados.",
    },
  },
  { kind: "figures", images: [car03, car04, car05] },
  {
    kind: "text",
    text: {
      en: "Expecting the motor to provide enough torque, I machined custom 6061-aluminum rims. To improve traction, I also designed PLA tire molds and cast the tires from a controlled mixture of silicone rubber and catalyst.",
      es: "Confiando en que el motor produciría suficiente torque, maquiné rines personalizados en aluminio 6061. Para mejorar la tracción, también diseñé moldes de PLA y fabriqué las llantas con una mezcla controlada de caucho de silicón y catalizador.",
    },
  },
  { kind: "figures", images: [car06] },
  {
    kind: "text",
    text: {
      en: "The vehicle completed the required one-meter run. Because of its weight and the motor's maximum torque, the final test used lightweight PLA wheels.",
      es: "El vehículo completó el recorrido requerido de un metro. Debido al peso y al torque máximo del motor, la prueba final utilizó ruedas ligeras impresas en PLA.",
    },
  },
  { kind: "figures", images: [car07] },
  { kind: "figures", images: [car08] },
  {
    kind: "link",
    href: "https://drive.google.com/drive/folders/1d4yGmu9sEwhqprJoip8Zm3cul2uQznqX",
    label: {
      en: "Watch the test videos",
      es: "Ver videos de prueba",
    },
  },
];

// Text and image grouping follow docs/Portfolio.md project 7 exactly.
const WEARABLE_BLOCKS: LocalizedDetailBlock[] = [
  { kind: "figures", images: [wear01, wear02] },
  {
    kind: "text",
    text: {
      en: "After being offered work collecting egocentric data, I decided to build my own data-collection operation. I developed Holley, a wearable first-person video system built around an Innomaker camera, a Raspberry Pi Zero 2 W, 3D-printed components and normally open buttons.",
      es: "Después de recibir una propuesta para recolectar datos egocéntricos, decidí desarrollar mi propia operación de captura. Creé Holley, un sistema vestible de video en primera persona construido con una cámara Innomaker, una Raspberry Pi Zero 2 W, componentes impresos en 3D y botones normalmente abiertos.",
    },
  },
  { kind: "figures", images: [wear03, wear04] },
  {
    kind: "text",
    text: {
      en: "The camera and Raspberry Pi capture video segments and transfer them to a computer over Wi-Fi. I optimized the transmission format and added thermal management after long sessions revealed excessive heat near the user's head.",
      es: "La cámara y la Raspberry Pi capturan segmentos de video y los transfieren a una computadora mediante Wi-Fi. Optimicé el formato de transmisión y agregué control térmico después de detectar un exceso de calor durante sesiones prolongadas.",
    },
  },
  { kind: "figures", images: [wear05] },
  {
    kind: "text",
    text: {
      en: "The computer reconstructs the incoming segments into an MP4 video. I optimized the pipeline to maintain a stable 30 fps while relocating the Raspberry Pi to the user's belt with a fan and an aluminum heat sink.",
      es: "La computadora reconstruye los segmentos recibidos en un video MP4. Optimicé el sistema para mantener 30 fps estables y reubiqué la Raspberry Pi en el cinturón del usuario, con un ventilador y un disipador de aluminio.",
    },
  },
  {
    kind: "link",
    href: "https://ready2l.com/",
    label: {
      en: "Visit Ready2L",
      es: "Visitar Ready2L",
    },
  },
  { kind: "figures", images: [wear06, wear07] },
];

// docs/Portfolio.docx project 13 ("SO101") — the docx has 4 projects the md
// export dropped; this one keeps the full write-up and its 11 images.
const SO101_BLOCKS: LocalizedDetailBlock[] = [
  { kind: "figures", images: [so101a, so101b, so101c] },
  {
    kind: "text",
    text: {
      en: "I sourced, printed and assembled four SO-101 arms for data collection and model training. I built the entire capture setup: custom tables with different background colors, adjustable LED ring lights and 3D-printed camera mounts.",
      es: "Adquirí, imprimí y ensamblé cuatro brazos SO-101 para recolectar datos y entrenar modelos. Construí todo el entorno de captura: mesas personalizadas con fondos de distintos colores, aros de luz LED ajustables y soportes de cámara impresos en 3D.",
    },
  },
  {
    kind: "text",
    text: {
      en: "I performed an initial stress analysis to identify stress concentrations and determine whether the component could be optimized.",
      es: "Realicé un análisis de esfuerzos inicial para identificar concentraciones de esfuerzo y determinar si el componente podía optimizarse.",
    },
  },
  { kind: "figures", images: [so101d] },
  {
    kind: "text",
    text: {
      en: "I then ran a more complete generative-design study using loads in every axis, derived from a free-body diagram, to prevent the arm from bending under acceleration.",
      es: "Después realicé un estudio de diseño generativo más completo con cargas en todos los ejes, obtenidas mediante un diagrama de cuerpo libre, para evitar que el brazo se flexionara durante la aceleración.",
    },
  },
  { kind: "figures", images: [so101e, so101f] },
  {
    kind: "text",
    text: {
      en: "The optimized geometry reduced the component mass from 50 g to 30 g. Printed in PLA-CF with gyroid infill, the new part was stronger while using 40% less material, increasing the arm's available payload.",
      es: "La geometría optimizada redujo la masa del componente de 50 g a 30 g. Impresa en PLA-CF con relleno giroide, la nueva pieza resultó más resistente y utilizó 40% menos material, aumentando la carga útil disponible del brazo.",
    },
  },
  {
    kind: "text",
    text: {
      en: "Finally, I analyzed the complete arm to quantify the loads transferred to each motor. The two joints with the longest moment arms carried the highest loads, so I upgraded only those motors to 12 V through the step-down converter. The wrist motor remained unchanged because its available torque already exceeded the arm's practical 600 g payload.",
      es: "Finalmente, analicé el brazo completo para cuantificar las cargas transmitidas a cada motor. Las dos articulaciones con el mayor brazo de palanca soportaban los esfuerzos más altos, por lo que actualicé únicamente esos motores a 12 V mediante el convertidor reductor. El motor de la muñeca permaneció sin cambios porque su torque disponible ya superaba la carga práctica de 600 g del brazo.",
    },
  },
  { kind: "figures", images: [so101g] },
];

// docs/Portfolio.docx project 4 ("Bomba centrífuga").
const BOMBA_BLOCKS: LocalizedDetailBlock[] = [
  { kind: "figures", images: [bomba01] },
  {
    kind: "text",
    text: {
      en: "I built a water pump using 3D-printed components, a motor, tubing and a water container. When the original motor failed, I reused its shaft and powered the prototype with a drill.",
      es: "Construí una bomba de agua con componentes impresos en 3D, un motor, mangueras y un depósito. Cuando el motor original falló, reutilicé su eje y accioné el prototipo con un taladro.",
    },
  },
  { kind: "figures", images: [bomba02, bomba03, bomba04] },
  {
    kind: "text",
    text: {
      en: "After studying industrial water pumps, I developed a functional assembly with an impeller, discharge chamber, mechanical seal and bearings.",
      es: "Después de estudiar bombas de agua industriales, desarrollé un conjunto funcional con impulsor, cámara de descarga, sello mecánico y rodamientos.",
    },
  },
  { kind: "figures", images: [bomba05] },
  {
    kind: "text",
    text: {
      en: "The pump achieved a 2 m head, and I characterized its performance using a Venturi apparatus.",
      es: "La bomba alcanzó una altura de bombeo de 2 m y caractericé su desempeño mediante un aparato Venturi.",
    },
  },
];

// docs/Portfolio.docx project 11 ("Harv") — his manufacturing/ERP software.
const HARV_BLOCKS: LocalizedDetailBlock[] = [
  {
    kind: "text",
    text: {
      en: "During an internship in continuous improvement, I analyzed, verified and improved processes across a manufacturing plant. Working directly with operators gave me visibility into every area, from inbound logistics to outbound shipping.",
      es: "Durante una estancia profesional en mejora continua, analicé, verifiqué y mejoré procesos dentro de una planta de manufactura. Trabajar directamente con los operadores me permitió conocer todas las áreas, desde la logística de entrada hasta los embarques de salida.",
    },
  },
  {
    kind: "text",
    text: {
      en: "At first, manufacturing can appear simple: purchase, assemble and sell. In practice, every one of those steps depends on several connected systems.",
      es: "A primera vista, la manufactura puede parecer sencilla: comprar, ensamblar y vender. En la práctica, cada uno de esos pasos depende de varios sistemas conectados.",
    },
  },
  {
    kind: "text",
    text: {
      en: "I found that departments were isolated and operated through separate software. In some cases, three or four engineers were involved in managing the same plant process, creating avoidable duplication and inefficiency.",
      es: "Descubrí que los departamentos estaban aislados y operaban mediante programas distintos. En algunos casos, tres o cuatro ingenieros participaban en la gestión del mismo proceso de planta, generando duplicidad e ineficiencia evitables.",
    },
  },
  {
    kind: "text",
    text: {
      en: "The operation has to function as one connected system: assembly depends on purchasing, painting depends on assembly, and production depends on sales.",
      es: "La operación debe funcionar como un solo sistema conectado: el ensamble depende de las compras, la pintura depende del ensamble y la producción depende de las ventas.",
    },
  },
  {
    kind: "text",
    text: {
      en: "Harv connects the complete manufacturing workflow. Teams define workers, roles, areas, products and production steps; then manage purchasing, receiving, fabrication, storage, production orders, assembly, testing, packing and shipping.",
      es: "Harv conecta el flujo completo de manufactura. Los equipos definen trabajadores, roles, áreas, productos y etapas de producción; después gestionan compras, recepción, fabricación, almacenamiento, órdenes de producción, ensamble, pruebas, empaque y envío.",
    },
  },
  {
    kind: "text",
    text: {
      en: "The system uses sales data to forecast inventory requirements and reduce production interruptions. Its finance area tracks inventory value, cash flow and physical assets.",
      es: "El sistema utiliza datos de ventas para pronosticar requerimientos de inventario y reducir interrupciones de producción. El área financiera registra el valor del inventario, el flujo de efectivo y los activos físicos.",
    },
  },
  {
    kind: "text",
    text: {
      en: "A local Harv agent scans the network and detects available equipment, including 3D printers. In the latest test, it generated production queues for three SO-101 arms, sent jobs directly to the printers and reported completion. With automated build-plate removal, the same workflow could support continuous 24-hour production.",
      es: "Un agente local de Harv analiza la red y detecta automáticamente los equipos disponibles, incluidas las impresoras 3D. En la prueba más reciente, generó las colas de producción para tres brazos SO-101, envió los trabajos directamente a las impresoras y notificó su finalización. Con extracción automática de la placa de impresión, el mismo flujo podría mantener una producción continua durante las 24 horas.",
    },
  },
  { kind: "figures", images: [harv01, harv02, harv03, harv04] },
];

// docs/Portfolio.docx — the "Gripper intercambiable" concept, split out of the
// SO101 write-up into its own project.
const GRIPPER_BLOCKS: LocalizedDetailBlock[] = [
  {
    kind: "text",
    text: {
      en: "After more than 200 hours teleoperating robotic arms—and roughly 400 additional hours accumulated by friends and other operators—I concluded that we are still far from having a robot that is genuinely useful inside a home.",
      es: "Después de más de 200 horas teleoperando brazos robóticos —además de aproximadamente 400 horas acumuladas por amigos y otros operadores— concluí que todavía estamos lejos de tener un robot verdaderamente útil dentro de un hogar.",
    },
  },
  {
    kind: "text",
    text: {
      en: "Combining that experience with my previous work in teleoperation and egocentric data collection led to a simpler idea: allow the robot to use a gripper designed for a specific family of tasks.",
      es: "Al combinar esa experiencia con mi trabajo previo en teleoperación y recolección de datos egocéntricos, llegué a una idea más sencilla: permitir que el robot utilice un gripper diseñado para una familia específica de tareas.",
    },
  },
  {
    kind: "text",
    text: {
      en: "A kitchen illustrates the opportunity. Towels, sponges, spatulas, ladles and serving utensils cover a large share of common interactions. After studying those interactions, I found that many tasks depend on a relatively small set of tools.",
      es: "Una cocina ilustra esta oportunidad. Trapos, esponjas, espátulas, cucharones y utensilios para servir cubren una gran parte de las interacciones cotidianas. Después de estudiar esas interacciones, descubrí que muchas tareas dependen de un conjunto relativamente pequeño de herramientas.",
    },
  },
  {
    kind: "text",
    text: {
      en: "With a conventional robotic gripper, much of the motion is spent simply holding a tool and maintaining pressure. The remaining rotations and contact dynamics make the overall operation unnecessarily complex.",
      es: "Con un gripper robótico convencional, gran parte del movimiento se utiliza únicamente para sostener una herramienta y mantener presión. Las rotaciones y dinámicas de contacto restantes vuelven la operación innecesariamente compleja.",
    },
  },
  {
    kind: "text",
    text: {
      en: "Consider asking a robot to pick up a ladle, serve soup, move a pot or turn over a piece of food. Performing those actions precisely with a conventional gripper is extremely difficult.",
      es: "Consideremos pedirle a un robot que tome un cucharón, sirva sopa, mueva una olla o voltee un alimento. Ejecutar esas acciones con precisión mediante un gripper convencional es extremadamente difícil.",
    },
  },
  {
    kind: "text",
    text: {
      en: "A held tool also introduces an external moment arm. If a user substitutes a longer utensil, the added torque may exceed the actuator's design load and can damage the motor.",
      es: "Una herramienta sostenida también introduce un brazo de palanca externo. Si el usuario sustituye el utensilio por uno más largo, el torque adicional puede superar la carga de diseño del actuador y dañar el motor.",
    },
  },
  {
    kind: "text",
    text: {
      en: "That observation led to the central idea: an interchangeable gripper system.",
      es: "Esa observación dio origen a la idea central: un sistema de grippers intercambiables.",
    },
  },
  {
    kind: "text",
    text: {
      en: "My first concept used a switchable permanent magnet connected to a servomotor. The servo would rotate the magnetic circuit to attract a tool and rotate it back to release the tool.",
      es: "Mi primer concepto utilizaba un imán permanente conmutable conectado a un servomotor. El servo giraría el circuito magnético para atraer una herramienta y volvería a girarlo para liberarla.",
    },
  },
  {
    kind: "text",
    text: {
      en: "The mechanism proved too complex, and its magnetic force was insufficient to attract and securely hold the mating gripper, spoon or ladle.",
      es: "El mecanismo resultó demasiado complejo y su fuerza magnética no era suficiente para atraer y sostener con seguridad el gripper, la cuchara o el cucharón acoplado.",
    },
  },
  {
    kind: "text",
    text: {
      en: "After evaluating alternatives, I selected electropermanent magnets. They require no continuous current to remain engaged and need only a short electrical pulse to release a mounted tool.",
      es: "Después de evaluar distintas alternativas, seleccioné imanes electropermanentes. No requieren corriente continua para permanecer acoplados y sólo necesitan un pulso eléctrico breve para liberar la herramienta instalada.",
    },
  },
  {
    kind: "text",
    text: {
      en: "As a result, the energy required for a gripper change would be minimal.",
      es: "Como resultado, la energía necesaria para realizar un cambio de gripper sería mínima.",
    },
  },
  {
    kind: "text",
    text: {
      en: "Energy efficiency is only one benefit. When teleoperating a robot to turn over food, motion becomes significantly easier and more controlled when the spatula itself is the attached end effector.",
      es: "La eficiencia energética es sólo una de las ventajas. Al teleoperar un robot para voltear alimentos, el movimiento resulta mucho más sencillo y controlado cuando la propia espátula funciona como efector final.",
    },
  },
  {
    kind: "text",
    text: {
      en: "This approach could change how domestic robots are designed by supporting a practical set of grippers for different task families.",
      es: "Este enfoque podría cambiar la forma de diseñar robots domésticos al permitir un conjunto práctico de grippers para distintas familias de tareas.",
    },
  },
  {
    kind: "text",
    text: {
      en: "Many of the necessary tools already exist in the home. Instead of requiring entirely new products, common spoons, ladles, spatulas, sponges and cloths could be adapted for robotic use.",
      es: "Muchas de las herramientas necesarias ya existen en el hogar. En lugar de exigir productos completamente nuevos, cucharas, cucharones, espátulas, esponjas y trapos comunes podrían adaptarse para uso robótico.",
    },
  },
  {
    kind: "text",
    text: {
      en: "Existing utensils could be converted, while new robot owners could choose compatible tools or adapt the ones they already have.",
      es: "Los utensilios existentes podrían convertirse, mientras que los nuevos usuarios de robots podrían elegir herramientas compatibles o adaptar las que ya poseen.",
    },
  },
  {
    kind: "text",
    text: {
      en: "This creates the possibility of a tool ecosystem: one gripper for cleaning glass without scratching it, another for bathroom cleaning, another for cooking and a general-purpose option.",
      es: "Esto abre la posibilidad de crear un ecosistema de herramientas: un gripper para limpiar vidrio sin rayarlo, otro para el baño, otro para cocinar y una opción de uso general.",
    },
  },
  {
    kind: "text",
    text: {
      en: "The concept does not require a separate gripper for every individual action. A tool dedicated only to lifting one screw, for example, would add complexity without meaningful value.",
      es: "El concepto no requiere un gripper distinto para cada acción individual. Una herramienta dedicada únicamente a levantar un tornillo, por ejemplo, añadiría complejidad sin aportar un valor significativo.",
    },
  },
  {
    kind: "text",
    text: {
      en: "The objective is to group tasks that are difficult for a conventional gripper. The robot could retain a general-purpose gripper for folding clothes or moving objects, then change tools only when a task requires a specialized function.",
      es: "El objetivo es agrupar las tareas difíciles de realizar con un gripper convencional. El robot podría conservar una pinza de uso general para doblar ropa o mover objetos y cambiar de herramienta únicamente cuando una tarea requiera una función especializada.",
    },
  },
  {
    kind: "text",
    text: {
      en: "With a conventional gripper, the robot must learn where to grasp a spoon, how much force to apply, how to position its fingers and how to prevent slipping. This may demand stronger actuators, higher energy consumption and more complex contact control.",
      es: "Con un gripper convencional, el robot debe aprender dónde sujetar una cuchara, cuánta fuerza aplicar, cómo posicionar los dedos y cómo evitar deslizamientos. Esto puede exigir actuadores más potentes, mayor consumo de energía y un control de contacto más complejo.",
    },
  },
  {
    kind: "text",
    text: {
      en: "Every added manipulation requirement increases the amount of training data needed.",
      es: "Cada requisito adicional de manipulación aumenta la cantidad de datos de entrenamiento necesarios.",
    },
  },
  {
    kind: "text",
    text: {
      en: "With this system, the robot would move to a tool station, release its current gripper, attach the next one and continue with the task.",
      es: "Con este sistema, el robot se desplazaría a una estación de herramientas, liberaría el gripper actual, acoplaría el siguiente y continuaría con la tarea.",
    },
  },
  {
    kind: "text",
    text: {
      en: "Tool changes could be guided entirely by vision. I have tested the concept in simulation, but the vision system has not yet been integrated. Physical validation with the electropermanent magnets is the next development step.",
      es: "Los cambios de herramienta podrían guiarse completamente mediante visión. Ya probé el concepto en simulación, pero todavía no he integrado el sistema de visión. La validación física con los imanes electropermanentes es la siguiente etapa de desarrollo.",
    },
  },
  {
    kind: "text",
    text: {
      en: "The projected cost of the mechanism is below USD 20 and may be significantly lower at scale.",
      es: "El costo estimado del mecanismo es inferior a USD 20 y podría reducirse considerablemente a escala.",
    },
  },
  {
    kind: "text",
    text: {
      en: "A low-cost system that simplifies motion, reduces data requirements and lets robots use task-specific tools could make capable domestic robotics substantially more practical.",
      es: "Un sistema económico que simplifique el movimiento, reduzca los requisitos de datos y permita utilizar herramientas específicas para cada tarea podría hacer que la robótica doméstica funcional sea mucho más práctica.",
    },
  },
  {
    kind: "heading",
    text: { en: "Latest design", es: "Diseño más reciente" },
  },
  { kind: "figures", images: [gripper01, gripper02, gripper03, gripper04] },
  { kind: "video", src: pieceMagnetVideo, poster: pieceMagnetPoster },
];

const ENTRIES: ProjectEntry[] = [
  {
    key: "aircraft",
    slug: PROJECT_SLUGS.aircraft,
    layout: "top",
    section: "hardware",
    image: rcAircraft,
    period: { start: "2024-11", end: "2024-12" },
    status: "completed",
    blocks: PLANE_BLOCKS,
    en: {
      title: "Combustion-Powered RC Aircraft",
      bayTitle: "RC aircraft",
      detailTitle: "Messerschmitt Bf 109–Inspired Combustion-Powered RC Aircraft",
      discipline: "Aeronautics",
      overview:
        "A combustion-powered RC aircraft developed through structural analysis, propulsion studies, manufacturing and flight testing.",
      tags: ["Design", "Manufacturing", "Testing"],
      process: ["Process", "Structural analysis", "Aerodynamics"],
    },
    es: {
      title: "Avión RC con motor de combustión",
      bayTitle: "Avión RC",
      detailTitle: "Avión RC con motor de combustión inspirado en el Messerschmitt Bf 109",
      discipline: "Aeronáutica",
      overview:
        "Un avión RC con motor de combustión desarrollado mediante análisis estructural, estudios de propulsión, manufactura y pruebas de vuelo.",
      tags: ["Diseño", "Manufactura", "Pruebas"],
      process: ["Proceso", "Análisis estructural", "Aerodinámica"],
    },
  },
  {
    key: "cnc",
    slug: PROJECT_SLUGS.cnc,
    layout: "top",
    section: "hardware",
    image: cncLathe,
    period: { start: "2026-03", end: "2026-06" },
    status: "completed",
    blocks: CNC_BLOCKS,
    en: {
      title: "CNC Lathe Built from Scratch",
      bayTitle: "Custom CNC lathe",
      detailTitle: "In-House CNC Lathe: Design, Manufacturing and Vibration Control",
      discipline: "Mechanical engineering",
      overview:
        "An in-house CNC lathe designed and manufactured from the ground up, with vibration reduced by 24% using a silica-sand-filled base.",
      tags: ["Design", "Manufacturing", "Validation"],
      process: ["Concept", "Fabrication", "Vibration control"],
    },
    es: {
      title: "Torno CNC construido desde cero",
      bayTitle: "Torno CNC",
      detailTitle: "Torno CNC: diseño, manufactura y control de vibraciones",
      discipline: "Ingeniería mecánica",
      overview:
        "Un torno CNC diseñado y manufacturado desde cero, con una reducción de vibraciones del 24% mediante una base rellena de arena sílica.",
      tags: ["Diseño", "Manufactura", "Validación"],
      process: ["Concepto", "Fabricación", "Control de vibraciones"],
    },
  },
  {
    key: "so101",
    slug: PROJECT_SLUGS.so101,
    layout: "top",
    section: "hardware",
    image:so101RoboticArm,
    blocks: SO101_BLOCKS,
    en: {
      title: "SO-101 Robotic Learning Platform",
      bayTitle: "SO-101 robotic arm",
      detailTitle: "SO-101 Multi-Arm Learning and Data-Capture Platform",
      discipline: "Robotics",
      overview:
        "A four-arm SO-101 platform built for teleoperation and data collection, with custom workstations and structurally optimized components.",
      tags: ["Robotics", "Simulation", "Data"],
      process: ["Assembly", "Stress analysis", "Optimization"],
    },
    es: {
      title: "Plataforma de aprendizaje robótico SO-101",
      bayTitle: "Brazo robótico SO-101",
      detailTitle: "Plataforma multibrazo SO-101 para aprendizaje y captura de datos",
      discipline: "Robótica",
      overview:
        "Una plataforma de cuatro brazos SO-101 construida para teleoperación y recolección de datos, con estaciones personalizadas y componentes optimizados estructuralmente.",
      tags: ["Robótica", "Simulación", "Datos"],
      process: ["Ensamble", "Análisis de esfuerzos", "Optimización"],
    },
  },
  {
    key: "gripper",
    slug: PROJECT_SLUGS.gripper,
    layout: "top",
    section: "hardware",
    image: gripperCutout,
    status: "in-development",
    blocks: GRIPPER_BLOCKS,
    en: {
      title: "Interchangeable Robotic Gripper System",
      bayTitle: "Interchangeable gripper",
      detailTitle: "Interchangeable Gripper System for Domestic Robotics",
      discipline: "Robotic tooling",
      overview:
        "A low-cost interchangeable tool concept designed to simplify domestic manipulation tasks and reduce training-data requirements.",
      tags: ["Tooling", "Prototyping", "Teleoperation"],
      process: ["Concept", "Tool system", "Latest design"],
    },
    es: {
      title: "Sistema de grippers robóticos intercambiables",
      bayTitle: "Gripper intercambiable",
      detailTitle: "Sistema de grippers intercambiables para robótica doméstica",
      discipline: "Herramientas robóticas",
      overview:
        "Un concepto económico de herramientas intercambiables diseñado para simplificar tareas domésticas de manipulación y reducir los requisitos de datos de entrenamiento.",
      tags: ["Herramientas", "Prototipado", "Teleoperación"],
      process: ["Concepto", "Sistema de herramientas", "Diseño reciente"],
    },
  },
  {
    key: "wearable",
    slug: PROJECT_SLUGS.wearable,
    layout: "top",
    section: "hardware",
    image: wearableCollector,
    status: "completed",
    blocks: WEARABLE_BLOCKS,
    en: {
      title: "Holley Wearable Robotics Data Collector",
      bayTitle: "Wearable data collector",
      detailTitle: "Holley: Wearable Egocentric Data Collection for Robotics",
      discipline: "Egocentric data",
      overview:
        "A wearable first-person capture system built with a Raspberry Pi Zero 2 W and an Innomaker camera, optimized for stable collection at 30 fps.",
      tags: ["Hardware", "Computer vision", "Data"],
      process: ["Hardware", "Capture pipeline", "Deployment"],
    },
    es: {
      title: "Holley: recolector vestible de datos para robótica",
      bayTitle: "Recolector de datos",
      detailTitle: "Holley: recolección vestible de datos egocéntricos para robótica",
      discipline: "Datos egocéntricos",
      overview:
        "Un sistema vestible de captura en primera persona construido con una Raspberry Pi Zero 2 W y una cámara Innomaker, optimizado para recolectar datos estables a 30 fps.",
      tags: ["Hardware", "Visión", "Datos"],
      process: ["Hardware", "Captura", "Implementación"],
    },
  },
  {
    key: "car",
    slug: PROJECT_SLUGS.car,
    layout: "top",
    section: "hardware",
    image: brushlessMotorCar,
    period: { start: "2021-11", end: "2021-12" },
    status: "completed",
    blocks: CAR_BLOCKS,
    en: {
      title: "Custom Brushless-Motor Vehicle",
      bayTitle: "Brushless-motor vehicle",
      detailTitle: "Custom Brushless Motor and Vehicle Platform",
      discipline: "Electromechanical engineering",
      overview:
        "A hand-built vehicle powered by a custom brushless motor, developed through iterative stator design, machined aluminum rims and custom tire molds.",
      tags: ["Powertrain", "Fabrication", "Testing"],
      process: ["Motor", "Wheels", "Road test"],
    },
    es: {
      title: "Vehículo personalizado con motor brushless",
      bayTitle: "Vehículo brushless",
      detailTitle: "Motor brushless y plataforma vehicular personalizados",
      discipline: "Ingeniería electromecánica",
      overview:
        "Un vehículo construido a mano y propulsado por un motor brushless personalizado, desarrollado mediante iteraciones del estator, rines de aluminio maquinados y moldes propios para las llantas.",
      tags: ["Tren motriz", "Fabricación", "Pruebas"],
      process: ["Motor", "Ruedas", "Prueba de recorrido"],
    },
  },
  {
    key: "bomba",
    slug: PROJECT_SLUGS.bomba,
    layout: "top",
    section: "hardware",
    image: centrifugalPumpCutout,
    period: { start: "2021-11", end: "2021-12" },
    status: "completed",
    blocks: BOMBA_BLOCKS,
    en: {
      title: "Centrifugal Water Pump",
      bayTitle: "Centrifugal pump",
      detailTitle: "3D-Printed Centrifugal Water Pump",
      discipline: "Fluid systems",
      overview:
        "A functional 3D-printed centrifugal pump that achieved a 2 m pumping head and was characterized using a Venturi apparatus.",
      tags: ["Fluids", "Design", "Testing"],
      process: ["Design", "Impeller", "Performance"],
    },
    es: {
      title: "Bomba centrífuga de agua",
      bayTitle: "Bomba centrífuga",
      detailTitle: "Bomba centrífuga de agua fabricada mediante impresión 3D",
      discipline: "Sistemas de fluidos",
      overview:
        "Una bomba centrífuga funcional fabricada mediante impresión 3D, capaz de alcanzar una altura de bombeo de 2 m y caracterizada mediante un aparato Venturi.",
      tags: ["Fluidos", "Diseño", "Pruebas"],
      process: ["Diseño", "Impulsor", "Rendimiento"],
    },
  },
  {
    key: "harv",
    slug: PROJECT_SLUGS.harv,
    layout: "top",
    section: "software",
    image: harv01,
    blocks: HARV_BLOCKS,
    en: {
      title: "Harv — Manufacturing ERP",
      bayTitle: "Harv manufacturing ERP",
      detailTitle: "Harv: Connected Manufacturing ERP",
      discipline: "Manufacturing software",
      overview:
        "A connected manufacturing ERP that integrates purchasing, production, inventory, finance and automated equipment discovery into a single workflow.",
      tags: ["Workflow", "Automation", "Analytics"],
      process: ["Operations", "Production", "Finance"],
    },
    es: {
      title: "Harv — ERP de manufactura",
      bayTitle: "Harv ERP de manufactura",
      detailTitle: "Harv: ERP de manufactura conectado",
      discipline: "Software de manufactura",
      overview:
        "Un ERP de manufactura conectado que integra compras, producción, inventario, finanzas y detección automatizada de equipos dentro de un solo flujo de trabajo.",
      tags: ["Flujo", "Automatización", "Analítica"],
      process: ["Operaciones", "Producción", "Finanzas"],
    },
  },
];

function resolveBlocks(
  blocks: LocalizedDetailBlock[] | undefined,
  language: Language,
): DetailBlock[] | undefined {
  return blocks?.map((block) => {
    if (block.kind === "text" || block.kind === "heading") {
      return { ...block, text: block.text[language] };
    }
    if (block.kind === "link") {
      return { ...block, label: block.label[language] };
    }
    return block;
  });
}

function validateEntries(entries: ProjectEntry[]): void {
  const keys = new Set<string>();
  const slugs = new Set<string>();

  entries.forEach((entry) => {
    if (keys.has(entry.key)) throw new Error(`Duplicate project key: ${entry.key}`);
    if (slugs.has(entry.slug)) throw new Error(`Duplicate project slug: ${entry.slug}`);
    keys.add(entry.key);
    slugs.add(entry.slug);

    (["en", "es"] as const).forEach((language) => {
      const copy = entry[language];
      const required = [
        copy.title,
        copy.bayTitle,
        copy.detailTitle,
        copy.discipline,
        copy.overview,
        ...copy.tags,
        ...copy.process,
      ];
      if (required.some((value) => value.trim().length === 0)) {
        throw new Error(`Incomplete ${language} copy for project: ${entry.key}`);
      }
      if (copy.process.length !== 3) {
        throw new Error(`Project ${entry.key} needs exactly three ${language} process labels`);
      }
    });

    entry.blocks?.forEach((block, index) => {
      if (block.kind === "text" || block.kind === "heading") {
        if (!block.text.en.trim() || !block.text.es.trim()) {
          throw new Error(`Incomplete localized block ${index} in project: ${entry.key}`);
        }
      }
      if (block.kind === "link" && (!block.label.en.trim() || !block.label.es.trim())) {
        throw new Error(`Incomplete localized link ${index} in project: ${entry.key}`);
      }
    });
  });
}

validateEntries(ENTRIES);

export function projectsFor(language: Language): Project[] {
  return ENTRIES.map((entry) => ({
    key: entry.key,
    slug: entry.slug,
    image: entry.image,
    layout: entry.layout,
    section: entry.section,
    period: entry.period,
    status: entry.status,
    blocks: resolveBlocks(entry.blocks, language),
    ...entry[language],
  }));
}
