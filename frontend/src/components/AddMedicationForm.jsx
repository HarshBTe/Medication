import { useState } from "react";
import { useMedications } from "../hooks/useMedications";

import '../styles/AddMedicine.css';


export default function AddMedicationForm() {
  const [form, setForm] = useState({ name: "", dosage: "", frequency: "" });
  const [error, setError] = useState("");
  const { addMutation } = useMedications();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.dosage || !form.frequency) {
      setError("All fields are required");
      return;
    }
    setError("");
    addMutation.mutate(form, {
      onError: () => setError("Failed to add medication"),
      onSuccess: () => setForm({ name: "", dosage: "", frequency: "" }),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="med-form">
      <h2 className="med-form-title">Add Medication</h2>
      <div className="med-form-grid">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="med-input"
        />
        <input
          name="dosage"
          placeholder="Dosage (e.g., 10mg)"
          value={form.dosage}
          onChange={handleChange}
          className="med-input"
        />
        <input
          name="frequency"
          placeholder="Frequency (e.g., Once a day)"
          value={form.frequency}
          onChange={handleChange}
          className="med-input"
        />
      </div>
      {error && <p className="med-error">{error}</p>}
      <button
        type="submit"
        disabled={addMutation.isLoading}
        className="med-button"
      >
        {addMutation.isLoading ? "Saving..." : "Add"}
      </button>
    </form>
  );
}
