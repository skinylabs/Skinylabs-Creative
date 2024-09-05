import { useState, useEffect } from 'react';

const useUserRole = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch('/api/user-role', {
          credentials: 'include', // Jika menggunakan cookies untuk session
        });
        const data = await response.json();
        setRole(data.role);
      } catch (error) {
        console.error('Failed to fetch user role:', error);
        setRole(null);
      }
    };

    fetchUserRole();
  }, []);

  return role;
};

export default useUserRole;
