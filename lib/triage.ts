// Guía de Triage: chat de orientación (proyecto melari1593/triage-project-), copiado en /public/triage.
//
// Sus guiones clínicos deben pasar la revisión médica en dos fases antes de usarse con pacientes reales.
// Mientras tanto, la página /<idioma>/orientacion existe pero NO aparece en el menú ni en buscadores.
// Cuando ambas revisiones estén aprobadas, define TRIAGE_PUBLICO=1 en Vercel para enlazarla en el sitio.
export const TRIAGE_PUBLICO = process.env.TRIAGE_PUBLICO === '1';

export const RUTA_TRIAGE = '/orientacion';
export const APP_TRIAGE = '/triage/index.html';
