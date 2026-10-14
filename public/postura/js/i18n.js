// Textos de la app de postura en español, inglés, francés y árabe.
// El idioma llega en la URL (?lang=en); si no, se usa el del navegador y, por defecto, español.

const TEXTOS = {
  es: {
    titulo: 'Análisis de postura · BienEstar en Casa',
    encabezado: 'Análisis de postura',
    subtitulo: 'Elige el ejercicio que vas a hacer hoy.',
    volver: 'Volver',
    empezar: 'Empezar',
    noTeVemos: 'No te vemos bien. Ajusta la cámara o la luz.',
    sinMovimiento: 'No detectamos movimiento. Ajusta tu posición o la iluminación.',
    detener: 'Detener',
    resumen: 'Resumen de la sesión',
    totales: 'Repeticiones totales',
    correctas: 'Correctas',
    conError: 'Con error',
    bajaConfianza: 'Hubo momentos en los que la cámara no te vio bien; algunas mediciones de esta sesión pueden ser menos precisas.',
    volverInicio: 'Volver al inicio',
    camaraTitulo: 'No pudimos acceder a tu cámara',
    camaraTexto:
      'Esta app necesita permiso de cámara para funcionar. Revisa el ícono de cámara en la barra de direcciones de tu navegador y permite el acceso, luego vuelve a intentarlo.',
    reintentar: 'Volver a intentar',
    detectorError: 'No pudimos cargar el detector de postura. Revisa tu conexión o desactiva el bloqueador de anuncios y vuelve a intentarlo.',
    masLuz: 'Necesitamos más luz. Busca un lugar mejor iluminado.',
    ajustaCamara: 'Ajusta la cámara para que se vea tu cuerpo completo.',
    listo: '¡Listo! Te vemos bien.',
    errorFrecuente: 'El error más frecuente fue: {error}.',
    todasCorrectas: '¡Todas las repeticiones fueron correctas!',
    sinRepeticiones: 'No se detectaron repeticiones en esta sesión.',
    errorShallow: 'movimiento incompleto',
    errorDeep: 'movimiento excesivo',
    squatNombre: 'Sentadilla',
    squatInstrucciones:
      'Ponte de pie de frente o de perfil a la cámara, con la cabeza y el torso hasta las rodillas visibles (no hace falta que se vean los pies). Baja doblando rodillas y cadera como si te sentaras, y vuelve a subir.',
    squatPoco: 'Baja más la cadera',
    squatMucho: 'No bajes tanto, controla el movimiento',
    brazoNombre: 'Elevación de brazo',
    brazoInstrucciones: 'Ponte de pie de frente a la cámara con los brazos abajo. Eleva un brazo estirado hasta la altura del hombro, y vuelve a bajar.',
    brazoPoco: 'Sube más el brazo',
    brazoMucho: 'No subas tanto el brazo',
    bien: '¡Bien!',
  },
  en: {
    titulo: 'Posture check · BienEstar en Casa',
    encabezado: 'Posture check',
    subtitulo: 'Choose the exercise you’re doing today.',
    volver: 'Back',
    empezar: 'Start',
    noTeVemos: 'We can’t see you well. Adjust the camera or the lighting.',
    sinMovimiento: 'No movement detected. Adjust your position or the lighting.',
    detener: 'Stop',
    resumen: 'Session summary',
    totales: 'Total reps',
    correctas: 'Correct',
    conError: 'With errors',
    bajaConfianza: 'At times the camera couldn’t see you well; some measurements in this session may be less accurate.',
    volverInicio: 'Back to start',
    camaraTitulo: 'We couldn’t access your camera',
    camaraTexto:
      'This app needs camera permission to work. Check the camera icon in your browser’s address bar, allow access and try again.',
    reintentar: 'Try again',
    detectorError: 'We couldn’t load the posture detector. Check your connection or turn off your ad blocker and try again.',
    masLuz: 'We need more light. Find a better-lit spot.',
    ajustaCamara: 'Adjust the camera so your whole body is visible.',
    listo: 'All set! We can see you well.',
    errorFrecuente: 'The most frequent error was: {error}.',
    todasCorrectas: 'All reps were correct!',
    sinRepeticiones: 'No reps were detected in this session.',
    errorShallow: 'incomplete movement',
    errorDeep: 'excessive movement',
    squatNombre: 'Squat',
    squatInstrucciones:
      'Stand facing the camera or side-on, with your head and torso down to your knees visible (your feet don’t need to be in view). Lower yourself by bending your knees and hips as if sitting down, then stand back up.',
    squatPoco: 'Lower your hips more',
    squatMucho: 'Don’t go so low, control the movement',
    brazoNombre: 'Arm raise',
    brazoInstrucciones: 'Stand facing the camera with your arms down. Raise one straight arm to shoulder height, then lower it again.',
    brazoPoco: 'Raise your arm higher',
    brazoMucho: 'Don’t raise your arm so high',
    bien: 'Well done!',
  },
  fr: {
    titulo: 'Analyse de posture · BienEstar en Casa',
    encabezado: 'Analyse de posture',
    subtitulo: 'Choisissez l’exercice que vous allez faire aujourd’hui.',
    volver: 'Retour',
    empezar: 'Commencer',
    noTeVemos: 'Nous ne vous voyons pas bien. Ajustez la caméra ou la lumière.',
    sinMovimiento: 'Aucun mouvement détecté. Ajustez votre position ou l’éclairage.',
    detener: 'Arrêter',
    resumen: 'Bilan de la séance',
    totales: 'Répétitions au total',
    correctas: 'Correctes',
    conError: 'Avec erreur',
    bajaConfianza: 'Par moments, la caméra ne vous voyait pas bien ; certaines mesures de cette séance peuvent être moins précises.',
    volverInicio: 'Retour à l’accueil',
    camaraTitulo: 'Impossible d’accéder à votre caméra',
    camaraTexto:
      'Cette application a besoin de l’autorisation de la caméra. Vérifiez l’icône de caméra dans la barre d’adresse de votre navigateur, autorisez l’accès puis réessayez.',
    reintentar: 'Réessayer',
    detectorError: 'Impossible de charger le détecteur de posture. Vérifiez votre connexion ou désactivez votre bloqueur de publicités, puis réessayez.',
    masLuz: 'Il nous faut plus de lumière. Trouvez un endroit mieux éclairé.',
    ajustaCamara: 'Ajustez la caméra pour que tout votre corps soit visible.',
    listo: 'C’est prêt ! Nous vous voyons bien.',
    errorFrecuente: 'L’erreur la plus fréquente : {error}.',
    todasCorrectas: 'Toutes les répétitions étaient correctes !',
    sinRepeticiones: 'Aucune répétition détectée pendant cette séance.',
    errorShallow: 'mouvement incomplet',
    errorDeep: 'mouvement excessif',
    squatNombre: 'Squat',
    squatInstrucciones:
      'Tenez-vous debout face à la caméra ou de profil, la tête et le buste jusqu’aux genoux visibles (pas besoin de voir les pieds). Descendez en pliant les genoux et les hanches comme pour vous asseoir, puis remontez.',
    squatPoco: 'Descendez davantage les hanches',
    squatMucho: 'Ne descendez pas autant, contrôlez le mouvement',
    brazoNombre: 'Élévation du bras',
    brazoInstrucciones: 'Tenez-vous debout face à la caméra, bras le long du corps. Levez un bras tendu jusqu’à hauteur d’épaule, puis redescendez.',
    brazoPoco: 'Levez davantage le bras',
    brazoMucho: 'Ne levez pas autant le bras',
    bien: 'Bien !',
  },
  ar: {
    titulo: 'تحليل الوضعية · BienEstar en Casa',
    encabezado: 'تحليل الوضعية',
    subtitulo: 'اختر التمرين الذي ستمارسه اليوم.',
    volver: 'رجوع',
    empezar: 'ابدأ',
    noTeVemos: 'لا نراك جيدًا. اضبط الكاميرا أو الإضاءة.',
    sinMovimiento: 'لم نرصد أي حركة. اضبط وضعيتك أو الإضاءة.',
    detener: 'إيقاف',
    resumen: 'ملخص الجلسة',
    totales: 'إجمالي التكرارات',
    correctas: 'صحيحة',
    conError: 'بها خطأ',
    bajaConfianza: 'في بعض اللحظات لم تتمكن الكاميرا من رؤيتك جيدًا؛ قد تكون بعض قياسات هذه الجلسة أقل دقة.',
    volverInicio: 'العودة إلى البداية',
    camaraTitulo: 'تعذّر الوصول إلى الكاميرا',
    camaraTexto: 'يحتاج هذا التطبيق إلى إذن الكاميرا ليعمل. تحقّق من أيقونة الكاميرا في شريط العنوان بالمتصفح واسمح بالوصول، ثم حاول مرة أخرى.',
    reintentar: 'حاول مرة أخرى',
    detectorError: 'تعذّر تحميل كاشف الوضعية. تحقّق من اتصالك أو أوقف مانع الإعلانات وحاول مرة أخرى.',
    masLuz: 'نحتاج إلى مزيد من الضوء. ابحث عن مكان أفضل إضاءة.',
    ajustaCamara: 'اضبط الكاميرا بحيث يظهر جسمك بالكامل.',
    listo: 'جاهز! نراك جيدًا.',
    errorFrecuente: 'الخطأ الأكثر تكرارًا: {error}.',
    todasCorrectas: 'كانت جميع التكرارات صحيحة!',
    sinRepeticiones: 'لم يتم رصد أي تكرارات في هذه الجلسة.',
    errorShallow: 'حركة غير مكتملة',
    errorDeep: 'حركة مفرطة',
    squatNombre: 'القرفصاء',
    squatInstrucciones:
      'قف مواجهًا للكاميرا أو بشكل جانبي، بحيث يظهر الرأس والجذع حتى الركبتين (لا يلزم ظهور القدمين). انزل بثني الركبتين والوركين كأنك تجلس، ثم عد إلى الوقوف.',
    squatPoco: 'أنزل الوركين أكثر',
    squatMucho: 'لا تنزل كثيرًا، تحكّم في الحركة',
    brazoNombre: 'رفع الذراع',
    brazoInstrucciones: 'قف مواجهًا للكاميرا والذراعان إلى الأسفل. ارفع ذراعًا ممدودة حتى مستوى الكتف، ثم أنزلها.',
    brazoPoco: 'ارفع ذراعك أكثر',
    brazoMucho: 'لا ترفع ذراعك كثيرًا',
    bien: 'أحسنت!',
  },
};

function elegirIdioma() {
  const deUrl = new URLSearchParams(location.search).get('lang');
  if (deUrl && TEXTOS[deUrl]) return deUrl;
  const delNavegador = (navigator.language || '').slice(0, 2).toLowerCase();
  return TEXTOS[delNavegador] ? delNavegador : 'es';
}

export const idioma = elegirIdioma();

// t('clave') o t('clave', { error: '…' }) para reemplazar {error}.
export function t(clave, valores = {}) {
  const texto = TEXTOS[idioma][clave] ?? TEXTOS.es[clave] ?? clave;
  return texto.replace(/\{(\w+)\}/g, (_, nombre) => valores[nombre] ?? '');
}

// Traduce los elementos con data-i18n="clave" y ajusta idioma y dirección del documento.
export function traducirPagina() {
  document.documentElement.lang = idioma;
  document.documentElement.dir = idioma === 'ar' ? 'rtl' : 'ltr';
  document.title = t('titulo');
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
}
