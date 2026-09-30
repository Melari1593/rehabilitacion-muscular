"""Genera el PDF "Plan de 5 días y rutina diaria" del curso Espalda sana.

Uso: python3 generar_plan_espalda.py
Requiere: reportlab
"""
from pathlib import Path

from reportlab.lib.units import mm
from reportlab.platypus import KeepTogether, PageBreak, Paragraph, Spacer, Table, TableStyle

from comun import (
    LINEA, ROJO_CLARO, SEM_ROJO, UTIL, VERDE, VERDE_CLARO,
    caja, celda, celda_b, celda_blanca, centro_blanco, codigo, cuerpo, decoradores, documento,
    ficha, h2, pequeno, rejilla, subtitulo, titulo,
)

SALIDA = Path(__file__).with_name("plan-5-dias-espalda.pdf")

# Ejercicios del curso: código de lección -> (nombre, dónde, cómo, clave)
EJERCICIOS = {
    "2.1": ("Círculos de hombros", "Pausa activa",
            "Sube los hombros hacia las orejas, llévalos atrás y bájalos. Círculos lentos y amplios.",
            "10 hacia atrás."),
    "2.2": ("Retracción de mentón", "Pausa activa",
            "Mirando al frente, lleva la cabeza hacia atrás como haciendo papada. Mantén 3 s y suelta.",
            "No bajes la barbilla al pecho. 8 repeticiones."),
    "2.3": ("Extensión de pie", "Pausa activa",
            "Manos en la cintura, inclínate suavemente hacia atrás mirando al frente y vuelve.",
            "Pequeño y cómodo. Si el dolor baja por la pierna, sáltalo. 5 repeticiones."),
    "2.4": ("Marcha o vuelta", "Pausa activa",
            "Camina: ve por agua, da una vuelta o marcha en el sitio subiendo las rodillas.",
            "30 a 60 s."),
    "3.1": ("Inclinación lateral de cuello", "Silla",
            "Sujeta la silla con una mano e inclina la oreja contraria hacia su hombro, sin girar la cara.",
            "Sin tirar de la cabeza. 20-30 s por lado."),
    "3.2": ("Rotación de tronco sentado", "Silla",
            "Brazos cruzados sobre el pecho, gira el tronco desde la cintura y vuelve al centro.",
            "Cadera y rodillas miran al frente. 5 por lado."),
    "3.3": ("Gato-camello", "Suelo",
            "En cuatro apoyos, redondea la espalda al soltar el aire y deja bajar el abdomen al tomarlo.",
            "Lento, vértebra a vértebra. 8-10 repeticiones."),
    "3.4": ("Rodillas al pecho", "Suelo",
            "Boca arriba, abraza las rodillas. Puedes balancearte suavemente de lado a lado.",
            "Versión suave: una rodilla a la vez."),
    "3.5": ("Postura del niño", "Suelo",
            "Sentado sobre los talones, lleva el tronco adelante con los brazos estirados y la frente apoyada.",
            "Con molestias de rodilla, usa rodillas al pecho."),
    "4.1": ("Activación abdominal", "Suelo",
            "Boca arriba, mete suavemente el ombligo hacia dentro y mantén respirando normal.",
            "Esfuerzo del 30%, sin contener el aire."),
    "4.2": ("Bicho muerto", "Suelo",
            "Piernas a 90° y brazos al techo. Baja un brazo y la pierna contraria sin despegar la zona lumbar.",
            "Versión suave: solo las piernas."),
    "4.3": ("Perro de muestra", "Suelo",
            "En cuatro apoyos, estira un brazo y la pierna contraria en línea con el tronco. 3 s.",
            "Como si llevaras un vaso en la espalda."),
    "4.4": ("Puente de glúteos", "Suelo",
            "Boca arriba, aprieta los glúteos y sube la cadera hasta alinear hombros, cadera y rodillas.",
            "No arquees la zona lumbar."),
}

PLAN_5_DIAS = [
    ("Día 1", "Tu puesto de trabajo", "Ajusta silla, pantalla, teclado y celular con la lista de la página 1.",
     "Foto del puesto antes y después."),
    ("Día 2", "Pausas activas", "Pausa de 2 min cada 30-45 min: 2.1, 2.2, 2.3 y 2.4.",
     "Al menos 4 pausas en el día."),
    ("Día 3", "Estiramientos", "3.1 y 3.2 en la silla; 3.3, 3.4 y 3.5 en el suelo.",
     "Los de silla en 2 pausas; los de suelo al terminar la jornada."),
    ("Día 4", "Abdomen profundo", "4.1, 4.2, 4.3 y 4.4, lento y con control.",
     "Una serie de cada uno; si es fácil, mañana dos."),
    ("Día 5", "Tu hábito diario", "Rutina diaria de 10 min (esta página) + pausas activas.",
     "Programa tu rutina a una hora fija."),
]

RUTINA_DIARIA = [
    ("3.3", "8-10 repeticiones"), ("4.1", "10 × 10 s"), ("4.2", "2 × 6-8 por lado"), ("4.3", "2 × 6-8 por lado"),
    ("4.4", "2 × 10-12"), ("3.4", "2 × 30 s"), ("3.5", "2 × 30 s"),
]

CHECKLIST_PUESTO = [
    "Pies apoyados en el suelo (o en un reposapiés) y rodillas a la altura de la cadera.",
    "Espalda apoyada en el respaldo; una toalla enrollada en la cintura si te da comodidad.",
    "Pantalla a un brazo de distancia, con el borde de arriba a la altura de los ojos.",
    "Portátil elevado, con teclado y ratón aparte.",
    "Codos junto al cuerpo y hombros sueltos, no encogidos.",
    "Celular a la altura de los ojos; auriculares para llamadas largas.",
    "Cada 20 min, mirar lejos 20 s. Cada 30-45 min, pausa activa.",
]


def checklist():
    filas = [[Paragraph("", celda), Paragraph(t, celda)] for t in CHECKLIST_PUESTO]
    t = Table(filas, colWidths=[9 * mm, UTIL - 9 * mm])
    estilo = [
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LINEBELOW", (1, 0), (1, -2), 0.5, LINEA),
    ]
    # Casilla dibujada como una celda pequeña con borde
    for i in range(len(filas)):
        estilo.append(("BOX", (0, i), (0, i), 0.8, VERDE))
    t.setStyle(TableStyle(estilo))
    return t


def tabla_5_dias():
    filas = [[Paragraph("Día", celda_blanca), Paragraph("Qué haces", celda_blanca),
              Paragraph("Reto del día", celda_blanca), Paragraph("Hecho", centro_blanco)]]
    for dia, tema, que, reto in PLAN_5_DIAS:
        filas.append([Paragraph(f"<b>{dia}</b><br/><font color='#5E6B73'>{tema}</font>", celda),
                      Paragraph(que, celda), Paragraph(reto, celda), ""])
    t = Table(filas, colWidths=[36 * mm, UTIL - 36 * mm - 58 * mm - 16 * mm, 58 * mm, 16 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), VERDE),
        ("GRID", (0, 0), (-1, -1), 0.5, LINEA),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return t


def tabla_rutina_diaria():
    dias = ["L", "M", "X", "J", "V", "S", "D"]
    ancho_dia = 9 * mm
    filas = [[Paragraph("Rutina diaria · 10 min", celda_blanca), Paragraph("Dosis", celda_blanca)]
             + [Paragraph(d, centro_blanco) for d in dias]]
    for c, dosis in RUTINA_DIARIA:
        filas.append([Paragraph(f"{codigo(c)}&nbsp; {EJERCICIOS[c][0]}", celda), Paragraph(dosis, celda)]
                     + [""] * len(dias))
    filas.append([Paragraph("Pausas activas hechas hoy", celda_b), ""] + [""] * len(dias))
    t = Table(filas, colWidths=[UTIL - 36 * mm - len(dias) * ancho_dia, 36 * mm] + [ancho_dia] * len(dias))
    ultima = len(filas) - 1
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), VERDE),
        ("GRID", (0, 0), (-1, -1), 0.5, LINEA),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("BACKGROUND", (0, ultima), (-1, ultima), VERDE_CLARO),
        ("SPAN", (0, ultima), (1, ultima)),
    ]))
    return t


def construir():
    doc = documento(SALIDA, "Plan de 5 días y rutina diaria · Espalda sana",
                    "Curso Espalda sana para quien trabaja sentado", "Plan de ejercicios para espalda y cuello")
    h = []

    # Página 1: portada, idea clave, checklist del puesto, señales de alerta
    h += [Spacer(1, 6 * mm),
          Paragraph("Plan de 5 días y rutina diaria", titulo),
          Spacer(1, 2 * mm),
          Paragraph("Curso <b>Espalda sana para quien trabaja sentado</b>", subtitulo),
          Spacer(1, 6 * mm)]

    h.append(caja([
        Paragraph("<b>La mejor postura es la siguiente.</b>", cuerpo),
        Spacer(1, 2),
        Paragraph("No hay una postura perfecta: el problema es quedarse quieto en la misma durante horas. "
                  "Busca una postura cómoda y cámbiala a menudo.", cuerpo),
    ], VERDE_CLARO, borde=VERDE))

    h.append(Paragraph("Revisa tu puesto de trabajo", h2))
    h.append(checklist())

    h.append(Paragraph("Consulta con un profesional si...", h2))
    h.append(caja([
        Paragraph("<b>Pronto:</b> el dolor baja por la pierna o el brazo con adormecimiento, hormigueo o pérdida de "
                  "fuerza; no mejora en 4 a 6 semanas o empeora; no cambia con ninguna posición y es peor de noche; "
                  "o hay mareos, visión doble o dificultad para tragar con el dolor de cuello.", cuerpo),
        Spacer(1, 4),
        Paragraph("<b>Urgente:</b> pérdida de control de la orina o las heces, o adormecimiento en la zona genital o "
                  "entre los muslos; debilidad en las piernas que empeora rápido; dolor tras una caída o un golpe "
                  "fuerte; dolor con fiebre o pérdida de peso sin explicación.", cuerpo),
    ], ROJO_CLARO, borde=SEM_ROJO))
    h.append(Spacer(1, 4 * mm))
    h.append(Paragraph(
        "Material educativo. No reemplaza una valoración presencial con tu médico o fisioterapeuta. "
        "Los estiramientos deben sentirse como una tensión agradable, nunca como dolor.",
        pequeno))
    h.append(PageBreak())

    # Página 2: ejercicios
    h.append(Paragraph("Tus ejercicios", h2))
    h.append(Paragraph("El número indica el día del curso con su video: 2 pausas activas, 3 estiramientos, "
                       "4 abdomen profundo.", cuerpo))
    h.append(Spacer(1, 3 * mm))
    h.append(rejilla([
        ficha(f"{codigo(c)}&nbsp;&nbsp;<b>{nombre}</b>&nbsp;&nbsp;<font color='#5E6B73'>· {donde}</font>",
              [como, f"<font color='#5E6B73'>Clave:</font> {clave}"], padding=4)
        for c, (nombre, donde, como, clave) in EJERCICIOS.items()
    ], espacio=2.5 * mm))
    h.append(PageBreak())

    # Página 3: plan de 5 días, pausa activa y registro semanal
    h.append(Paragraph("Tu plan de 5 días", h2))
    h.append(Paragraph("Un video al día, unos 10 minutos. Marca cada día cuando cumplas el reto.", cuerpo))
    h.append(Spacer(1, 3 * mm))
    h.append(tabla_5_dias())

    h.append(Paragraph("Tu pausa activa de 2 minutos", h2))
    h.append(caja([
        Paragraph(f"Cada 30 a 45 minutos: {codigo('2.1')} 10 círculos de hombros · {codigo('2.2')} 8 retracciones "
                  f"de mentón · {codigo('2.3')} 5 extensiones suaves · {codigo('2.4')} 30-60 s caminando.", cuerpo),
        Spacer(1, 2),
        Paragraph("Truco: átala a algo que ya haces (terminar una reunión, ir por agua) o pon una alarma suave.", pequeno),
    ], VERDE_CLARO, borde=VERDE))

    h.append(Paragraph("Tu semana", h2))
    h.append(Paragraph("Desde el día 5, haz la rutina una vez al día y marca cada ejercicio. "
                       "Anota también cuántas pausas activas hiciste.", cuerpo))
    h.append(Spacer(1, 3 * mm))
    h.append(KeepTogether(tabla_rutina_diaria()))

    primera, siguientes = decoradores("Curso Espalda sana · Plan de 5 días y rutina diaria")
    doc.build(h, onFirstPage=primera, onLaterPages=siguientes)
    print(f"PDF generado: {SALIDA}")


if __name__ == "__main__":
    construir()
