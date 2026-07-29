import type { RefObject } from "react";

type HeroProps = {
  lockupRef: RefObject<HTMLDivElement | null>;
  primaryRef: RefObject<HTMLDivElement | null>;
  name: string;
  surname: string;
  tagline: string;
};

export default function Hero({
  lockupRef,
  primaryRef,
  name,
  surname,
  tagline,
}: HeroProps) {
  return (
    <section className="hero-section">
      <div className="hero-lockup" ref={lockupRef}>
        <div className="hero-primary" ref={primaryRef}>
          <h1 className="hero-name">{name}</h1>
          <h2 className="hero-surname">{surname}</h2>
          <p className="hero-discipline">{tagline}</p>
        </div>
      </div>
    </section>
  );
}
