from fastapi import FastAPI
from fastapi.responses import HTMLResponse, PlainTextResponse
from fastapi.staticfiles import StaticFiles

from portfolio.components import document
from portfolio.styles import stylesheet

app = FastAPI(title="Portfolio")
app.mount("/assets", StaticFiles(directory="assets"), name="assets")


@app.get("/", response_class=HTMLResponse)
def home() -> HTMLResponse:
    return HTMLResponse(document())


@app.get("/styles.css", response_class=PlainTextResponse)
def styles() -> PlainTextResponse:
    return PlainTextResponse(stylesheet(), media_type="text/css")
