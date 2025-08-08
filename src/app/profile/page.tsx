import {redirect} from 'next/navigation';
import {defaultLocale} from '@/i18n/request';

export default function ProfileRedirect() {
  // Redirection vers la page profile avec locale par défaut
  redirect(`/${defaultLocale}/profile`);
}
