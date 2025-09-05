import { useEffect, useState } from 'react';
import type { User } from '../interfaces/reqres.response';
import { loadUsersAction } from '../actions/load-users.action';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {

    console.log('🚀 DEBUG - Llamando loadUsersAction con page:', 1);

    loadUsersAction(1).then(setUsers);

  }, []);

  return {
    users,
  };
};



