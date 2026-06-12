from dataclasses import dataclass


@dataclass(frozen=True)
class Theme:
    page_background: str
    text: str
    muted_text: str


THEME = Theme(
    page_background="#FBF9ED",
    text="#181713",
    muted_text="#686458",
)
