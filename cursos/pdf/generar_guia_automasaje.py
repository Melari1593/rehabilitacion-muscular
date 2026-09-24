"""Genera el PDF "Guía visual de automasaje" del curso Automasaje y recuperación muscular.

Uso: python3 generar_guia_automasaje.py
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

SALIDA = Path(__file__).with_name("guia-automasaje.pdf")

# Paleta (misma familia visual que la rutina de rodillas)
VERDE = colors.HexColor("#2E7D6B")
VERDE_CLARO = colors.HexColor("#E3F1ED")
TINTA = colors.HexColor("#1F2A30")
GRIS = colors.HexColor("#5E6B73")
LINEA = colors.HexColor("#C9D4D1")
SEM_VERDE = colors.HexColor("#3E9B5F")
SEM_AMARILLO = colors.HexColor("#E0A526")
SEM_ROJO = colors.HexColor("#C8483B")
ROJO_CLARO = colors.HexColor("#FBEAE8")
AMARILLO_CLARO = colors.HexColor("#FDF4E1")

ANCHO, ALTO = letter
MARGEN = 18 * mm
UTIL = ANCHO - 2 * MARGEN

titulo = ParagraphStyle("titulo", fontName="Helvetica-Bold", fontSize=26, leading=30, textColor=TINTA)
subtitulo = ParagraphStyle("subtitulo", fontName="Helvetica", fontSize=13, leading=17, textColor=GRIS)
h2 = ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=15, leading=19, textColor=VERDE, spaceBefore=10, spaceAfter=6)
cuerpo = ParagraphStyle("cuerpo", fontName="Helvetica", fontSize=10, leading=14, textColor=TINTA)
pequeno = ParagraphStyle("pequeno", fontName="Helvetica", fontSize=8.5, leading=11.5, textColor=GRIS)
celda = ParagraphStyle("celda", fontName="Helvetica", fontSize=9, leading=12, textColor=TINTA)
celda_b = ParagraphStyle("celda_b", parent=celda, fontName="Helvetica-Bold")
celda_blanca = ParagraphStyle("celda_blanca", parent=celda_b, textColor=colors.white)
centro_blanco = ParagraphStyle("centro_blanco", parent=celda_b, alignment=TA_CENTER, textColor=colors.white)

# Técnicas del curso: código de lección -> (zona, herramienta, cómo, tiempo, evita)
TECNICAS = {
    "2.1": ("Pantorrillas", "Rodillo",
            "Sentado, manos atrás, cadera arriba. Rueda desde encima del tobillo hasta debajo de la rodilla. Gira la pierna para los lados.",
            "30-60 s por pierna", "Tendón de Aquiles y parte de atrás de la rodilla."),
    "2.2": ("Isquiotibiales", "Rodillo",
            "Rodillo bajo la parte de atrás de los muslos. Rueda desde encima de la rodilla hasta debajo del glúteo.",
            "30-60 s por pierna", "Parte de atrás de la rodilla."),
    "2.3": ("Cuádriceps", "Rodillo",
            "Boca abajo sobre los antebrazos, abdomen activo. Rueda desde debajo de la cadera hasta un palmo antes de la rótula.",
            "30-60 s por pierna", "Hundir la zona lumbar y rodar sobre la rótula."),
    "2.4": ("Lateral del muslo", "Rodillo",
            "De lado, pierna de arriba cruzada delante con el pie apoyado para quitar peso. Rueda despacio.",
            "30 s por pierna · suave", "Presión alta: es una zona muy sensible."),
    "3.1": ("Espalda alta", "Rodillo",
            "Boca arriba, rodillo atravesado bajo los omóplatos, manos sosteniendo la cabeza. Rueda de mitad de espalda a omóplatos.",
            "30-60 s", "Bajar a la zona lumbar y tirar del cuello."),
    "3.2": ("Glúteos", "Pelota",
            "Sentado sobre la pelota, tobillo cruzado sobre la rodilla contraria. Círculos pequeños. Versión suave: contra la pared.",
            "45-60 s por lado", "Seguir si notas hormigueo o corriente en la pierna."),
    "3.3": ("Planta del pie", "Pelota",
            "De pie con apoyo, o sentado. Rueda del talón a la base de los dedos, a lo largo y de lado a lado.",
            "30-60 s por pie", "Ignorar un dolor de talón que dura semanas: consulta."),
    "3.4": ("Espalda alta y hombros", "Pelota en la pared",
            "De espaldas a la pared, pelota entre el omóplato y la columna. Dobla un poco las rodillas y muévete arriba y abajo.",
            "30-60 s por lado", "Poner la pelota sobre la columna."),
}

RUTINA_ANTES = [("2.1", "30 s por pierna"), ("2.3", "30 s por pierna"), ("2.2", "30 s por pierna"), ("3.1", "30 s")]
RUTINA_DESPUES = [
    ("3.3", "45 s por pie"), ("2.1", "60 s por pierna"), ("2.2", "60 s por pierna"), ("2.3", "60 s por pierna"),
    ("2.4", "30 s por pierna · suave"), ("3.2", "60 s por lado"), ("3.1", "60 s"), ("3.4", "45 s por lado"),
]


def pie_de_pagina(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINEA)
    canvas.line(MARGEN, 14 * mm, ANCHO - MARGEN, 14 * mm)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(GRIS)
    canvas.drawString(MARGEN, 9.5 * mm, "Curso Automasaje y recuperación muscular · Guía visual")
    canvas.drawRightString(ANCHO - MARGEN, 9.5 * mm, f"Página {doc.page}")
    canvas.restoreState()


def portada(canvas, doc):
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


def escala_presion():
    filas = [
        ("0 - 3", "SUAVE", "Para empezar y para antes de entrenar.", SEM_VERDE),
        ("4 - 6", "IDEAL", "Intensa pero agradable. Tu zona de trabajo.", SEM_AMARILLO),
        ("7 o más", "DEMASIADO", "Si contienes la respiración o te tensas, quita peso.", SEM_ROJO),
    ]
    datos = [[Paragraph(f"<b>{n}</b>", centro_blanco), Paragraph(f"<b>{a}</b>", centro_blanco),
              Paragraph(d, celda)] for n, a, d, _ in filas]
    t = Table(datos, colWidths=[22 * mm, 26 * mm, UTIL - 48 * mm])
    estilo = [
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LEFTPADDING", (2, 0), (2, -1), 10),
        ("LINEBELOW", (2, 0), (2, -2), 0.5, LINEA),
    ]
    for i, (*_, color) in enumerate(filas):
        estilo.append(("BACKGROUND", (0, i), (1, i), color))
    t.setStyle(TableStyle(estilo))
    return t


def ficha(codigo):
    zona, herramienta, como, tiempo, evita = TECNICAS[codigo]
    contenido = [
        [Paragraph(f"<font color='#2E7D6B'><b>{codigo}</b></font>&nbsp;&nbsp;<b>{zona}</b>"
                   f"&nbsp;&nbsp;<font color='#5E6B73'>· {herramienta}</font>", celda)],
        [Paragraph(como, celda)],
        [Paragraph(f"<font color='#5E6B73'>Tiempo:</font> {tiempo}", celda)],
        [Paragraph(f"<font color='#C8483B'>Evita:</font> {evita}", celda)],
    ]
    t = Table(contenido, colWidths=[(UTIL - 6 * mm) / 2])
    t.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.6, LINEA),
        ("BACKGROUND", (0, 0), (-1, 0), VERDE_CLARO),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return t


def fichas():
    codigos = list(TECNICAS)
    filas = [[ficha(c) for c in codigos[i:i + 2]] for i in range(0, len(codigos), 2)]
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


def tabla_rutina(nombre, detalle, pasos):
    filas = [[Paragraph(nombre, celda_blanca), Paragraph("Herramienta", celda_blanca), Paragraph("Tiempo", celda_blanca)],
             [Paragraph(detalle, celda), "", ""]]
    for codigo, tiempo in pasos:
        zona, herramienta, *_ = TECNICAS[codigo]
        filas.append([Paragraph(f"<font color='#2E7D6B'><b>{codigo}</b></font>&nbsp; {zona}", celda),
                      Paragraph(herramienta, celda), Paragraph(tiempo, celda)])
    t = Table(filas, colWidths=[UTIL - 90 * mm, 40 * mm, 50 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), VERDE),
        ("BACKGROUND", (0, 1), (-1, 1), VERDE_CLARO),
        ("SPAN", (0, 1), (-1, 1)),
        ("GRID", (0, 0), (-1, -1), 0.5, LINEA),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return t


def construir():
    doc = SimpleDocTemplate(
        str(SALIDA), pagesize=letter,
        leftMargin=MARGEN, rightMargin=MARGEN, topMargin=20 * mm, bottomMargin=20 * mm,
        title="Guía visual de automasaje",
        author="Curso Automasaje y recuperación muscular",
        subject="Técnicas y rutinas de automasaje con rodillo y pelota",
    )
    h = []

    # Página 1: portada, escala de presión, reglas, cuándo no hacerlo
    h += [Spacer(1, 6 * mm),
          Paragraph("Guía visual de automasaje", titulo),
          Spacer(1, 2 * mm),
          Paragraph("Curso <b>Automasaje y recuperación muscular</b>", subtitulo),
          Spacer(1, 6 * mm)]

    h.append(Paragraph("Escala de presión", h2))
    h.append(Paragraph("El automasaje no tiene que doler mucho para funcionar. Regula la presión con tus apoyos: "
                       "más manos y pies en el suelo, menos presión. La pelota presiona más que el rodillo.", cuerpo))
    h.append(Spacer(1, 3 * mm))
    h.append(escala_presion())

    h.append(Paragraph("Reglas básicas", h2))
    for regla in [
        "Rueda <b>despacio</b>: más o menos 2-3 cm por segundo.",
        "Dedica <b>30 a 60 segundos por zona</b>, 1 o 2 veces.",
        "En un punto sensible, quédate encima <b>10-20 segundos</b> respirando tranquilo.",
        "<b>Nunca</b> directamente sobre huesos o articulaciones, la zona lumbar con el rodillo, ni la parte delantera o los lados del cuello.",
        "El automasaje <b>complementa</b> el calentamiento, la fuerza y el descanso; no los reemplaza.",
    ]:
        h.append(Paragraph(f"•&nbsp;&nbsp;{regla}", cuerpo))
        h.append(Spacer(1, 2))

    h.append(Paragraph("Cuándo NO hacer automasaje", h2))
    h.append(caja([
        Paragraph("<b>No lo hagas en la zona si:</b> tienes una lesión muscular reciente o un golpe fuerte; hay un moretón, "
                  "herida o infección; está hinchada, roja o caliente; tiene várices marcadas; o te recuperas de una "
                  "fractura o cirugía sin indicación profesional.", cuerpo),
        Spacer(1, 4),
        Paragraph("<b>Consulta antes si:</b> tienes o tuviste trombosis, un trastorno de la coagulación o tomas "
                  "anticoagulantes; tienes osteoporosis; estás embarazada; o tienes menos sensibilidad (por ejemplo, "
                  "neuropatía diabética).", cuerpo),
        Spacer(1, 4),
        Paragraph("<b>Urgente:</b> pantorrilla hinchada, caliente, roja o dolorosa, sobre todo tras un viaje largo, "
                  "una cirugía o reposo. <b>No la masajees</b> y busca atención médica.", cuerpo),
    ], ROJO_CLARO, borde=SEM_ROJO))
    h.append(Spacer(1, 4 * mm))
    h.append(Paragraph(
        "Material educativo. No reemplaza una valoración presencial con tu médico o fisioterapeuta. "
        "Si al terminar te duele más que al empezar, o el dolor dura hasta el día siguiente, usa menos presión la próxima vez.",
        pequeno))
    h.append(PageBreak())

    # Página 2: técnicas por zona
    h.append(Paragraph("Técnicas por zona", h2))
    h.append(Paragraph("El número de cada técnica corresponde a la lección del curso donde se explica en video.", cuerpo))
    h.append(Spacer(1, 4 * mm))
    h.append(fichas())
    h.append(PageBreak())

    # Página 3: rutinas
    h.append(Paragraph("Tus rutinas", h2))
    h.append(Paragraph("No hace falta hacer todas las zonas siempre: elige las que más trabajaste o sientes más cargadas.", cuerpo))
    h.append(Spacer(1, 4 * mm))
    h.append(KeepTogether([tabla_rutina(
        "Rutina 1 · Antes de entrenar (5 min)",
        "Ritmo algo más dinámico y presión suave (3-4 sobre 10). Después, haz tu calentamiento habitual.",
        RUTINA_ANTES), Spacer(1, 6 * mm)]))
    h.append(KeepTogether([tabla_rutina(
        "Rutina 2 · Después de entrenar o día de descanso (10-12 min)",
        "Ritmo lento, presión 4-6 sobre 10 y respiración tranquila.",
        RUTINA_DESPUES), Spacer(1, 6 * mm)]))
    h.append(caja([
        Paragraph("<b>La clave es la constancia</b>", cuerpo),
        Spacer(1, 2),
        Paragraph("Mejor 5 minutos casi todos los días que 30 minutos una vez al mes. "
                  "Deja el rodillo y la pelota a la vista para acordarte de usarlos.", cuerpo),
    ], VERDE_CLARO, borde=VERDE))

    doc.build(h, onFirstPage=portada, onLaterPages=pie_de_pagina)
    print(f"PDF generado: {SALIDA}")


if __name__ == "__main__":
    construir()
