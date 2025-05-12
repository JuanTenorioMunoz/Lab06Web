import { useState } from 'react';
import { auth, db } from '../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const handleRegister = async () => {
        try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        await setDoc(doc(db, 'users', uid), {
            username,
            birthDate,
            email,
            profileIsComplete: false
        });

        navigate('/login')

        } catch (error) {
        console.error(error.message);
        }
    };

    const goToLogin = () => {
        navigate('/login')
    };

  return (
    <>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="date" placeholder="Birthdate" onChange={(e) => setBirthDate(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <button onClick={goToLogin}>Login</button>
    </>
  );
};

export default Register;
