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
import harv01 from "../../assets/harv/harv-01.webp";
import harv02 from "../../assets/harv/harv-02.webp";
import harv03 from "../../assets/harv/harv-03.webp";
import harv04 from "../../assets/harv/harv-04.webp";
import gripper01 from "../../assets/gripper/gripper-01.webp";
import gripper02 from "../../assets/gripper/gripper-02.webp";
import gripper03 from "../../assets/gripper/gripper-03.webp";
import gripper04 from "../../assets/gripper/gripper-04.webp";
import type { Language, SectionId } from "../i18n.tsx";

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
  /** Which grid section the card lives under. */
  section: SectionId;
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
  section: SectionId;
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

// docs/Portfolio.docx project 4 ("Bomba centrífuga").
const BOMBA_BLOCKS: DetailBlock[] = [
  { kind: "figures", images: [bomba01] },
  {
    kind: "text",
    text: "Hice una bomba de agua, con impresión 3D, un motor que se terminó quemando (pero el eje sirvió para meterle un taladro), manguera y un garrafón.",
  },
  { kind: "figures", images: [bomba02, bomba03, bomba04] },
  {
    kind: "text",
    text: "Entendiendo las bombas de agua industriales, logré diseñar algo que funcionaba: un impulsor, una cámara de descarga, un sello mecánico y rodamientos.",
  },
  { kind: "figures", images: [bomba05] },
  {
    kind: "text",
    text: "Logré alcanzar una altura de bombeo de 2 metros, y analizar las propiedades de mi bomba con un aparato de venturi.",
  },
];

// docs/Portfolio.docx project 11 ("Harv") — his manufacturing/ERP software.
const HARV_BLOCKS: DetailBlock[] = [
  {
    kind: "text",
    text: "Durante mi internship como practicante de mejora continua, estuve a cargo de analizar, verificar y mejorar los procesos actuales dentro de la planta de manufactura. Dentro de esta tuve la oportunidad de conocer todas las áreas, desde logística-recepción hasta logística-salida, de la mano de los operadores.",
  },
  {
    kind: "text",
    text: "Así me di cuenta de que tener una planta de manufactura puede ser más fácil de lo que llegamos a pensar: compras, ensamblas, vendes, ¿cierto?",
  },
  {
    kind: "text",
    text: "El problema surgió cuando me di cuenta de que las áreas están completamente apartadas del resto, cada una operando con su propio software. Lo que me generó mucho conflicto: de 3 a 4 ingenieros operando el mismo proceso de la planta, totalmente ineficiente.",
  },
  {
    kind: "text",
    text: "Al final todo debe estar ligado: no puedes ensamblar si no compras, no puedes pintar si no ensamblas, no puedes producir si no vendes.",
  },
  {
    kind: "text",
    text: "Harv es un software extremadamente completo y complejo. El flujo es así: agregas a tus trabajadores y defines roles y áreas, agregas tus productos, agregas los pasos para el producto final, generas compras, recibes, fabricas en planta, almacenas, generas órdenes de producción en base a tiempos de entrega y volumen de ventas, ensamblas, pruebas, empacas y envías.",
  },
  {
    kind: "text",
    text: "Todo conectado, predice en base a ventas para mantener inventario y nunca parar líneas de producción. Además está implementada un área de finanzas: puedes ver tu valor de mercancía, tu cashflow y el valor de activos físicos.",
  },
  {
    kind: "text",
    text: "Un feature increíble es que Harv trabaja con un agente local que analiza tu red y detecta automáticamente el equipo que tengas, por ejemplo impresoras 3D. El último test que se hizo fue imprimir 3 brazos SO101: genera las colas de producción, envía directamente a las impresoras y te avisa cuando hayan terminado, recolectas y sigue (este proceso se puede automatizar con extracción de placa de la impresora 3D automáticamente) y tendrías impresoras trabajando las 24 horas del día sin preocuparte, solo recolectando.",
  },
  {
    kind: "link",
    href: "https://github.com/diego-bau3/harv",
    label: "Ver el código en GitHub",
  },
  { kind: "figures", images: [harv01, harv02, harv03, harv04] },
];

// docs/Portfolio.docx — the "Gripper intercambiable" concept, split out of the
// SO101 write-up into its own project.
const GRIPPER_BLOCKS: DetailBlock[] = [
  {
    kind: "text",
    text: "Durante la teleoperación de todos estos brazos robóticos, en la que yo calculo que he invertido más de 200 horas operando, además de otras 400 horas entre amigos y personas curiosas, descubrí que todavía estamos muy lejos de tener un robot que sea realmente funcional dentro de una casa.",
  },
  {
    kind: "text",
    text: "Combinando esta experiencia con lo que hice anteriormente, que era la recolección de datos mediante un modelo de operación y captura egocéntrica, descubrí que todo sería muchísimo más sencillo si el robot pudiera utilizar directamente un gripper diseñado para realizar cada acción.",
  },
  {
    kind: "text",
    text: "Por ejemplo, pensemos en una cocina. Ahí utilizamos un trapo, una esponja para lavar los trastes, una espátula, un cucharón y diferentes utensilios para servir ensaladas o pastas. Después de analizar a fondo las principales interacciones que ocurren dentro de una cocina, me di cuenta de que una gran parte de ellas depende de muy pocas herramientas.",
  },
  {
    kind: "text",
    text: "Cuando recolectas datos utilizando una mano robótica con un gripper convencional, una parte importante del movimiento se utiliza solamente para sostener la herramienta y hacer presión sobre ella. Todavía quedan algunos movimientos rotativos, pero toda la operación se vuelve increíblemente compleja.",
  },
  {
    kind: "text",
    text: "Por ejemplo, imagina que quiero que mi robot agarre un cucharón, recoja sopa, mueva la olla o voltee una pechuga. Con un gripper convencional, hacerlo de manera precisa es extremadamente difícil.",
  },
  {
    kind: "text",
    text: "Además, cuando el robot sostiene una herramienta, se genera un brazo de palanca que queda fuera de nuestro control. Si alguien utiliza una herramienta diferente a la establecida, como una pala de madera más larga, podría generar un esfuerzo para el que el motor no está preparado y, en el peor de los casos, llegar a quemarlo.",
  },
  {
    kind: "text",
    text: "De ahí surgió mi idea: ¿por qué no tener un sistema de grippers intercambiables?",
  },
  {
    kind: "text",
    text: "Al principio pensé en utilizar un switch magnético. Este tipo de mecanismo cambia la dirección de un campo magnético, así que mi idea inicial era colocar un sistema magnético conectado a un servomotor. El servo giraría el mecanismo para atraer un gripper por medio de imanes y después volvería a girarlo para soltarlo.",
  },
  {
    kind: "text",
    text: "Sin embargo, esta solución resultó demasiado compleja. La fuerza generada por el campo magnético no era suficiente para atraer y sostener correctamente el otro lado del gripper, una cuchara o un cucharón.",
  },
  {
    kind: "text",
    text: "Después de analizar diferentes alternativas, encontré los imanes electropermanentes. Estos imanes no necesitan corriente eléctrica para mantenerse activados y conservar una herramienta montada. Además, para desactivarlos solamente necesitan recibir un pulso eléctrico.",
  },
  {
    kind: "text",
    text: "Esto significa que el consumo de energía necesario para cambiar de gripper sería mínimo.",
  },
  {
    kind: "text",
    text: "Pero la ventaja no está solamente en el consumo de energía. Al momento de teleoperar el robot para voltear una hamburguesa, un pan o una pieza de pollo, el movimiento resulta muchísimo más fácil y controlado cuando el robot utiliza directamente una espátula adaptada como gripper.",
  },
  {
    kind: "text",
    text: "Creo que este sistema podría cambiar por completo la forma en la que vemos a los robots domésticos, porque permitiría tener grippers para una gran variedad de tareas.",
  },
  {
    kind: "text",
    text: "Además, muchas de estas herramientas ya existen. Una persona ya compra cucharas, cucharones, espátulas, esponjas o trapos para su casa. No se trata de venderle algo adicional que no necesita, sino de adaptar objetos que ya utiliza para que también puedan ser manipulados por su robot.",
  },
  {
    kind: "text",
    text: "Si ya tienes utensilios, podrías adaptarlos. Si compras un robot nuevo, podrías adquirir herramientas compatibles o convertir las que ya tienes.",
  },
  {
    kind: "text",
    text: "De esta forma se podría crear todo un ecosistema de herramientas. Podrías tener un gripper para limpiar vidrios sin rayarlos, otro para lavar el baño, otro para cocinar y otro para realizar tareas generales.",
  },
  {
    kind: "text",
    text: "Esto tampoco significa que deba existir un gripper diferente para cada acción. No tendría sentido tener uno exclusivamente para levantar un tornillo y otro para mover un objeto pequeño.",
  },
  {
    kind: "text",
    text: "La idea es agrupar las tareas que son difíciles de realizar con una pinza convencional. El robot podría conservar un gripper normal para acciones como doblar ropa, mover objetos o limpiar determinadas superficies, pero podría cambiar de herramienta cuando una tarea requiera una función más especializada.",
  },
  {
    kind: "text",
    text: "Con un gripper convencional, el robot necesita aprender cómo tomar una cuchara, con qué fuerza sostenerla, en qué posición colocar los dedos y cómo evitar que se deslice. También es necesario reducir la fricción, aumentar la fuerza de los motores y consumir más energía.",
  },
  {
    kind: "text",
    text: "Todo esto se traduce en una mayor cantidad de datos de entrenamiento.",
  },
  {
    kind: "text",
    text: "Con mi sistema, el robot solamente tendría que llegar a la estación de herramientas, soltar el gripper actual, tomar uno nuevo y continuar con la siguiente tarea.",
  },
  {
    kind: "text",
    text: "El cambio de grippers podría realizarse completamente mediante visión. Actualmente ya he probado el concepto en simulación, aunque todavía no he integrado el sistema de visión. También estoy esperando recibir los imanes electropermanentes para confirmar físicamente que el mecanismo funciona como espero.",
  },
  {
    kind: "text",
    text: "Lo que más me entusiasma es que este sistema podría costar menos de $20, posiblemente muchísimo menos.",
  },
  {
    kind: "text",
    text: "Si podemos incorporar una solución tan económica dentro de un robot, simplificar sus movimientos, reducir la cantidad de datos que necesita y permitirle utilizar herramientas diseñadas específicamente para cada tarea, creo que realmente podríamos cambiar el mundo.",
  },
  { kind: "heading", text: "Último diseño" },
  { kind: "figures", images: [gripper01, gripper02, gripper03, gripper04] },
];

const ENTRIES: ProjectEntry[] = [
  {
    key: "aircraft",
    layout: "top",
    section: "hardware",
    image:rcAircraft,
    date: "Noviembre – Diciembre 2024",
    blocks: PLANE_BLOCKS,
    en: {
      title: "Combustion-Powered RC Aircraft",
      detailTitle: "Messerschmitt Bf 109 escalado a motor de combustión",
    },
    es: {
      title: "Avión RC con motor de combustión",
      detailTitle: "Messerschmitt Bf 109 escalado a motor de combustión",
    },
  },
  {
    key: "cnc",
    layout: "top",
    section: "hardware",
    image:cncLathe,
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
    key: "so101",
    layout: "top",
    section: "hardware",
    image:so101RoboticArm,
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
  {
    key: "gripper",
    layout: "top",
    section: "hardware",
    image: gripper01,
    blocks: GRIPPER_BLOCKS,
    en: {
      title: "Interchangeable Gripper System",
      detailTitle: "Gripper intercambiable",
    },
    es: {
      title: "Sistema de gripper intercambiable",
      detailTitle: "Gripper intercambiable",
    },
  },
  {
    key: "wearable",
    layout: "top",
    section: "hardware",
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
    key: "car",
    layout: "top",
    section: "hardware",
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
    key: "bomba",
    layout: "top",
    section: "hardware",
    image: bomba01,
    date: "Noviembre – Diciembre 2021",
    blocks: BOMBA_BLOCKS,
    en: {
      title: "Centrifugal Water Pump",
      detailTitle: "Bomba centrífuga",
    },
    es: {
      title: "Bomba centrífuga",
      detailTitle: "Bomba centrífuga",
    },
  },
  {
    key: "harv",
    layout: "top",
    section: "software",
    image: harv01,
    blocks: HARV_BLOCKS,
    en: {
      title: "Harv — Manufacturing ERP",
      detailTitle: "Harv",
    },
    es: {
      title: "Harv — ERP de manufactura",
      detailTitle: "Harv",
    },
  },
];

export function projectsFor(language: Language): Project[] {
  return ENTRIES.map((entry) => ({
    key: entry.key,
    image: entry.image,
    layout: entry.layout,
    section: entry.section,
    date: entry.date,
    blocks: entry.blocks,
    ...entry[language],
  }));
}
