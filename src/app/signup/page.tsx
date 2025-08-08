import {redirect} from 'next/navigation';
import {defaultLocale} from '@/i18n/request';

export default function SignupRedirect() {
  // Redirection vers la page signup avec locale par défaut
  redirect(`/${defaultLocale}/signup`);
}
