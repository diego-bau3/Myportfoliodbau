from html import escape


def tag(name: str, content: str = "", **attributes: str | None) -> str:
    attrs = "".join(
        f' {key.rstrip("_").replace("_", "-")}="{escape(value, quote=True)}"'
        for key, value in attributes.items()
        if value is not None
    )
    return f"<{name}{attrs}>{content}</{name}>"


def image(src: str, alt: str, class_name: str = "") -> str:
    return (
        f'<img src="{escape(src, quote=True)}" '
        f'alt="{escape(alt, quote=True)}" '
        f'class="{escape(class_name, quote=True)}">'
    )


def hero_section() -> str:
    hero_content = (
        tag(
            "div",
            tag("h1", "DIEGO", class_="hero-name")
            + tag("h2", "Bautista Silva", class_="hero-surname")
            + tag(
                "p",
                "Mechanical Engineering | Aeronautics Concentration",
                class_="hero-discipline",
            ),
            class_="hero-primary",
        )
        + tag("h2", "MY PROYECTS", class_="hero-projects-heading")
    )
    return tag(
        "section",
        tag("div", hero_content, class_="hero-lockup"),
        class_="hero-section",
    )


def project_item(
    title: str,
    note: str,
    image_src: str | None = None,
    swatch: str | None = None,
) -> str:
    visual = (
        image(image_src, title, "project-image")
        if image_src
        else tag("div", "", class_="project-swatch", style=f"background: {swatch};")
    )
    return tag(
        "article",
        tag(
            "div",
            tag("h3", title, class_="project-title")
            + tag("p", note, class_="project-note"),
            class_="project-copy",
        )
        + visual,
        class_="project-item",
    )


def projects_section() -> str:
    projects = (
        project_item(
            "CNC Lathe",
            "I built a cnc",
            image_src="/assets/cnc-lathe.webp",
        )
        + project_item(
            "Proyecto 2",
            "I built a cnc",
            swatch="#A99200",
        )
    )
    return tag(
        "section",
        tag("div", projects, class_="projects-strip"),
        class_="projects-section",
        id="projects",
    )


def scroll_script() -> str:
    return """
<script>
const heroLockup = document.querySelector(".hero-lockup");
const heroPrimary = document.querySelector(".hero-primary");
const heroProjectsHeading = document.querySelector(".hero-projects-heading");
const projectsStrip = document.querySelector(".projects-strip");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateScrollScene() {
  const progress = clamp(window.scrollY / (window.innerHeight * 0.55), 0, 1);
  const primaryFade = 1 - progress;
  const projectsFade = clamp(0.22 + progress * 0.78, 0.22, 1);
  heroPrimary.style.opacity = primaryFade.toFixed(3);
  heroPrimary.style.transform = `translateY(-${progress * 210}px)`;
  heroProjectsHeading.style.opacity = projectsFade.toFixed(3);
  heroProjectsHeading.style.transform = `translateY(-${progress * 108}px)`;
  heroLockup.style.pointerEvents = progress > 0.96 ? "none" : "auto";
  projectsStrip.style.opacity = clamp(progress * 1.15, 0.18, 1).toFixed(3);
  projectsStrip.style.transform = `translateY(${(1 - progress) * 90}px)`;
}

window.addEventListener("scroll", updateScrollScene, { passive: true });
window.addEventListener("resize", updateScrollScene);
updateScrollScene();
</script>
"""


def landing_page() -> str:
    return tag(
        "main",
        hero_section() + projects_section(),
        class_="landing-page",
    )


def document() -> str:
    head = (
        '<meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width, initial-scale=1">'
        '<link rel="stylesheet" href="/styles.css">'
        + tag("title", "Diego Bau")
    )
    return "<!doctype html>" + tag(
        "html",
        tag("head", head) + tag("body", landing_page() + scroll_script()),
        lang="es",
    )
