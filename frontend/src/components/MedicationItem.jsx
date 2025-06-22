import { useMedications } from "../hooks/useMedications";

import '../styles/Item.css';

export default function MedicationItem({ med }) {
  const { markTakenMutation } = useMedications();

  return (
    <li className="med-item">
      <div className="med-details">
        <p className="med-name">{med.name}</p>
        <p className="med-subtext">
          {med.dosage} • {med.frequency}
        </p>
      </div>
      <button
        onClick={() => markTakenMutation.mutate(med.id)}
        disabled={med.takenToday || markTakenMutation.isLoading}
        className={`med-button ${med.takenToday ? "taken" : "not-taken"}`}
      >
        {med.takenToday ? "Taken" : "Mark as Taken"}
      </button>
    </li>
  );
}
