import type { RefObject } from "react";

import scrollCarImage from "../../assets/scroll-car.webp";

type ScrollCarProps = {
  carRef: RefObject<HTMLImageElement | null>;
};

export default function ScrollCar({ carRef }: ScrollCarProps) {
  return <img src={scrollCarImage} alt="" className="scroll-car" ref={carRef} />;
}
