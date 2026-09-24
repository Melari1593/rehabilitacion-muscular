"""Genera el PDF "Rutina de 4 semanas" del curso Rodillas fuertes.

Uso: python3 generar_rutina_rodillas.py
Requiere: reportlab
"""
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

SALIDA = Path(__file__).with_name("rutina-4-semanas-rodillas.pdf")

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
h3 = ParagraphStyle("h3", fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=TINTA)
cuerpo = ParagraphStyle("cuerpo", fontName="Helvetica", fontSize=10, leading=14, textColor=TINTA)
pequeno = ParagraphStyle("pequeno", fontName="Helvetica", fontSize=8.5, leading=11.5, textColor=GRIS)
celda = ParagraphStyle("celda", fontName="Helvetica", fontSize=9, leading=12, textColor=TINTA)
celda_b = ParagraphStyle("celda_b", parent=celda, fontName="Helvetica-Bold")
celda_blanca = ParagraphStyle("celda_blanca", parent=celda_b, textColor=colors.white)
centro = ParagraphStyle("centro", parent=celda, alignment=TA_CENTER)
centro_blanco = ParagraphStyle("centro_blanco", parent=celda_b, alignment=TA_CENTER, textColor=colors.white)

# Ejercicios del curso (código de la lección, nombre, cómo hacerlo, clave técnica)
EJERCICIOS = {
    "2.1": ("Contracción de cuádriceps con toalla",
            "Sentado con la pierna estirada y una toalla enrollada bajo la rodilla. Aprieta el muslo contra la toalla 5 s y relaja.",
            "Respira normal. El trabajo es del muslo."),
    "2.2": ("Elevación de pierna recta",
            "Boca arriba, una rodilla doblada. Aprieta el muslo de la pierna estirada y súbela hasta la altura de la otra rodilla. Baja en 3 s.",
            "Si la rodilla se dobla, sube menos."),
    "2.3": ("Sentarse y levantarse de la silla",
            "Pies al ancho de la cadera. Inclina el tronco y levántate sin impulso. Baja despacio llevando la cadera hacia atrás.",
            "Rodillas en línea con la punta de los pies."),
    "3.1": ("Puente de glúteos",
            "Boca arriba, rodillas dobladas. Aprieta glúteos y sube la cadera hasta alinear hombros, cadera y rodillas. 2 s arriba.",
            "No arquees la zona lumbar."),
    "3.2": ("Almeja (clamshell)",
            "De lado, rodillas dobladas y pies juntos. Abre la rodilla de arriba sin separar los pies ni girar la cadera.",
            "Movimiento lento y controlado."),
    "3.3": ("Abducción de cadera de pie",
            "Apoyado en una silla, lleva una pierna hacia el lado con el tronco recto y vuelve despacio.",
            "No te inclines hacia el otro lado."),
    "4.1": ("Apoyo sobre una pierna",
            "Junto a una pared, levanta un pie y mantén el equilibrio con la rodilla de apoyo ligeramente flexionada.",
            "Siempre con un apoyo cerca."),
    "4.2": ("Subir un escalón",
            "Sube un escalón bajo empujando con el talón. Baja despacio, controlando.",
            "La rodilla no se va hacia adentro."),
    "4.3": ("Minisentadilla a una pierna (opcional)",
            "Apoyado en la pared, sobre una pierna, dobla un poco la rodilla (unos 30°) y vuelve a subir.",
            "Solo si lo anterior es fácil y sin dolor."),
}

# Plan semanal: (código, dosis)
PLAN = [
    ("Semana 1", "Activar", [
        ("2.1", "2 × 10 · 5 s"), ("2.2", "2 × 10"), ("3.1", "2 × 10"), ("4.1", "3 × 20 s · con manos")]),
    ("Semana 2", "Construir", [
        ("2.2", "2 × 12"), ("2.3", "2 × 10"), ("3.1", "2 × 12"), ("3.2", "2 × 12 por lado"), ("4.1", "3 × 30 s")]),
    ("Semana 3", "Fortalecer", [
        ("2.3", "3 × 10"), ("3.1", "3 × 10 · con banda"), ("3.3", "3 × 10 por lado"),
        ("4.1", "3 × 30 s · sin manos"), ("4.2", "3 × 10 por pierna")]),
    ("Semana 4", "Consolidar", [
        ("2.3", "3 × 12 · brazos cruzados"), ("3.1", "3 × 12 · con banda"), ("3.2", "3 × 12 · con banda"),
        ("4.2", "3 × 10 por pierna"), ("4.3", "2 × 6-8 · opcional")]),
]


def pie_de_pagina(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINEA)
    canvas.line(MARGEN, 14 * mm, ANCHO - MARGEN, 14 * mm)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(GRIS)
    canvas.drawString(MARGEN, 9.5 * mm, "Curso Rodillas fuertes · Rutina de 4 semanas")
    canvas.drawRightString(ANCHO - MARGEN, 9.5 * mm, f"Página {doc.page}")
    canvas.restoreState()


def portada(canvas, doc):
    # Banda superior de color en la primera página
    canvas.saveState()
    canvas.setFillColor(VERDE)
    canvas.rect(0, ALTO - 12 * mm, ANCHO, 12 * mm, stroke=0, fill=1)
    canvas.restoreState()
    pie_de_pagina(canvas, doc)


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


def semaforo():
    filas = [
        ("0 - 3", "SIGUE", "Molestia leve que desaparece al terminar o al día siguiente. Puedes continuar.", SEM_VERDE),
        ("4 - 5", "AJUSTA", "Reduce repeticiones o recorrido, o vuelve al ejercicio anterior.", SEM_AMARILLO),
        ("6 o más", "PARA", "Detén la sesión. Si dura más de 24 h o la rodilla se hincha, consulta.", SEM_ROJO),
    ]
    datos = [[Paragraph(f"<b>{n}</b>", centro_blanco), Paragraph(f"<b>{a}</b>", centro_blanco),
              Paragraph(d, celda)] for n, a, d, _ in filas]
    t = Table(datos, colWidths=[22 * mm, 22 * mm, UTIL - 44 * mm])
    estilo = [
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LEFTPADDING", (2, 0), (2, -1), 10),
        ("LINEBELOW", (2, 0), (2, -2), 0.5, LINEA),
    ]
    for i, (*_, color) in enumerate(filas):
        estilo += [("BACKGROUND", (0, i), (1, i), color)]
    t.setStyle(TableStyle(estilo))
    return t


def ficha_ejercicio(codigo):
    nombre, como, clave = EJERCICIOS[codigo]
    contenido = [
        [Paragraph(f"<font color='#2E7D6B'><b>{codigo}</b></font>&nbsp;&nbsp;<b>{nombre}</b>", celda)],
        [Paragraph(como, celda)],
        [Paragraph(f"<font color='#5E6B73'>Clave:</font> {clave}", celda)],
    ]
    t = Table(contenido, colWidths=[(UTIL - 6 * mm) / 2])
    t.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.6, LINEA),
        ("BACKGROUND", (0, 0), (-1, 0), VERDE_CLARO),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return t


def biblioteca():
    codigos = list(EJERCICIOS)
    filas = []
    for i in range(0, len(codigos), 2):
        par = [ficha_ejercicio(c) for c in codigos[i:i + 2]]
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
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4 * mm),
    ]))
    return t


def tabla_semana(nombre, meta, ejercicios):
    col_ej = UTIL - 38 * mm - 3 * 16 * mm
    encabezado = [Paragraph(f"{nombre} · {meta}", celda_blanca), Paragraph("Dosis", celda_blanca),
                  Paragraph("Día 1", centro_blanco), Paragraph("Día 2", centro_blanco),
                  Paragraph("Día 3", centro_blanco)]
    filas = [encabezado]
    for codigo, dosis in ejercicios:
        filas.append([Paragraph(f"<font color='#2E7D6B'><b>{codigo}</b></font>&nbsp; {EJERCICIOS[codigo][0]}", celda),
                      Paragraph(dosis, celda), "", "", ""])
    filas.append([Paragraph("<b>Dolor al terminar (0-10)</b>", celda), "", "", "", ""])
    t = Table(filas, colWidths=[col_ej, 38 * mm, 16 * mm, 16 * mm, 16 * mm])
    ultima = len(filas) - 1
    estilo = [
        ("BACKGROUND", (0, 0), (-1, 0), VERDE),
        ("GRID", (0, 0), (-1, -1), 0.5, LINEA),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("BACKGROUND", (0, ultima), (-1, ultima), VERDE_CLARO),
        ("SPAN", (0, ultima), (1, ultima)),
    ]
    t.setStyle(TableStyle(estilo))
    return t


def construir():
    doc = SimpleDocTemplate(
        str(SALIDA), pagesize=letter,
        leftMargin=MARGEN, rightMargin=MARGEN, topMargin=20 * mm, bottomMargin=20 * mm,
        title="Rutina de 4 semanas · Rodillas fuertes",
        author="Curso Rodillas fuertes, prevención y cuidado",
        subject="Plan de ejercicios para rodillas",
    )
    h = []

    # Página 1: portada, cómo usar, semáforo, seguridad
    h += [Spacer(1, 6 * mm),
          Paragraph("Rutina de 4 semanas", titulo),
          Spacer(1, 2 * mm),
          Paragraph("Curso <b>Rodillas fuertes, prevención y cuidado</b>", subtitulo),
          Spacer(1, 8 * mm)]

    h.append(Paragraph("Cómo usar esta rutina", h2))
    for linea in [
        "<b>3 sesiones por semana</b> en días no seguidos (por ejemplo, lunes, miércoles y viernes).",
        "Cada sesión dura <b>20 a 25 minutos</b>. Antes de empezar, camina 5 minutos o mueve suavemente las piernas.",
        "Marca cada ejercicio cuando lo completes y anota tu dolor al terminar la sesión.",
        "Solo pasa a la semana siguiente si terminaste la anterior con <b>dolor de 3 o menos</b>. Si no, repite la semana.",
        "Material: una silla estable, una toalla, una pared y, desde la semana 3, una banda elástica suave.",
    ]:
        h.append(Paragraph(f"•&nbsp;&nbsp;{linea}", cuerpo))
        h.append(Spacer(1, 2))

    h.append(Paragraph("Semáforo del dolor", h2))
    h.append(Paragraph("Durante y después de cada sesión, puntúa tu dolor de 0 (nada) a 10 (el peor imaginable).", cuerpo))
    h.append(Spacer(1, 3 * mm))
    h.append(semaforo())

    h.append(Paragraph("Consulta con un profesional si...", h2))
    alertas = [
        "La rodilla se hincha de forma importante, sobre todo después de un golpe o una torcedura.",
        "La rodilla se bloquea, falla al apoyar o no puedes apoyar el peso sobre la pierna.",
        "El dolor no mejora en 2 semanas, empeora o te despierta por la noche.",
        "<b>Urgente:</b> rodilla roja y caliente con fiebre; pantorrilla hinchada, caliente o dolorosa; dolor intenso tras una caída.",
    ]
    h.append(caja([Paragraph(f"•&nbsp;&nbsp;{a}", cuerpo) for a in alertas], ROJO_CLARO, borde=SEM_ROJO))
    h.append(Spacer(1, 5 * mm))
    h.append(Paragraph(
        "Material educativo. No reemplaza una valoración presencial con tu médico o fisioterapeuta. "
        "Si tienes una lesión reciente o una cirugía de rodilla en los últimos 3 meses, pide autorización antes de empezar.",
        pequeno))
    h.append(PageBreak())

    # Página 2: biblioteca de ejercicios
    h.append(Paragraph("Tus ejercicios", h2))
    h.append(Paragraph("El número de cada ejercicio corresponde a la lección del curso donde se explica en video.", cuerpo))
    h.append(Spacer(1, 4 * mm))
    h.append(biblioteca())
    h.append(PageBreak())

    # Páginas 3-4: plan semanal con registro
    h.append(Paragraph("Tu plan semana a semana", h2))
    h.append(Paragraph("Marca con una X cada ejercicio completado y anota tu dolor al final de cada sesión.", cuerpo))
    h.append(Spacer(1, 4 * mm))
    for i, (nombre, meta, ejercicios) in enumerate(PLAN):
        h.append(KeepTogether([tabla_semana(nombre, meta, ejercicios), Spacer(1, 6 * mm)]))
        if i == 1:
            h.append(PageBreak())

    h.append(Spacer(1, 2 * mm))
    h.append(caja([
        Paragraph("<b>¿Terminaste las 4 semanas?</b>", cuerpo),
        Spacer(1, 2),
        Paragraph("Mantén 2 o 3 sesiones por semana con la rutina de la semana 4. "
                  "La fuerza se pierde si se deja de entrenar: la constancia gana a la intensidad.", cuerpo),
    ], VERDE_CLARO, borde=VERDE))

    doc.build(h, onFirstPage=portada, onLaterPages=pie_de_pagina)
    print(f"PDF generado: {SALIDA}")


if __name__ == "__main__":
    construir()
