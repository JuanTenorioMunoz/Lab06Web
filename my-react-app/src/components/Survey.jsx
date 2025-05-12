import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const avatarOptions = ['A', 'B', 'C', 'D'];

const Survey = ({ uid }) => {
  const [avatar, setAvatar] = useState('');
  const [description, setDescription] = useState('');
  const [interests, setInterests] = useState([]);

  const interestOptions = ['arte', 'ciencia', 'juegos', 'tecnología'];

  const toggleInterest = (value) => {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const handleSubmit = async () => {
    await updateDoc(doc(db, 'users', uid), {
      avatar,
      description,
      interests,
      profileCompleted: true
    });
    alert('Perfil completado');
  };

  return (
    <>
      <h3>Selecciona un avatar</h3>
      {avatarOptions.map((a) => (
        <button key={a} onClick={() => setAvatar(a)} style={{ fontSize: 24 }}>
          {a}
        </button>
      ))}
      <h3>Descripción</h3>
      <textarea onChange={(e) => setDescription(e.target.value)} />

      <h3>Intereses</h3>
      {interestOptions.map((interest) => (
        <label key={interest}>
          <input
            type="checkbox"
            checked={interests.includes(interest)}
            onChange={() => toggleInterest(interest)}
          />
          {interest}
        </label>
      ))}

      <button onClick={handleSubmit}>Guardar Perfil</button>
    </>
  );
};

export default Survey;
