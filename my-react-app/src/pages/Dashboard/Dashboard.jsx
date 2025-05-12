import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Survey from '../../components/Survey';

const Dashboard = () => {
  const [uid, setUid] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUid(user.uid);
      else setUid(null); 
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!uid) return;
    const fetchData = async () => {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) setUserData(userSnap.data());
    };
    fetchData();
  }, [uid]);

  if (!uid) return <p>Esperando autenticación...</p>;
  if (!userData) return <p>Cargando perfil...</p>;

  return (
    <>
      <h2>Bienvenido, {userData.username}</h2>
      <p>Correo: {userData.email}</p>
      <p>Fecha de nacimiento: {userData.birthDate}</p>

      {!userData.profileCompleted ? (
        <Survey uid={uid} onComplete={() => {
          const refetch = async () => {
            const userRef = doc(db, 'users', uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) setUserData(userSnap.data());
          };
          refetch();
        }} />
      ) : (
        <>
          <p>Avatar: {userData.avatar}</p>
          <p>Descripción: {userData.description}</p>
          <p>Intereses: {userData.interests?.join(', ')}</p>
        </>
      )}
    </>
  );
};

export default Dashboard;
