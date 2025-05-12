import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import Survey from '../../components/Survey';


const Dashboard = () => {
  const uid = useSelector((state) => state.auth.uid);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!uid) return;
    const fetchData = async () => {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) setUserData(userSnap.data());
    };
    fetchData();
  }, [uid]);

  if (!userData) return <p>Cargando...</p>;

  return (
    <>
      <h2>Bienvenido, {userData.username}</h2>
      <p>Correo: {userData.email}</p>
      <p>Fecha de nacimiento: {userData.birthDate}</p>

      {!userData.profileCompleted ? (
        <Survey uid={uid} />
      ) : (
        <p>Tu perfil está completo ✅</p>
      )}
    </>
  );
};

export default Dashboard;
