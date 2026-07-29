import brushlessMotorCar from "../../assets/brushless-motor-car.webp";
import cncLathe from "../../assets/cnc-lathe.webp";
import rcAircraft from "../../assets/rc-aircraft-cutout.webp";
import so101RoboticArm from "../../assets/so101-robotic-arm.webp";
import wearableCollector from "../../assets/wearable-collector.webp";
import type { Language } from "../i18n.tsx";

type ProjectCopy = {
  /** Headline on the projects grid. */
  title: string;
  /** Longer headline used inside the detail panel. */
  detailTitle: string;
  paragraphs: string[];
};

/** Where the title sits relative to the image on the landing grid. */
export type ProjectLayout = "left" | "right" | "top" | "bottom";

/** A project resolved into a single language, ready to render. */
export type Project = ProjectCopy & {
  /** Stable id used to open the detail panel. */
  key: string;
  image: string;
  layout: ProjectLayout;
};

type ProjectEntry = { key: string; image: string; layout: ProjectLayout } &
  Record<Language, ProjectCopy>;

const ENTRIES: ProjectEntry[] = [
  {
    key: "cnc",
    layout: "top",
    image: cncLathe,
    en: {
      title: "CNC Lathe from Scratch",
      detailTitle: "Custom In-House CNC Lathe",
      paragraphs: [
        "I worked on a custom in-house CNC lathe built for Ball Joint production. The project combined mechanical design, manufacturing, electronics, machining tests, quality control, and process validation.",
        "The challenge was proving that the machine could do more than move. It had to be evaluated as a manufacturing system: stiffness, vibration, alignment, dimensional accuracy, repeatability, measurement quality, and cost all mattered. We worked with SPC, Gage R&R, APQP, FMEA, process capability, and cost analysis to compare the in-house lathe against a professional CNC setup.",
        "This project connected the physical side of manufacturing with the data side of decision-making. It was about building a machine, testing its limits, and understanding whether it could realistically produce parts with the quality and consistency required.",
      ],
    },
    es: {
      title: "Torno CNC desde cero",
      detailTitle: "Torno CNC de fabricación propia",
      paragraphs: [
        "Trabajé en un torno CNC de fabricación propia construido para la producción de rótulas. El proyecto combinó diseño mecánico, manufactura, electrónica, pruebas de maquinado, control de calidad y validación de procesos.",
        "El reto era demostrar que la máquina podía hacer más que moverse. Había que evaluarla como un sistema de manufactura: rigidez, vibración, alineación, exactitud dimensional, repetibilidad, calidad de medición y costo, todo importaba. Trabajamos con SPC, Gage R&R, APQP, AMEF, capacidad de proceso y análisis de costos para comparar el torno propio contra un CNC profesional.",
        "Este proyecto conectó el lado físico de la manufactura con el lado de los datos en la toma de decisiones. Se trataba de construir una máquina, probar sus límites y entender si realmente podía producir piezas con la calidad y consistencia requeridas.",
      ],
    },
  },
  {
    key: "aircraft",
    layout: "top",
    image: rcAircraft,
    en: {
      title: "Combustion-Powered RC Aircraft",
      detailTitle: "Combustion-Powered RC Aircraft",
      paragraphs: [
        "I worked on the full build of a combustion-powered RC aircraft inspired by the Messerschmitt Bf 109. The project covered the complete aircraft: fuselage, wings, empennage, landing gear, combustion engine, propeller, control surfaces, electronics, assembly, and testing.",
        "The challenge was making the aircraft behave as one system. Weight, structure, aerodynamics, engine power, control surfaces, material choice, and manufacturability all affected each other. We worked through CAD design, structural analysis, aerodynamic considerations, material selection, engine testing, propeller selection, electronics integration, and physical assembly.",
        "This project taught me how much precision goes into making an aircraft work. It was not only about building something that looked like a plane, but about understanding how every decision affects stability, control, strength, and performance.",
      ],
    },
    es: {
      title: "Avión RC con motor de combustión",
      detailTitle: "Avión RC con motor de combustión",
      paragraphs: [
        "Trabajé en la construcción completa de un avión RC con motor de combustión inspirado en el Messerschmitt Bf 109. El proyecto abarcó todo el avión: fuselaje, alas, empenaje, tren de aterrizaje, motor de combustión, hélice, superficies de control, electrónica, armado y pruebas.",
        "El reto era lograr que el avión se comportara como un solo sistema. El peso, la estructura, la aerodinámica, la potencia del motor, las superficies de control, la elección de materiales y la manufacturabilidad se afectaban entre sí. Pasamos por diseño CAD, análisis estructural, consideraciones aerodinámicas, selección de materiales, pruebas de motor, selección de hélice, integración electrónica y armado físico.",
        "Este proyecto me enseñó cuánta precisión hace falta para que un avión funcione. No se trataba solo de construir algo que pareciera un avión, sino de entender cómo cada decisión afecta la estabilidad, el control, la resistencia y el desempeño.",
      ],
    },
  },
  {
    key: "car",
    layout: "top",
    image: brushlessMotorCar,
    en: {
      title: "Custom Brushless Motor Car",
      detailTitle: "Custom Brushless Motor Car",
      paragraphs: [
        "I built a small car powered by a handmade brushless motor, designed to complete a one-meter speed challenge. The project combined electromagnetism, coil winding, Fusion 360 design, 3D printing, battery setup, wheel traction, and drivetrain tuning.",
        "The challenge was turning electromagnetic force into actual speed. We had to tune the motor winding, coil count, battery configuration, chassis weight, wheel grip, and power transfer so the car could move efficiently instead of wasting energy through friction, slipping, or excess mass. We also changed materials and reduced weight after realizing the original aluminum components were too heavy.",
        "This project was about making the whole system work together. The motor, chassis, wheels, batteries, and drivetrain all had to be tuned as one machine to get real performance.",
      ],
    },
    es: {
      title: "Carro con motor brushless hecho a mano",
      detailTitle: "Carro con motor brushless hecho a mano",
      paragraphs: [
        "Construí un carro pequeño impulsado por un motor brushless hecho a mano, diseñado para completar un reto de velocidad de un metro. El proyecto combinó electromagnetismo, devanado de bobinas, diseño en Fusion 360, impresión 3D, configuración de baterías, tracción de las ruedas y ajuste de la transmisión.",
        "El reto era convertir la fuerza electromagnética en velocidad real. Tuvimos que ajustar el devanado del motor, el número de bobinas, la configuración de las baterías, el peso del chasis, el agarre de las ruedas y la transferencia de potencia para que el carro avanzara de forma eficiente en lugar de perder energía por fricción, patinaje o exceso de masa. También cambiamos materiales y redujimos peso al darnos cuenta de que las piezas originales de aluminio eran demasiado pesadas.",
        "Este proyecto se trató de hacer que todo el sistema funcionara en conjunto. El motor, el chasis, las ruedas, las baterías y la transmisión tenían que ajustarse como una sola máquina para lograr un desempeño real.",
      ],
    },
  },
  {
    key: "wearable",
    layout: "top",
    image: wearableCollector,
    en: {
      title: "Wearable Data Collector for Robotics",
      detailTitle: "Wearable Data Collector for Robotics",
      paragraphs: [
        "I built a wearable vision system using a Raspberry Pi Zero 2 to capture first-person demonstrations for robotics training. The goal was to create a compact data-collection device that could record human actions from a perspective that is actually useful for learning manipulation, motion, and task context.",
        "The real challenge was making the system reliable while worn. I had to deal with heat dissipation for the Raspberry Pi, stable recording without FPS drops, easy connection and setup, adjustable camera angle, and a Velcro-based head fit that stayed secure during movement. I also designed a data interface to review, organize, and work with the captured videos more efficiently.",
        "This project pushed me to think about robotics from the data side: what the model sees, what it misses, and how hardware design, comfort, thermal behavior, camera placement, and data organization can directly affect the quality of robot learning.",
      ],
    },
    es: {
      title: "Recolector de datos vestible para robótica",
      detailTitle: "Recolector de datos vestible para robótica",
      paragraphs: [
        "Construí un sistema de visión vestible con una Raspberry Pi Zero 2 para capturar demostraciones en primera persona para entrenamiento de robótica. La meta era crear un dispositivo compacto de recolección de datos que pudiera grabar acciones humanas desde una perspectiva realmente útil para aprender manipulación, movimiento y contexto de la tarea.",
        "El verdadero reto fue hacer que el sistema fuera confiable mientras se usa puesto. Tuve que resolver la disipación de calor de la Raspberry Pi, la grabación estable sin caídas de FPS, una conexión y configuración sencillas, el ángulo de cámara ajustable y un ajuste con velcro que se mantuviera firme durante el movimiento. También diseñé una interfaz de datos para revisar, organizar y trabajar con los videos capturados de forma más eficiente.",
        "Este proyecto me hizo pensar la robótica desde el lado de los datos: qué ve el modelo, qué se le escapa y cómo el diseño del hardware, la comodidad, el comportamiento térmico, la posición de la cámara y la organización de los datos pueden afectar directamente la calidad del aprendizaje del robot.",
      ],
    },
  },
  {
    key: "so101",
    layout: "top",
    image: so101RoboticArm,
    en: {
      title: "SO-101 Robotic Arm Learning System",
      detailTitle: "SO-101 Robotic Arm System",
      paragraphs: [
        "I built a full SO-101 robotic arm workflow for teleoperation, simulation, dataset collection, and robot learning. The system includes leader-follower control, motion recording, playback tools, multi-camera capture, LeRobot-compatible datasets, and a custom simulator I built to test and visualize movements.",
        "The real challenge was making all the pieces work together smoothly. I had to handle low-latency communication between the leader and follower arms, camera synchronization, clean dataset structure, recorded motion playback, and the connection between simulation and the physical robot. I also worked with multiple task datasets, including object-to-cup and object-to-basket movements, using both top-view and gripper-view cameras.",
        "This project is one of my strongest robotics builds because it covers the full loop: control the robot, collect demonstrations, train from data, test the behavior, and improve the system. It is not just a robot arm moving around; it is a complete workflow for teaching a robot through real examples.",
      ],
    },
    es: {
      title: "Sistema de aprendizaje con brazo robótico SO-101",
      detailTitle: "Sistema de brazo robótico SO-101",
      paragraphs: [
        "Construí un flujo de trabajo completo con el brazo robótico SO-101 para teleoperación, simulación, recolección de datasets y aprendizaje robótico. El sistema incluye control líder-seguidor, grabación de movimientos, herramientas de reproducción, captura con múltiples cámaras, datasets compatibles con LeRobot y un simulador propio que construí para probar y visualizar los movimientos.",
        "El verdadero reto fue lograr que todas las piezas funcionaran juntas sin problemas. Tuve que manejar la comunicación de baja latencia entre los brazos líder y seguidor, la sincronización de cámaras, una estructura limpia de datasets, la reproducción de movimientos grabados y la conexión entre la simulación y el robot físico. También trabajé con varios datasets de tareas, incluyendo movimientos de objeto a vaso y de objeto a canasta, usando cámaras de vista superior y de vista del gripper.",
        "Este es uno de mis proyectos de robótica más sólidos porque cubre el ciclo completo: controlar el robot, recolectar demostraciones, entrenar con datos, probar el comportamiento y mejorar el sistema. No es solo un brazo robótico moviéndose; es un flujo completo para enseñarle a un robot con ejemplos reales.",
      ],
    },
  },
];

export function projectsFor(language: Language): Project[] {
  return ENTRIES.map((entry) => ({
    key: entry.key,
    image: entry.image,
    layout: entry.layout,
    ...entry[language],
  }));
}
