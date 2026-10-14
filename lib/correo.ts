import 'server-only';
import type { Curso } from './cursos';
import { diccionario } from './diccionarios';
import type { Idioma } from './i18n';

// Envía al cliente el correo con el acceso al curso tras un pago aprobado, en el idioma en que compró.
// Usa Resend (https://resend.com) si RESEND_API_KEY y CORREO_REMITENTE están configurados;
// si no, solo registra el pedido en los logs de Vercel para enviarlo a mano.
// El enlace de acceso de cada curso se define con CURSO_ACCESO_<SLUG> (ej. CURSO_ACCESO_ESPALDA_SANA).

export async function enviarAccesoCurso({ correo, curso, referencia, idioma }: { correo: string; curso: Curso; referencia: string; idioma: Idioma }) {
  const t = diccionario(idioma);
  const titulo = t.catalogo[curso.slug]?.titulo ?? curso.slug;
  const variable = `CURSO_ACCESO_${curso.slug.toUpperCase().replace(/-/g, '_')}`;
  const enlace = process.env[variable];
  const clave = process.env.RESEND_API_KEY;
  const remitente = process.env.CORREO_REMITENTE;

  const texto = [
    t.correo.gracias,
    '',
    `${t.correo.curso}: ${titulo}`,
    `${t.correo.referencia}: ${referencia}`,
    '',
    enlace ? `${t.correo.acceso} ${enlace}` : t.correo.pronto,
    ...(t.cursos.idiomaContenido ? ['', t.cursos.idiomaContenido] : []),
    '',
    t.correo.revisado,
    t.correo.aviso,
    '',
    'BienEstar en Casa',
  ].join('\n');

  if (!clave || !remitente) {
    console.info(`[pedido] ${referencia} · ${curso.slug} · ${idioma} · ${correo} · correo no enviado (falta RESEND_API_KEY o CORREO_REMITENTE)`);
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${clave}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: remitente, to: correo, subject: `${t.correo.asunto} ${titulo}`, text: texto }),
  });
  if (!res.ok) {
    console.error(`[pedido] ${referencia} · error al enviar correo: ${res.status} ${await res.text()}`);
    return;
  }
  console.info(`[pedido] ${referencia} · ${curso.slug} · ${idioma} · acceso enviado a ${correo}`);
}
