// src/hooks/useUnsavedChangesWarning.js
import { useEffect } from 'react';

export function useUnsavedChangesWarning(changesMade) {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (changesMade) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [changesMade]);
}
