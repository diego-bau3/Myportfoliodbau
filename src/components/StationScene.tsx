import { useLayoutEffect, useRef, useState } from "react";

import hangarBackground from "../../assets/hangar-background-v1.png";
import harv from "../../assets/harv/harv-01.webp";
import { stationLayout, STATION_PRESENTATIONS } from "../data/stationGeometry.ts";
import type { StationKey } from "../data/stationGeometry.ts";

type Props = { projectKey: string; title: string; language: "en" | "es"; fallbackImage: string };

export default function StationScene({ projectKey, title, language, fallbackImage }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 800, height: 640, fullHeight: 820 });
  const key = Object.hasOwn(STATION_PRESENTATIONS, projectKey) ? projectKey as StationKey : undefined;
  const preset = key ? STATION_PRESENTATIONS[key] : STATION_PRESENTATIONS.cnc;
  // Hardware uses the exact same source shown on the home hangar. The detail
  // view only changes its scale; it never swaps in another crop or mask.
  const image = preset.mode === "software" ? harv : fallbackImage;
  const layout = stationLayout(size.width, size.height, size.fullHeight, preset);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => {
      const next = { width: element.clientWidth, height: element.clientHeight, fullHeight: element.parentElement?.clientHeight ?? element.clientHeight };
      if (!next.width || !next.height) return;
      setSize(previous => previous.width === next.width && previous.height === next.height && previous.fullHeight === next.fullHeight ? previous : next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    if (element.parentElement) observer.observe(element.parentElement);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="station-scene" data-presentation={preset.mode} data-project={projectKey} ref={ref}>
      <img alt="" aria-hidden="true" className="station-backdrop" src={hangarBackground} style={layout.photo} />
      <span aria-hidden="true" className="station-contact-shadow" style={layout.shadow} />
      <div className={`station-object${preset.mode === "software" ? " station-software" : ""}`} style={layout.object}>
        {preset.mode === "software" ? (
          <div className="station-software-toolbar">
            <span>HARV <span className="station-software-type">/ ERP</span></span>
            <span>{language === "es" ? "Vista del producto" : "Product view"}</span>
          </div>
        ) : null}
        <img alt={title} className="station-subject" decoding="async" src={image} />
      </div>
    </div>
  );
}
