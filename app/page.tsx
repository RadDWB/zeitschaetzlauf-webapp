'use client';

import { useState } from 'react';

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-xl border p-4 shadow bg-white">{children}</div>
);
const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="pt-2">{children}</div>
);
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input className="w-full px-4 py-2 border rounded" {...props} />
);

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    zielzeit: '',
    istzeit: '',
    rundenzeiten: '',
  });

  const [ergebnis, setErgebnis] = useState<string | null>(null);

  const berechneAbweichung = () => {
    const ziel = parseZeit(formData.zielzeit);
    const ist = parseZeit(formData.istzeit);
    if (ziel !== null && ist !== null) {
      const diff = Math.abs(ziel - ist);
      setErgebnis(`Abweichung: ${diff} Sekunden`);
    } else {
      setErgebnis('Bitte gültige Zeiten im Format mm:ss eingeben.');
    }
  };

  const parseZeit = (s: string) => {
    const [min, sec] = s.split(':').map(Number);
    if (isNaN(min) || isNaN(sec)) return null;
    return min * 60 + sec;
  };

  return (
    <div className="p-4 space-y-6 max-w-xl mx-auto">
      <Card>
        <CardContent className="space-y-4 pt-4">
          <Input placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <Input placeholder="Zielzeit (mm:ss)" value={formData.zielzeit} onChange={(e) => setFormData({ ...formData, zielzeit: e.target.value })} />
          <Input placeholder="Ist-Zeit (mm:ss)" value={formData.istzeit} onChange={(e) => setFormData({ ...formData, istzeit: e.target.value })} />
          <Input placeholder="Rundenzeiten (13 Werte, Komma getrennt)" value={formData.rundenzeiten} onChange={(e) => setFormData({ ...formData, rundenzeiten: e.target.value })} />
          <button onClick={berechneAbweichung} className="px-4 py-2 bg-blue-600 text-white rounded">Berechnen</button>
          {ergebnis && <p className="text-lg">{ergebnis}</p>}
        </CardContent>
      </Card>
    </div>
  );
}