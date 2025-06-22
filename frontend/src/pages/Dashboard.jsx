import { useAuth } from "../context/AuthContext";
import AddMedicationForm from "../components/AddMedicationForm";
import MedicationList from "../components/MedicationList";

import '../styles/Dashboard.css';


export default function Dashboard() {
  const { role, logout } = useAuth();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard ({role})</h1>
        <button onClick={logout} className="logout-button">Logout</button>
      </header>
      <AddMedicationForm />
      <MedicationList />
    </div>
  );
}
