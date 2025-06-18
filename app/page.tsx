
'use client';
import { useState } from "react";

const Card = ({ children }) => <div className="rounded-xl border p-4 shadow">{children}</div>;
const CardContent = ({ children }) => <div className="pt-2">{children}</div>;

const Input = (props) => <input className="w-full px-4 py-2 border rounded" {...props} />;
const Button = ({ children, ...props }) => (<button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" {...props}>{children}</button>);
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Page() {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    zielzeit: "",
    istzeit: "",
    rundenzeiten: ""
  });

  function timeToSeconds(time) {
    const [min, sec] = time.split(":").map(Number);
    return min * 60 + sec;
  }

  function calcDeviation(ziel, ist) {
    return Math.abs(ist - ziel) / ziel * 100;
  }

  function stdDev(values) {
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const squareDiffs = values.map(v => Math.pow(v - avg, 2));
    return Math.sqrt(squareDiffs.reduce((a, b) => a + b, 0) / values.length);
  }

  function scoreDeviation(pct) {
    if (pct <= 1) return 10;
    if (pct <= 2) return 9;
    if (pct <= 3) return 8;
    if (pct <= 4) return 7;
    if (pct <= 5) return 6;
    if (pct <= 6) return 5;
    if (pct <= 7) return 4;
    if (pct <= 8) return 3;
    if (pct <= 10) return 2;
    return 1;
  }

  function scoreConsistency(std) {
    if (std <= 2) return 5;
    if (std <= 4) return 4;
    if (std <= 6) return 3;
    if (std <= 8) return 2;
    return 1;
  }

  const handleSubmit = () => {
    const ziel = timeToSeconds(formData.zielzeit);
    const ist = timeToSeconds(formData.istzeit);
    const runden = formData.rundenzeiten.split(",").map(r => Number(r.trim())).filter(Boolean);
    if (runden.length !== 13) {
      alert("Bitte genau 13 Rundenzeiten angeben.");
      return;
    }
    const deviation = calcDeviation(ziel, ist);
    const std = stdDev(runden);
    const pointsZiel = scoreDeviation(deviation);
    const pointsKonstanz = scoreConsistency(std);
    const total = pointsZiel + pointsKonstanz;
    setEntries([...entries, {
      name: formData.name,
      total,
      deviation: deviation.toFixed(2),
      std: std.toFixed(2),
      pointsZiel,
      pointsKonstanz
    }]);
    setFormData({ name: "", zielzeit: "", istzeit: "", rundenzeiten: "" });
  };

  return (
    <div className="p-4 space-y-6 max-w-xl mx-auto">
      <Card>
        <CardContent className="space-y-4 pt-4">
          <Input placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          <Input placeholder="Zielzeit (mm:ss)" value={formData.zielzeit} onChange={e => setFormData({ ...formData, zielzeit: e.target.value })} />
          <Input placeholder="Ist-Zeit (mm:ss)" value={formData.istzeit} onChange={e => setFormData({ ...formData, istzeit: e.target.value })} />
          <Input placeholder="Rundenzeiten (13 Werte, Komma getrennt)" value={formData.rundenzeiten} onChange={e => setFormData({ ...formData, rundenzeiten: e.target.value })} />
          <Button onClick={handleSubmit}>Auswertung hinzufügen</Button>
        </CardContent>
      </Card>

      {entries.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={entries} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
