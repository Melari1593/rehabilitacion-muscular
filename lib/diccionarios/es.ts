// Textos del sitio en español (idioma original). Los demás idiomas siguen esta misma estructura.

const registro = 'Registro médico RETHUS 1018459438';

export const es = {
  registro,
  meta: {
    titulo: 'BienEstar en Casa · Cursos en línea para moverte mejor',
    descripcion:
      'Cursos cortos en video y guías descargables para cuidar tu espalda, tus rodillas y tus músculos desde casa. Contenido revisado por un médico. Pago en línea.',
    ogDescripcion: 'Cursos en línea para moverte mejor desde casa. Contenido revisado por un médico.',
  },
  marca: { nombre: 'BienEstar', complemento: 'en Casa' },
  nav: {
    principal: 'Principal',
    cursos: 'Cursos',
    productos: 'Productos',
    postura: 'Analiza tu postura',
    revision: 'Revisión médica',
    verCursos: 'Ver cursos',
    idioma: 'Idioma',
  },
  errores: {
    checkout: 'No pudimos abrir el pago en este momento. Inténtalo de nuevo en unos minutos.',
    producto: 'Ese producto no está disponible. Elige otro de la lista.',
  },
  portada: {
    chip: 'Cursos en línea · Revisados por un médico',
    titulo: 'Muévete mejor desde casa.',
    texto:
      'Cursos cortos en video y guías descargables para cuidar tu espalda, tus rodillas y tus músculos a tu ritmo. Más productos para acompañar tu rutina.',
    verCursos: 'Ver cursos',
    productos: 'Productos de bienestar',
    destacadoChip: 'Curso destacado',
    destacadoTitulo: 'Espalda sana · 5 días, 10 min al día',
    destacadoTexto: 'Pago en línea · Acceso digital · Plan en PDF',
  },
  franja: {
    aria: 'Datos de la tienda',
    datos: [
      'Contenido revisado por un médico',
      registro,
      'Pago en línea seguro',
      'Acceso digital a los cursos',
      'Guías descargables en PDF',
      'Productos con envío a domicilio',
    ],
  },
  temas: {
    eyebrow: '¿Qué quieres mejorar?',
    titulo: 'Elige por dónde empezar a cuidarte.',
    items: [
      { titulo: 'Espalda y cuello', texto: 'Para quien pasa muchas horas sentado.' },
      { titulo: 'Rodillas fuertes', texto: 'Fortalece los músculos que protegen tus rodillas.' },
      { titulo: 'Recuperación muscular', texto: 'Automasaje con rodillo y pelota, sin dolor.' },
      { titulo: 'Fuerza en casa', texto: 'Entrena con bandas elásticas, desde cero.' },
      { titulo: 'Frío o calor', texto: 'Cómo manejar molestias musculares en casa.' },
      { titulo: 'Productos de bienestar', texto: 'Todo lo que necesitas para tu rutina.' },
    ],
  },
  pasos: {
    eyebrow: 'Cómo funciona',
    titulo: 'Empieza hoy en tres pasos.',
    items: [
      {
        titulo: 'Elige tu curso',
        texto: 'Espalda, rodillas, recuperación muscular o fuerza en casa. Cada curso explica para quién es y qué incluye.',
        nota: 'Cada curso: 52.150 COP',
      },
      {
        titulo: 'Paga en línea',
        texto:
          'Pagas en el checkout seguro de Wompi con tarjeta, PSE, Nequi o Bancolombia. Al confirmarse el pago recibes en tu correo las instrucciones de acceso.',
        nota: 'Sin envíos ni esperas',
      },
      {
        titulo: 'Practica a tu ritmo',
        texto:
          'Videos cortos y un plan descargable para seguir tu progreso. Cada curso incluye señales de alerta para saber cuándo consultar.',
        nota: '10 a 25 minutos por sesión',
      },
    ],
  },
  seccionPostura: {
    eyebrow: 'Gratis · Con tu cámara',
    titulo: 'Analiza tu postura mientras haces ejercicio.',
    texto:
      'Ponte frente a la cámara, elige un ejercicio y la app cuenta tus repeticiones y te avisa al instante si el movimiento sale del rango correcto. Empieza con la sentadilla y la elevación de brazo.',
    boton: 'Probar el análisis de postura',
    items: [
      { titulo: 'Solo necesitas tu cámara', texto: 'Funciona en el navegador del celular o del computador, sin instalar nada.' },
      { titulo: 'Tu video no sale de tu equipo', texto: 'La detección de postura ocurre en tu navegador. No grabamos ni enviamos tu video.' },
      { titulo: 'Te dice qué corregir', texto: 'Cuenta repeticiones, marca las correctas y te muestra un resumen al terminar.' },
    ],
  },
  cursos: {
    eyebrow: 'Cursos en línea',
    titulo: 'Aprende a cuidarte, paso a paso.',
    avisoPruebaTitulo: 'Modo de prueba:',
    avisoPrueba: 'los pagos de cursos usan el entorno de pruebas de Wompi. No se cobra dinero real; usa las tarjetas y datos de prueba de Wompi.',
    nota:
      'El pago se hace en el checkout seguro de Wompi (Bancolombia), en pesos colombianos. Los cursos son digitales: no tienen envío ni pago contra entrega. Al aprobarse el pago recibes el acceso en el correo que registres en Wompi.',
    chip: 'Curso en línea',
    comprar: 'Comprar curso',
    abriendo: 'Abriendo pago seguro…',
    pronto: 'Disponible pronto',
    idiomaContenido: '',
  },
  productos: {
    eyebrow: 'Productos de bienestar',
    titulo: 'Lo que necesitas para tu rutina.',
    chip: 'Envío a domicilio',
    nota: 'Elige tu talla y color, y paga en el checkout seguro de Shopify, donde verás el costo de envío antes de confirmar.',
    comprar: 'Comprar',
    abriendo: 'Abriendo pago seguro…',
    agotado: 'Agotado',
    elige: 'Elige una opción',
    opcion: 'Opción',
    y: 'y',
    sufijoAgotado: ' (agotado)',
    opciones: { Color: 'Color', 'Talla del calzado': 'Talla del calzado' } as Record<string, string>,
    colores: { negro: 'Negro', beige: 'Beige', celeste: 'Celeste', marron: 'Marrón' } as Record<string, string>,
  },
  revision: {
    eyebrow: 'Quién revisa el contenido',
    titulo: 'Ejercicios sencillos, revisados por un médico.',
    subtitulo: 'Médico revisor',
    texto:
      'Todo el contenido de los cursos es revisado por un médico antes de publicarse. Los cursos son educativos y no reemplazan una valoración profesional presencial.',
  },
  cta: {
    titulo: '¿Listo para moverte mejor?',
    texto: 'Cursos cortos, a tu ritmo y desde casa.',
    boton: 'Ver los cursos',
    nota: 'Pago en línea · Acceso digital · Contenido revisado por un médico',
  },
  pie: {
    lema: 'Cursos en línea y productos para moverte mejor desde casa.',
    tienda: 'Tienda',
    cursos: 'Cursos en línea',
    productos: 'Productos de bienestar',
    postura: 'Analiza tu postura',
    politicas: 'Políticas',
    terminos: 'Términos del servicio',
    reembolso: 'Política de reembolso',
    privacidad: 'Política de privacidad',
    envios: 'Envíos',
    contacto: 'Contacto',
    escribenos: 'Escríbenos',
    ciudad: 'Bogotá, Colombia',
    aviso: 'Contenido educativo. No reemplaza una consulta, diagnóstico ni tratamiento médico.',
    pagos: 'Cursos: pagos con Wompi · Productos: pagos con Shopify',
  },
  paginaPostura: {
    metaTitulo: 'Analiza tu postura · BienEstar en Casa',
    metaDescripcion:
      'Haz tus ejercicios frente a la cámara: la app cuenta repeticiones y te avisa si el movimiento sale del rango correcto. Tu video no sale de tu equipo.',
    eyebrow: 'Gratis · Con tu cámara',
    titulo: 'Analiza tu postura.',
    texto:
      'Elige un ejercicio, colócate frente a la cámara y muévete. La app detecta tu postura, cuenta las repeticiones y te avisa al instante si el movimiento sale del rango correcto.',
    consejos: ['Permite el acceso a la cámara', 'Busca un lugar con buena luz', 'Aléjate hasta que se vea tu cuerpo'],
    appAria: 'Aplicación de análisis de postura',
    iframeTitulo: 'Análisis de postura con la cámara',
    pequena: '¿Se ve pequeña?',
    pantallaCompleta: 'Ábrela en pantalla completa',
    privTitulo: 'Tu video no sale de tu equipo',
    privTexto:
      'La detección de postura se hace en tu navegador. No grabamos, guardamos ni enviamos tu video a ningún servidor. Solo se descarga el modelo de detección la primera vez que usas la app.',
    criterioTitulo: 'Úsala con criterio',
    criterioTexto:
      'Es una herramienta educativa de apoyo y no reemplaza la valoración de un médico o fisioterapeuta. Si sientes dolor, mareo o cualquier molestia, detente y consulta.',
    rutina: '¿Quieres una rutina completa?',
    verCursos: 'Mira nuestros cursos en línea',
  },
  resultado: {
    metaTitulo: 'Resultado del pago · BienEstar en Casa',
    eyebrow: 'Resultado del pago',
    modoPrueba: 'Modo de prueba',
    estados: {
      APPROVED: {
        titulo: '¡Pago aprobado!',
        texto: 'Gracias por tu compra. En unos minutos recibirás en tu correo el acceso al curso. Si no lo ves, revisa la carpeta de spam.',
      },
      PENDING: {
        titulo: 'Tu pago está en proceso',
        texto:
          'Wompi aún está confirmando el pago. Cuando se apruebe te enviaremos el acceso por correo. Puedes recargar esta página en unos minutos.',
      },
      DECLINED: { titulo: 'El pago fue rechazado', texto: 'No se realizó ningún cobro. Puedes intentarlo de nuevo con otro medio de pago.' },
      VOIDED: { titulo: 'El pago fue anulado', texto: 'La transacción se anuló y no se realizó ningún cobro.' },
      ERROR: { titulo: 'Hubo un error con el pago', texto: 'No se realizó ningún cobro. Inténtalo de nuevo en unos minutos.' },
    },
    noEncontrado: {
      titulo: 'No encontramos el pago',
      texto: 'No pudimos verificar esta transacción. Si hiciste un pago, escríbenos con la referencia que te envió Wompi por correo.',
    },
    curso: 'Curso',
    valor: 'Valor',
    referencia: 'Referencia',
    transaccion: 'Transacción Wompi',
    volver: 'Volver a los cursos',
    verMas: 'Ver más cursos',
    contacto: 'Contáctanos',
  },
  catalogo: {
    'espalda-sana': {
      titulo: 'Espalda sana para quien trabaja sentado',
      resumen: 'Mini curso de 5 días, 10 minutos al día. Incluye plan en PDF.',
      alt: 'Mujer sentada frente al computador con la espalda apoyada, los pies en el suelo y la pantalla a la altura de los ojos; líneas marcan la postura correcta.',
    },
    'rodillas-fuertes': { titulo: 'Rodillas fuertes, prevención y cuidado', resumen: '6 lecciones en video y rutina de 4 semanas en PDF.' },
    automasaje: { titulo: 'Automasaje y recuperación muscular', resumen: '4 videos y guía visual con 2 rutinas.' },
    'bandas-elasticas': { titulo: 'Fortalece en casa con bandas elásticas', resumen: '5 videos cortos y rutina semanal en PDF.' },
    'frio-o-calor': {
      titulo: 'Frío o calor: cómo manejar molestias musculares en casa',
      resumen: '1 video de 20 minutos e infografía descargable.',
    },
  } as Record<string, { titulo: string; resumen: string; alt?: string }>,
  correo: {
    asunto: 'Tu curso:',
    gracias: '¡Gracias por tu compra!',
    curso: 'Curso',
    referencia: 'Referencia de pago',
    acceso: 'Accede a tu curso aquí:',
    pronto: 'En las próximas 24 horas te enviaremos a este correo las instrucciones de acceso.',
    revisado: `Contenido educativo revisado por un médico · ${registro}.`,
    aviso: 'No reemplaza una consulta, diagnóstico ni tratamiento médico.',
  },
};

export type Diccionario = typeof es;
