import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const conditionsList = [
  { key: 'length', text: 'At least 10 characters', check: (password: string) => password.length >= 10 },
  { key: 'uppercase', text: 'At least two uppercase letters', check: (password: string) => (password.match(/[A-Z]/g) || []).length >= 2 },
  { key: 'lowercase', text: 'At least three lowercase letters', check: (password: string) => (password.match(/[a-z]/g) || []).length >= 3 },
  { key: 'digit', text: 'At least three digits', check: (password: string) => (password.match(/\d/g) || []).length >= 3 },
  { key: 'specialChar', text: 'At least two special characters', check: (password: string) => (password.match(/[\W_]/g) || []).length >= 2 },
  { key: 'funny', text: 'Must include the word "banana"', check: (password: string) => password.includes('banana') },
  { key: 'emoji', text: 'Must contain at least one emoji 😃', check: (password: string) => /[\u{1F600}-\u{1F64F}]/u.test(password) },
];

const getRandomConditions = () => {
  const shuffled = conditionsList.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5); // Get 5 random conditions
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ForgotPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [currentConditions, setCurrentConditions] = useState(getRandomConditions());
  const [metConditions, setMetConditions] = useState<string[]>([]);
  const [shake, setShake] = useState(false);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [flash, setFlash] = useState(false);
  const [jump, setJump] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert('You can never set a new password! 😜');
    shakeScreen();
    jumpTitle();
  };

  const shakeScreen = () => {
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 1000);
  };

  const jumpTitle = () => {
    setJump(true);
    setTimeout(() => {
      setJump(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const satisfiedConditions = conditionsList.filter(condition => condition.check(newPassword)).map(condition => condition.text);
    setMetConditions(satisfiedConditions);

    setCurrentConditions(getRandomConditions());
    setBgColor(getRandomColor());
    setFlash(true);
    setTimeout(() => {
      setFlash(false);
    }, 500);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        position: 'relative',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
          padding: '40px',
          backgroundColor: bgColor,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          borderRadius: '8px',
          transition: 'all 0.5s ease',
          animation: shake ? 'shake 0.5s' : 'none',
          transform: jump ? 'scale(1.1)' : 'scale(1)', // Dramatic expansion
        }}
      >
        <h1
          style={{
            marginBottom: '20px',
            fontSize: flash ? '2.5em' : '2em',
            color: flash ? 'red' : 'black',
            transition: 'all 0.3s ease',
            animation: jump ? 'spin 0.5s linear infinite, jump 0.5s' : 'none', // Spin and jump effect
          }}
        >
          Forgot Password
        </h1>
        <TextField
          label="New Password"
          type="text"
          value={password}
          onChange={handleChange}
          required
          style={{ width: '300px' }}
        />
        
        {/* Password conditions list */}
        <List>
          {currentConditions.map(({ key, text }) => (
            <ListItem key={key}>
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  style: { color: 'black', fontWeight: 'bold', fontSize: '1.2em' },
                }}
              />
            </ListItem>
          ))}
        </List>

        {/* Met conditions display */}
        <List>
          {metConditions.length > 0 && (
            <>
              <ListItem>
                <ListItemText
                  primary="Conditions Met:"
                  primaryTypographyProps={{
                    style: { fontWeight: 'bold', fontSize: '1.5em', color: 'green' },
                  }}
                />
              </ListItem>
              {metConditions.map((condition, index) => (
                <ListItem key={index}>
                  <ListItemText primary={condition} />
                </ListItem>
              ))}
            </>
          )}
        </List>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{
            width: '150px',
            transform: shake ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.2s ease',
          }}
        >
          Reset Password
        </Button>
      </form>

      {/* Inline CSS for aggressive animations */}
      <style>
        {`
          @keyframes shake {
            0% { transform: translate(1px, 0); }
            10% { transform: translate(-1px, 0); }
            20% { transform: translate(1px, 0); }
            30% { transform: translate(-1px, 0); }
            40% { transform: translate(1px, 0); }
            50% { transform: translate(-1px, 0); }
            60% { transform: translate(1px, 0); }
            70% { transform: translate(-1px, 0); }
            80% { transform: translate(1px, 0); }
            90% { transform: translate(-1px, 0); }
            100% { transform: translate(0, 0); }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes jump {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default ForgotPassword;
