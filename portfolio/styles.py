from portfolio.theme import THEME


def stylesheet() -> str:
    return f"""
:root {{
  --page-background: {THEME.page_background};
  --text: {THEME.text};
  --muted-text: {THEME.muted_text};
}}

* {{
  box-sizing: border-box;
}}

html {{
  min-height: 100%;
  scroll-behavior: smooth;
}}

body {{
  margin: 0;
  min-height: 100vh;
  background: var(--page-background);
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}}

.landing-page {{
  position: relative;
  min-height: 240vh;
}}

.hero-section {{
  min-height: 118vh;
  overflow: hidden;
  pointer-events: none;
  position: relative;
  top: 0;
}}

.hero-lockup {{
  color: #CD2B29;
  backface-visibility: hidden;
  left: 50%;
  position: fixed;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 120ms linear, transform 120ms linear;
  white-space: nowrap;
  will-change: opacity, transform;
}}

.hero-primary {{
  transition: opacity 120ms linear, transform 120ms linear;
  will-change: opacity, transform;
}}

.hero-name {{
  color: #CD2B29;
  font-family: "Bebas Neue Pro", "Bebas Neue", Impact, sans-serif;
  font-size: clamp(180px, 25vw, 420px);
  font-weight: 400;
  letter-spacing: 0;
  line-height: 0.78;
  margin: 0;
}}

.hero-surname {{
  color: #CD2B29;
  font-family: "Didot", "Bodoni 72", Georgia, "Times New Roman", serif;
  font-size: clamp(54px, 6vw, 116px);
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1;
  margin: 36px 0 0;
}}

.hero-discipline {{
  color: #CD2B29;
  font-family: "Bebas Neue Pro", "Bebas Neue", "Arial Narrow", sans-serif;
  font-size: clamp(24px, 2.35vw, 46px);
  font-weight: 300;
  letter-spacing: 0.035em;
  line-height: 1;
  margin: 42px 0 0;
  text-transform: none;
}}

.hero-projects-heading {{
  color: #061A40;
  font-family: "Space Grotesk", Inter, ui-sans-serif, system-ui, sans-serif;
  font-size: clamp(30px, 3.2vw, 62px);
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1;
  margin: 58px 0 0;
  opacity: 0.22;
  text-align: center;
  transition: opacity 120ms linear, transform 120ms linear;
  will-change: opacity, transform;
}}

.projects-section {{
  margin-top: -43vh;
  min-height: 122vh;
  padding: 48px clamp(48px, 7vw, 140px) 140px;
  position: relative;
  z-index: 2;
}}

.projects-strip {{
  align-items: start;
  display: grid;
  gap: clamp(72px, 9vw, 180px);
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 0 auto;
  max-width: 1500px;
  opacity: 0.18;
  transform: translateY(90px);
  transition: opacity 120ms linear, transform 120ms linear;
  will-change: opacity, transform;
}}

.project-item {{
  align-content: start;
  display: grid;
  gap: 26px;
  grid-template-columns: 1fr;
  justify-items: center;
  min-width: 0;
}}

.project-copy {{
  color: #050505;
  min-width: 0;
  text-align: center;
  width: 100%;
}}

.project-title {{
  font-family: "Didot", "Bodoni 72", Georgia, "Times New Roman", serif;
  font-size: clamp(54px, 4.7vw, 86px);
  font-style: italic;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 0.92;
  margin: 0;
  overflow-wrap: normal;
  white-space: nowrap;
}}

.project-note {{
  font-family: "Didot", "Bodoni 72", Georgia, "Times New Roman", serif;
  font-size: clamp(18px, 1.25vw, 24px);
  font-style: italic;
  line-height: 1;
  margin: 12px 0 0;
}}

.project-image {{
  display: block;
  max-height: 260px;
  object-fit: contain;
  width: min(100%, 520px);
}}

.project-swatch {{
  aspect-ratio: 2.35 / 1;
  width: min(100%, 520px);
}}

@media (max-width: 900px) {{
  .hero-lockup {{
    width: min(92vw, 720px);
    white-space: normal;
  }}

  .hero-name {{
    font-size: clamp(132px, 39vw, 260px);
  }}

  .hero-surname {{
    font-size: clamp(44px, 12vw, 78px);
    margin-top: 26px;
  }}

  .hero-discipline {{
    font-size: clamp(18px, 5vw, 30px);
    line-height: 1.08;
    margin-top: 28px;
  }}

  .hero-projects-heading {{
    font-size: clamp(28px, 8vw, 48px);
    margin-top: 36px;
  }}

  .projects-section {{
    margin-top: -37vh;
    padding-left: 24px;
    padding-right: 24px;
  }}

  .projects-strip,
  .project-item {{
    grid-template-columns: 1fr;
  }}

  .project-item {{
    gap: 20px;
  }}

  .project-image {{
    max-height: 220px;
  }}
}}
"""
