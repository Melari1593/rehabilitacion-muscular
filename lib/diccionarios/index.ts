import type { Idioma } from '../i18n';
import { ar } from './ar';
import { en } from './en';
import { es, type Diccionario } from './es';
import { fr } from './fr';

const DICCIONARIOS: Record<Idioma, Diccionario> = { es, en, fr, ar };

export const diccionario = (idioma: Idioma): Diccionario => DICCIONARIOS[idioma];
export type { Diccionario };
