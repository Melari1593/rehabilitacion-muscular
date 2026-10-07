import type { Diccionario } from './es';

const registro = 'Medical registration RETHUS 1018459438';

export const en: Diccionario = {
  registro,
  meta: {
    titulo: 'BienEstar en Casa · Online courses to move better',
    descripcion:
      'Short video courses and downloadable guides to care for your back, knees and muscles at home. Content reviewed by a physician. Online payment.',
    ogDescripcion: 'Online courses to move better at home. Content reviewed by a physician.',
  },
  marca: { nombre: 'BienEstar', complemento: 'en Casa' },
  nav: {
    principal: 'Main',
    cursos: 'Courses',
    productos: 'Products',
    postura: 'Check your posture',
    revision: 'Medical review',
    verCursos: 'See courses',
    idioma: 'Language',
  },
  errores: {
    checkout: 'We couldn’t open the payment page right now. Please try again in a few minutes.',
    producto: 'That product isn’t available. Please choose another one from the list.',
  },
  portada: {
    chip: 'Online courses · Reviewed by a physician',
    titulo: 'Move better from home.',
    texto:
      'Short video courses and downloadable guides to care for your back, knees and muscles at your own pace. Plus products to support your routine.',
    verCursos: 'See courses',
    productos: 'Wellness products',
    destacadoChip: 'Featured course',
    destacadoTitulo: 'Healthy back · 5 days, 10 min a day',
    destacadoTexto: 'Online payment · Digital access · PDF plan',
  },
  franja: {
    aria: 'About the store',
    datos: [
      'Content reviewed by a physician',
      registro,
      'Secure online payment',
      'Digital access to courses',
      'Downloadable PDF guides',
      'Products with home delivery',
    ],
  },
  temas: {
    eyebrow: 'What would you like to improve?',
    titulo: 'Choose where to start taking care of yourself.',
    items: [
      { titulo: 'Back and neck', texto: 'For people who spend long hours sitting.' },
      { titulo: 'Strong knees', texto: 'Strengthen the muscles that protect your knees.' },
      { titulo: 'Muscle recovery', texto: 'Self-massage with a foam roller and ball, pain-free.' },
      { titulo: 'Strength at home', texto: 'Train with resistance bands, from scratch.' },
      { titulo: 'Cold or heat', texto: 'How to handle muscle discomfort at home.' },
      { titulo: 'Wellness products', texto: 'Everything you need for your routine.' },
    ],
  },
  pasos: {
    eyebrow: 'How it works',
    titulo: 'Get started today in three steps.',
    items: [
      {
        titulo: 'Choose your course',
        texto: 'Back, knees, muscle recovery or strength at home. Each course explains who it’s for and what it includes.',
        nota: 'Each course: 52,150 COP',
      },
      {
        titulo: 'Pay online',
        texto:
          'Pay at Wompi’s secure checkout with a card, PSE, Nequi or Bancolombia. Once the payment is confirmed, you’ll receive the access instructions by email.',
        nota: 'No shipping, no waiting',
      },
      {
        titulo: 'Practice at your own pace',
        texto: 'Short videos and a downloadable plan to track your progress. Each course includes warning signs so you know when to see a doctor.',
        nota: '10 to 25 minutes per session',
      },
    ],
  },
  seccionPostura: {
    eyebrow: 'Free · With your camera',
    titulo: 'Check your posture while you exercise.',
    texto:
      'Stand in front of the camera, choose an exercise and the app counts your reps and tells you right away if the movement goes outside the correct range. Start with the squat and the arm raise.',
    boton: 'Try the posture check',
    items: [
      { titulo: 'All you need is your camera', texto: 'Works in your phone or computer browser, nothing to install.' },
      { titulo: 'Your video stays on your device', texto: 'Posture detection runs in your browser. We don’t record or send your video.' },
      { titulo: 'It tells you what to correct', texto: 'It counts reps, marks the correct ones and shows you a summary at the end.' },
    ],
  },
  cursos: {
    eyebrow: 'Online courses',
    titulo: 'Learn to take care of yourself, step by step.',
    avisoPruebaTitulo: 'Test mode:',
    avisoPrueba: 'course payments use Wompi’s test environment. No real money is charged; use Wompi’s test cards and data.',
    nota:
      'Payment is made at Wompi’s secure checkout (Bancolombia), in Colombian pesos. Courses are digital: no shipping or cash on delivery. Once the payment is approved, you’ll receive access at the email you enter in Wompi.',
    chip: 'Online course',
    comprar: 'Buy course',
    abriendo: 'Opening secure payment…',
    pronto: 'Coming soon',
    idiomaContenido: 'Course videos and guides are in Spanish.',
  },
  productos: {
    eyebrow: 'Wellness products',
    titulo: 'What you need for your routine.',
    chip: 'Home delivery',
    nota: 'Choose your size and color, and pay at Shopify’s secure checkout, where you’ll see the shipping cost before confirming.',
    comprar: 'Buy',
    abriendo: 'Opening secure payment…',
    agotado: 'Sold out',
    elige: 'Choose an option',
    opcion: 'Option',
    y: 'and',
    sufijoAgotado: ' (sold out)',
    opciones: { Color: 'Color', 'Talla del calzado': 'Shoe size' },
    colores: { negro: 'Black', beige: 'Beige', celeste: 'Light blue', marron: 'Brown' },
  },
  revision: {
    eyebrow: 'Who reviews the content',
    titulo: 'Simple exercises, reviewed by a physician.',
    subtitulo: 'Reviewing physician',
    texto:
      'All course content is reviewed by a physician before it’s published. The courses are educational and don’t replace an in-person professional assessment.',
  },
  cta: {
    titulo: 'Ready to move better?',
    texto: 'Short courses, at your own pace, from home.',
    boton: 'See the courses',
    nota: 'Online payment · Digital access · Content reviewed by a physician',
  },
  pie: {
    lema: 'Online courses and products to move better at home.',
    tienda: 'Shop',
    cursos: 'Online courses',
    productos: 'Wellness products',
    postura: 'Check your posture',
    politicas: 'Policies',
    terminos: 'Terms of service',
    reembolso: 'Refund policy',
    privacidad: 'Privacy policy',
    envios: 'Shipping',
    contacto: 'Contact',
    escribenos: 'Write to us',
    ciudad: 'Bogotá, Colombia',
    aviso: 'Educational content. It doesn’t replace a medical consultation, diagnosis or treatment.',
    pagos: 'Courses: payments by Wompi · Products: payments by Shopify',
  },
  paginaPostura: {
    metaTitulo: 'Check your posture · BienEstar en Casa',
    metaDescripcion:
      'Do your exercises in front of the camera: the app counts reps and tells you if the movement goes outside the correct range. Your video stays on your device.',
    eyebrow: 'Free · With your camera',
    titulo: 'Check your posture.',
    texto:
      'Choose an exercise, stand in front of the camera and move. The app detects your posture, counts your reps and tells you right away if the movement goes outside the correct range.',
    consejos: ['Allow camera access', 'Find a well-lit spot', 'Step back until your body is visible'],
    appAria: 'Posture check app',
    iframeTitulo: 'Posture check with the camera',
    pequena: 'Looks too small?',
    pantallaCompleta: 'Open it full screen',
    privTitulo: 'Your video stays on your device',
    privTexto:
      'Posture detection runs in your browser. We don’t record, store or send your video to any server. Only the detection model is downloaded the first time you use the app.',
    criterioTitulo: 'Use it wisely',
    criterioTexto:
      'It’s an educational support tool and doesn’t replace an assessment by a physician or physiotherapist. If you feel pain, dizziness or any discomfort, stop and seek advice.',
    rutina: 'Want a complete routine?',
    verCursos: 'See our online courses',
  },
  resultado: {
    metaTitulo: 'Payment result · BienEstar en Casa',
    eyebrow: 'Payment result',
    modoPrueba: 'Test mode',
    estados: {
      APPROVED: {
        titulo: 'Payment approved!',
        texto: 'Thank you for your purchase. In a few minutes you’ll receive the course access by email. If you don’t see it, check your spam folder.',
      },
      PENDING: {
        titulo: 'Your payment is being processed',
        texto: 'Wompi is still confirming the payment. Once it’s approved we’ll email you the access. You can reload this page in a few minutes.',
      },
      DECLINED: { titulo: 'The payment was declined', texto: 'You haven’t been charged. You can try again with another payment method.' },
      VOIDED: { titulo: 'The payment was voided', texto: 'The transaction was voided and you haven’t been charged.' },
      ERROR: { titulo: 'There was a payment error', texto: 'You haven’t been charged. Please try again in a few minutes.' },
    },
    noEncontrado: {
      titulo: 'We couldn’t find the payment',
      texto: 'We couldn’t verify this transaction. If you made a payment, write to us with the reference Wompi sent you by email.',
    },
    curso: 'Course',
    valor: 'Amount',
    referencia: 'Reference',
    transaccion: 'Wompi transaction',
    volver: 'Back to courses',
    verMas: 'See more courses',
    contacto: 'Contact us',
  },
  catalogo: {
    'espalda-sana': { titulo: 'Healthy back for people who work sitting down', resumen: '5-day mini course, 10 minutes a day. Includes a PDF plan.', alt: 'Woman sitting at a computer with her back supported, feet on the floor and the screen at eye level; lines mark the correct posture.' },
    'rodillas-fuertes': { titulo: 'Strong knees: prevention and care', resumen: '6 video lessons and a 4-week routine in PDF.' },
    automasaje: { titulo: 'Self-massage and muscle recovery', resumen: '4 videos and a visual guide with 2 routines.' },
    'bandas-elasticas': { titulo: 'Get stronger at home with resistance bands', resumen: '5 short videos and a weekly routine in PDF.' },
    'frio-o-calor': { titulo: 'Cold or heat: handling muscle discomfort at home', resumen: 'One 20-minute video and a downloadable infographic.' },
  },
  correo: {
    asunto: 'Your course:',
    gracias: 'Thank you for your purchase!',
    curso: 'Course',
    referencia: 'Payment reference',
    acceso: 'Access your course here:',
    pronto: 'Within the next 24 hours we’ll send the access instructions to this email.',
    revisado: `Educational content reviewed by a physician · ${registro}.`,
    aviso: 'It doesn’t replace a medical consultation, diagnosis or treatment.',
  },
};
