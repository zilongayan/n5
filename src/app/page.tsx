import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirection automatique vers la locale française
  redirect('/fr');
}

