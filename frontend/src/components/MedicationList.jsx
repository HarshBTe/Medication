import MedicationItem from "./MedicationItem";
import { useMedications } from "../hooks/useMedications";

import '../styles/List.css';


export default function MedicationList() {
  const { medsQuery } = useMedications();

  if (medsQuery.isLoading) return <p className="med-loading">Loading medications…</p>;
  if (medsQuery.isError) return <p className="med-error">Error loading medications</p>;

  const meds = medsQuery.data.data;

  return (
    <ul className="med-list">
      {meds.length === 0 && <p className="med-empty">No medications added yet.</p>}
      {meds.map((m) => (
        <MedicationItem key={m.id} med={m} />
      ))}
    </ul>
  );
}
