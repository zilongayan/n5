import {redirect} from 'next/navigation';
import {defaultLocale} from '@/i18n/request';

export default function LoginRedirect() {
  // Redirection vers la page login avec locale par défaut
  redirect(`/${defaultLocale}/login`);
}
