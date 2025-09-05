import { useEffect, useRef, useState } from 'react';
import type { User } from '../interfaces/reqres.response';
import { loadUsersAction } from '../actions/load-users.action';
import { useRef as reactUseRef } from 'react';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const currentPageRef = useRef(1);

  useEffect(() => {
    loadUsersAction(1).then(setUsers);
  }, []);

  const nextPage = async () => {
    currentPageRef.current++;
    const users = await loadUsersAction(currentPageRef.current);

    if (users.length > 0) {
      setUsers(users);
    } else {
      currentPageRef.current--;
    }
  };

  const prevPage = async () => {
    if (currentPageRef.current < 2) return;

    currentPageRef.current--;

    const users = await loadUsersAction(currentPageRef.current);
    setUsers(users);
  };

  return {
    users,

    nextPage,
    prevPage,
  };
};



