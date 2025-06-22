import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMedications,
  addMedication,
  markMedicationTaken,
} from "../api";

export const useMedications = () => {
  const queryClient = useQueryClient();

  const medsQuery = useQuery({
    queryKey: ["medications"],
    queryFn: getMedications,
  });

  const addMutation = useMutation({
    mutationFn: addMedication,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["medications"] }),
  });

  const markTakenMutation = useMutation({
    mutationFn: markMedicationTaken,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["medications"] }),
  });

  return { medsQuery, addMutation, markTakenMutation };
};
