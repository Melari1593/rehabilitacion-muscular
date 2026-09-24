"""Estilo y componentes compartidos por los PDF descargables de los cursos."""
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Table, TableStyle

# Paleta
VERDE = colors.HexColor("#2E7D6B")
VERDE_CLARO = colors.HexColor("#E3F1ED")
TINTA = colors.HexColor("#1F2A30")
GRIS = colors.HexColor("#5E6B73")
LINEA = colors.HexColor("#C9D4D1")
SEM_VERDE = colors.HexColor("#3E9B5F")
SEM_AMARILLO = colors.HexColor("#E0A526")
SEM_ROJO = colors.HexColor("#C8483B")
ROJO_CLARO = colors.HexColor("#FBEAE8")

ANCHO, ALTO = letter
MARGEN = 18 * mm
UTIL = ANCHO - 2 * MARGEN

# Estilos
titulo = ParagraphStyle("titulo", fontName="Helvetica-Bold", fontSize=26, leading=30, textColor=TINTA)
subtitulo = ParagraphStyle("subtitulo", fontName="Helvetica", fontSize=13, leading=17, textColor=GRIS)
h2 = ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=15, leading=19, textColor=VERDE, spaceBefore=10, spaceAfter=6)
cuerpo = ParagraphStyle("cuerpo", fontName="Helvetica", fontSize=10, leading=14, textColor=TINTA)
pequeno = ParagraphStyle("pequeno", fontName="Helvetica", fontSize=8.5, leading=11.5, textColor=GRIS)
celda = ParagraphStyle("celda", fontName="Helvetica", fontSize=9, leading=12, textColor=TINTA)
celda_b = ParagraphStyle("celda_b", parent=celda, fontName="Helvetica-Bold")
celda_blanca = ParagraphStyle("celda_blanca", parent=celda_b, textColor=colors.white)
centro_blanco = ParagraphStyle("centro_blanco", parent=celda_b, alignment=TA_CENTER, textColor=colors.white)


def documento(salida, titulo_doc, autor, asunto):
    return SimpleDocTemplate(
        str(salida), pagesize=letter,
        leftMargin=MARGEN, rightMargin=MARGEN, topMargin=20 * mm, bottomMargin=20 * mm,
        title=titulo_doc, author=autor, subject=asunto,
    )


def decoradores(texto_pie):
    """Devuelve (primera_pagina, paginas_siguientes) para doc.build."""
    def pie(canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(LINEA)
        canvas.line(MARGEN, 14 * mm, ANCHO - MARGEN, 14 * mm)
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(GRIS)
        canvas.drawString(MARGEN, 9.5 * mm, texto_pie)
        canvas.drawRightString(ANCHO - MARGEN, 9.5 * mm, f"Página {doc.page}")
        canvas.restoreState()

    def portada(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(VERDE)
        canvas.rect(0, ALTO - 12 * mm, ANCHO, 12 * mm, stroke=0, fill=1)
        canvas.restoreState()
        pie(canvas, doc)

    return portada, pie


def caja(contenido, fondo, borde=None, padding=10):
    t = Table([[contenido]], colWidths=[UTIL])
    estilo = [
        ("BACKGROUND", (0, 0), (-1, -1), fondo),
        ("LEFTPADDING", (0, 0), (-1, -1), padding),
        ("RIGHTPADDING", (0, 0), (-1, -1), padding),
        ("TOPPADDING", (0, 0), (-1, -1), padding),
        ("BOTTOMPADDING", (0, 0), (-1, -1), padding),
    ]
    if borde:
        estilo.append(("LINEBEFORE", (0, 0), (0, -1), 3, borde))
    t.setStyle(TableStyle(estilo))
    return t


def semaforo(filas, ancho_etiqueta=22 * mm):
    """filas: [(rango, etiqueta, descripción)] en orden verde, amarillo, rojo."""
    colores = [SEM_VERDE, SEM_AMARILLO, SEM_ROJO]
    datos = [[Paragraph(f"<b>{n}</b>", centro_blanco), Paragraph(f"<b>{a}</b>", centro_blanco),
              Paragraph(d, celda)] for n, a, d in filas]
    t = Table(datos, colWidths=[22 * mm, ancho_etiqueta, UTIL - 22 * mm - ancho_etiqueta])
    estilo = [
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LEFTPADDING", (2, 0), (2, -1), 10),
        ("LINEBELOW", (2, 0), (2, -2), 0.5, LINEA),
    ]
    for i, color in enumerate(colores[:len(filas)]):
        estilo.append(("BACKGROUND", (0, i), (1, i), color))
    t.setStyle(TableStyle(estilo))
    return t


def ficha(encabezado, lineas, padding=5):
    """Tarjeta de media columna: encabezado HTML y una lista de líneas HTML."""
    contenido = [[Paragraph(encabezado, celda)]] + [[Paragraph(l, celda)] for l in lineas]
    t = Table(contenido, colWidths=[(UTIL - 6 * mm) / 2])
    t.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.6, LINEA),
        ("BACKGROUND", (0, 0), (-1, 0), VERDE_CLARO),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), padding),
        ("BOTTOMPADDING", (0, 0), (-1, -1), padding),
    ]))
    return t


def rejilla(fichas, espacio=4 * mm):
    """Coloca tarjetas de dos en dos."""
    filas = []
    for i in range(0, len(fichas), 2):
        par = fichas[i:i + 2]
        if len(par) == 1:
            par.append("")
        filas.append(par)
    t = Table(filas, colWidths=[UTIL / 2, UTIL / 2])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (0, -1), 3 * mm),
        ("LEFTPADDING", (1, 0), (1, -1), 3 * mm),
        ("RIGHTPADDING", (1, 0), (1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), espacio),
    ]))
    return t


def codigo(c):
    return f"<font color='#2E7D6B'><b>{c}</b></font>"
