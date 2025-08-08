import {NavBar} from '@/components/NavBar';
import {AgeGate} from '@/components/AgeGate';

export default function AboutPage() {
  return (
    <div>
      <AgeGate />
      <NavBar />
      <main className="max-w-3xl mx-auto w-full p-6 space-y-6">
        <h1 className="text-2xl font-semibold">About</h1>
        <p className="text-sm text-gray-700">
          Demo portal inspired by 3Hentai.net. This project implements i18n,
          navigation, age verification, catalog pages, and basic pagination.
        </p>
      </main>
    </div>
  );
}


