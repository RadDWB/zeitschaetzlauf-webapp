import React, { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    zielzeit: "",
    istzeit: "",
    rundenzeiten: ""
  });

  return (
    <div className="p-4 space-y-6 max-w-xl mx-auto">
      <div className="rounded-xl border p-4 shadow space-y-4 pt-4">
        <input
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          placeholder="Zielzeit (mm:ss)"
          value={formData.zielzeit}
          onChange={(e) => setFormData({ ...formData, zielzeit: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          placeholder="Ist-Zeit (mm:ss)"
          value={formData.istzeit}
          onChange={(e) => setFormData({ ...formData, istzeit: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          placeholder="Rundenzeiten (13 Werte, Komma getrennt)"
          value={formData.rundenzeiten}
          onChange={(e) => setFormData({ ...formData, rundenzeiten: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
    </div>
  );
};

export default Page;
