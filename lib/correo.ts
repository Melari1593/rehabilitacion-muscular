import 'server-only';
import type { Curso } from './cursos';

// Envía al cliente el correo con el acceso al curso tras un pago aprobado.
// Usa Resend (https://resend.com) si RESEND_API_KEY y CORREO_REMITENTE están configurados;
// si no, solo registra el pedido en los logs de Vercel para enviarlo a mano.
// El enlace de acceso de cada curso se define con CURSO_ACCESO_<SLUG> (ej. CURSO_ACCESO_ESPALDA_SANA).

export async function enviarAccesoCurso({ correo, curso, referencia }: { correo: string; curso: Curso; referencia: string }) {
  const variable = `CURSO_ACCESO_${curso.slug.toUpperCase().replace(/-/g, '_')}`;
  const enlace = process.env[variable];
  const clave = process.env.RESEND_API_KEY;
  const remitente = process.env.CORREO_REMITENTE;

  const texto = [
    '¡Gracias por tu compra!',
    '',
    `Curso: ${curso.titulo}`,
    `Referencia de pago: ${referencia}`,
    '',
    enlace
      ? `Accede a tu curso aquí: ${enlace}`
      : 'En las próximas 24 horas te enviaremos a este correo las instrucciones de acceso.',
    '',
    'Contenido educativo revisado por un médico · Registro médico RETHUS 1018459438.',
    'No reemplaza una consulta, diagnóstico ni tratamiento médico.',
    '',
    'BienEstar en Casa',
  ].join('\n');

  if (!clave || !remitente) {
    console.info(`[pedido] ${referencia} · ${curso.slug} · ${correo} · correo no enviado (falta RESEND_API_KEY o CORREO_REMITENTE)`);
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${clave}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: remitente, to: correo, subject: `Tu curso: ${curso.titulo}`, text: texto }),
  });
  if (!res.ok) {
    console.error(`[pedido] ${referencia} · error al enviar correo: ${res.status} ${await res.text()}`);
    return;
  }
  console.info(`[pedido] ${referencia} · ${curso.slug} · acceso enviado a ${correo}`);
}
