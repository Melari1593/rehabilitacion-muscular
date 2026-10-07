import type { Diccionario } from './es';

const registro = 'Enregistrement médical RETHUS 1018459438';

export const fr: Diccionario = {
  registro,
  meta: {
    titulo: 'BienEstar en Casa · Cours en ligne pour mieux bouger',
    descripcion:
      'Des cours vidéo courts et des guides à télécharger pour prendre soin de votre dos, de vos genoux et de vos muscles à la maison. Contenu relu par un médecin. Paiement en ligne.',
    ogDescripcion: 'Des cours en ligne pour mieux bouger à la maison. Contenu relu par un médecin.',
  },
  marca: { nombre: 'BienEstar', complemento: 'en Casa' },
  nav: {
    principal: 'Principale',
    cursos: 'Cours',
    productos: 'Produits',
    postura: 'Analysez votre posture',
    revision: 'Relecture médicale',
    verCursos: 'Voir les cours',
    idioma: 'Langue',
  },
  errores: {
    checkout: 'Impossible d’ouvrir le paiement pour le moment. Réessayez dans quelques minutes.',
    producto: 'Ce produit n’est pas disponible. Choisissez-en un autre dans la liste.',
  },
  portada: {
    chip: 'Cours en ligne · Relus par un médecin',
    titulo: 'Bougez mieux depuis chez vous.',
    texto:
      'Des cours vidéo courts et des guides à télécharger pour prendre soin de votre dos, de vos genoux et de vos muscles à votre rythme. Et des produits pour accompagner votre routine.',
    verCursos: 'Voir les cours',
    productos: 'Produits bien-être',
    destacadoChip: 'Cours à la une',
    destacadoTitulo: 'Dos en bonne santé · 5 jours, 10 min par jour',
    destacadoTexto: 'Paiement en ligne · Accès numérique · Programme en PDF',
  },
  franja: {
    aria: 'À propos de la boutique',
    datos: [
      'Contenu relu par un médecin',
      registro,
      'Paiement en ligne sécurisé',
      'Accès numérique aux cours',
      'Guides PDF à télécharger',
      'Produits livrés à domicile',
    ],
  },
  temas: {
    eyebrow: 'Que souhaitez-vous améliorer ?',
    titulo: 'Choisissez par où commencer à prendre soin de vous.',
    items: [
      { titulo: 'Dos et nuque', texto: 'Pour celles et ceux qui passent de longues heures assis.' },
      { titulo: 'Genoux solides', texto: 'Renforcez les muscles qui protègent vos genoux.' },
      { titulo: 'Récupération musculaire', texto: 'Auto-massage au rouleau et à la balle, sans douleur.' },
      { titulo: 'Force à la maison', texto: 'Entraînez-vous avec des bandes élastiques, en partant de zéro.' },
      { titulo: 'Froid ou chaud', texto: 'Comment gérer les gênes musculaires à la maison.' },
      { titulo: 'Produits bien-être', texto: 'Tout ce qu’il vous faut pour votre routine.' },
    ],
  },
  pasos: {
    eyebrow: 'Comment ça marche',
    titulo: 'Commencez aujourd’hui en trois étapes.',
    items: [
      {
        titulo: 'Choisissez votre cours',
        texto: 'Dos, genoux, récupération musculaire ou force à la maison. Chaque cours précise à qui il s’adresse et ce qu’il comprend.',
        nota: 'Chaque cours : 52 150 COP',
      },
      {
        titulo: 'Payez en ligne',
        texto:
          'Vous payez sur la page sécurisée de Wompi par carte, PSE, Nequi ou Bancolombia. Une fois le paiement confirmé, vous recevez par e-mail les instructions d’accès.',
        nota: 'Ni livraison ni attente',
      },
      {
        titulo: 'Pratiquez à votre rythme',
        texto:
          'Des vidéos courtes et un programme à télécharger pour suivre vos progrès. Chaque cours indique les signaux d’alerte pour savoir quand consulter.',
        nota: '10 à 25 minutes par séance',
      },
    ],
  },
  seccionPostura: {
    eyebrow: 'Gratuit · Avec votre caméra',
    titulo: 'Analysez votre posture pendant l’exercice.',
    texto:
      'Placez-vous face à la caméra, choisissez un exercice : l’application compte vos répétitions et vous prévient tout de suite si le mouvement sort de l’amplitude correcte. Commencez par le squat et l’élévation du bras.',
    boton: 'Essayer l’analyse de posture',
    items: [
      { titulo: 'Il suffit de votre caméra', texto: 'Fonctionne dans le navigateur du téléphone ou de l’ordinateur, sans rien installer.' },
      { titulo: 'Votre vidéo reste sur votre appareil', texto: 'La détection de posture se fait dans votre navigateur. Nous n’enregistrons ni n’envoyons votre vidéo.' },
      { titulo: 'Elle vous dit quoi corriger', texto: 'Elle compte les répétitions, signale celles qui sont correctes et affiche un bilan à la fin.' },
    ],
  },
  cursos: {
    eyebrow: 'Cours en ligne',
    titulo: 'Apprenez à prendre soin de vous, pas à pas.',
    avisoPruebaTitulo: 'Mode test :',
    avisoPrueba: 'les paiements des cours utilisent l’environnement de test de Wompi. Aucun argent réel n’est débité ; utilisez les cartes et données de test de Wompi.',
    nota:
      'Le paiement se fait sur la page sécurisée de Wompi (Bancolombia), en pesos colombiens. Les cours sont numériques : ni livraison ni paiement à la livraison. Une fois le paiement approuvé, vous recevez l’accès à l’adresse e-mail indiquée sur Wompi.',
    chip: 'Cours en ligne',
    comprar: 'Acheter le cours',
    abriendo: 'Ouverture du paiement sécurisé…',
    pronto: 'Bientôt disponible',
    idiomaContenido: 'Les vidéos et les guides des cours sont en espagnol.',
  },
  productos: {
    eyebrow: 'Produits bien-être',
    titulo: 'Ce qu’il vous faut pour votre routine.',
    chip: 'Livraison à domicile',
    nota: 'Choisissez votre pointure et votre couleur, puis payez sur la page sécurisée de Shopify, où vous verrez les frais de livraison avant de confirmer.',
    comprar: 'Acheter',
    abriendo: 'Ouverture du paiement sécurisé…',
    agotado: 'Épuisé',
    elige: 'Choisissez une option',
    opcion: 'Option',
    y: 'et',
    sufijoAgotado: ' (épuisé)',
    opciones: { Color: 'Couleur', 'Talla del calzado': 'Pointure' },
    colores: { negro: 'Noir', beige: 'Beige', celeste: 'Bleu ciel', marron: 'Marron' },
  },
  revision: {
    eyebrow: 'Qui relit le contenu',
    titulo: 'Des exercices simples, relus par un médecin.',
    subtitulo: 'Médecin relecteur',
    texto:
      'Tout le contenu des cours est relu par un médecin avant publication. Les cours sont éducatifs et ne remplacent pas une évaluation professionnelle en personne.',
  },
  cta: {
    titulo: 'Prêt à mieux bouger ?',
    texto: 'Des cours courts, à votre rythme, depuis chez vous.',
    boton: 'Voir les cours',
    nota: 'Paiement en ligne · Accès numérique · Contenu relu par un médecin',
  },
  pie: {
    lema: 'Cours en ligne et produits pour mieux bouger à la maison.',
    tienda: 'Boutique',
    cursos: 'Cours en ligne',
    productos: 'Produits bien-être',
    postura: 'Analysez votre posture',
    politicas: 'Politiques',
    terminos: 'Conditions d’utilisation',
    reembolso: 'Politique de remboursement',
    privacidad: 'Politique de confidentialité',
    envios: 'Livraison',
    contacto: 'Contact',
    escribenos: 'Écrivez-nous',
    ciudad: 'Bogotá, Colombie',
    aviso: 'Contenu éducatif. Il ne remplace pas une consultation, un diagnostic ou un traitement médical.',
    pagos: 'Cours : paiement par Wompi · Produits : paiement par Shopify',
  },
  paginaPostura: {
    metaTitulo: 'Analysez votre posture · BienEstar en Casa',
    metaDescripcion:
      'Faites vos exercices devant la caméra : l’application compte les répétitions et vous prévient si le mouvement sort de l’amplitude correcte. Votre vidéo reste sur votre appareil.',
    eyebrow: 'Gratuit · Avec votre caméra',
    titulo: 'Analysez votre posture.',
    texto:
      'Choisissez un exercice, placez-vous devant la caméra et bougez. L’application détecte votre posture, compte les répétitions et vous prévient tout de suite si le mouvement sort de l’amplitude correcte.',
    consejos: ['Autorisez l’accès à la caméra', 'Choisissez un endroit bien éclairé', 'Reculez jusqu’à ce que votre corps soit visible'],
    appAria: 'Application d’analyse de posture',
    iframeTitulo: 'Analyse de posture avec la caméra',
    pequena: 'Trop petite ?',
    pantallaCompleta: 'Ouvrez-la en plein écran',
    privTitulo: 'Votre vidéo reste sur votre appareil',
    privTexto:
      'La détection de posture se fait dans votre navigateur. Nous n’enregistrons, ne conservons ni n’envoyons votre vidéo à aucun serveur. Seul le modèle de détection est téléchargé lors de la première utilisation.',
    criterioTitulo: 'Utilisez-la avec discernement',
    criterioTexto:
      'C’est un outil éducatif d’accompagnement qui ne remplace pas l’évaluation d’un médecin ou d’un kinésithérapeute. En cas de douleur, de vertige ou de gêne, arrêtez-vous et consultez.',
    rutina: 'Envie d’une routine complète ?',
    verCursos: 'Découvrez nos cours en ligne',
  },
  resultado: {
    metaTitulo: 'Résultat du paiement · BienEstar en Casa',
    eyebrow: 'Résultat du paiement',
    modoPrueba: 'Mode test',
    estados: {
      APPROVED: {
        titulo: 'Paiement approuvé !',
        texto: 'Merci pour votre achat. Dans quelques minutes, vous recevrez l’accès au cours par e-mail. Si vous ne le voyez pas, vérifiez vos courriers indésirables.',
      },
      PENDING: {
        titulo: 'Votre paiement est en cours de traitement',
        texto: 'Wompi confirme encore le paiement. Dès son approbation, nous vous enverrons l’accès par e-mail. Vous pouvez recharger cette page dans quelques minutes.',
      },
      DECLINED: { titulo: 'Le paiement a été refusé', texto: 'Aucun montant n’a été débité. Vous pouvez réessayer avec un autre moyen de paiement.' },
      VOIDED: { titulo: 'Le paiement a été annulé', texto: 'La transaction a été annulée et aucun montant n’a été débité.' },
      ERROR: { titulo: 'Une erreur est survenue lors du paiement', texto: 'Aucun montant n’a été débité. Réessayez dans quelques minutes.' },
    },
    noEncontrado: {
      titulo: 'Paiement introuvable',
      texto: 'Nous n’avons pas pu vérifier cette transaction. Si vous avez payé, écrivez-nous avec la référence que Wompi vous a envoyée par e-mail.',
    },
    curso: 'Cours',
    valor: 'Montant',
    referencia: 'Référence',
    transaccion: 'Transaction Wompi',
    volver: 'Retour aux cours',
    verMas: 'Voir d’autres cours',
    contacto: 'Nous contacter',
  },
  catalogo: {
    'espalda-sana': { titulo: 'Un dos en bonne santé quand on travaille assis', resumen: 'Mini-cours de 5 jours, 10 minutes par jour. Programme PDF inclus.', alt: 'Femme assise devant un ordinateur, le dos soutenu, les pieds au sol et l’écran à hauteur des yeux ; des lignes indiquent la bonne posture.' },
    'rodillas-fuertes': { titulo: 'Genoux solides : prévention et soins', resumen: '6 leçons vidéo et une routine de 4 semaines en PDF.' },
    automasaje: { titulo: 'Auto-massage et récupération musculaire', resumen: '4 vidéos et un guide visuel avec 2 routines.' },
    'bandas-elasticas': { titulo: 'Se renforcer à la maison avec des bandes élastiques', resumen: '5 vidéos courtes et une routine hebdomadaire en PDF.' },
    'frio-o-calor': { titulo: 'Froid ou chaud : gérer les gênes musculaires à la maison', resumen: 'Une vidéo de 20 minutes et une infographie à télécharger.' },
  },
  correo: {
    asunto: 'Votre cours :',
    gracias: 'Merci pour votre achat !',
    curso: 'Cours',
    referencia: 'Référence de paiement',
    acceso: 'Accédez à votre cours ici :',
    pronto: 'Dans les 24 prochaines heures, nous vous enverrons les instructions d’accès à cette adresse.',
    revisado: `Contenu éducatif relu par un médecin · ${registro}.`,
    aviso: 'Il ne remplace pas une consultation, un diagnostic ou un traitement médical.',
  },
};
