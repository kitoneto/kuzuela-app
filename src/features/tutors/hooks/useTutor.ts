import { useState } from 'react';
import { tutorService } from '../services/tutor.service';
export function useTutor() {
  const [selectedId, setSelectedId] = useState('1');
  const personas = tutorService.getPersonas();
  const selected = tutorService.getPersonaById(selectedId);
  return { personas, selected, selectedId, setSelectedId };
}
