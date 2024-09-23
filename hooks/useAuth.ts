// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react'; // This depends on your actual Kinde setup

export function useAuth() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession(); // Replace with your actual method
      setSession(session);
      setLoading(false);
    };

    fetchSession();
  }, []);

  return { session, loading };
}
