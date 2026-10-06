import { useState, useEffect } from 'react';

import Header from './components/Header.jsx';
import UserInput from './components/UserInput.jsx';
import Results from './components/Results.jsx';
import Toolbar from './components/Toolbar.jsx';

const DEFAULT_INPUTS = {
  initialInvestment: 10000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10,
};

function App() {
  const [userInput, setUserInput] = useState(DEFAULT_INPUTS);
  const [currency, setCurrency] = useState('USD');
  const [theme, setTheme] = useState('emerald');

  // Atualiza atributo data-theme no elemento raiz ou body para alternar temas
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [inputIdentifier]: newValue === '' ? '' : +newValue,
    }));
  }

  function handleReset() {
    setUserInput({ ...DEFAULT_INPUTS });
  }

  function handleClear() {
    setUserInput({
      initialInvestment: '',
      annualInvestment: '',
      expectedReturn: '',
      duration: '',
    });
  }

  const sanitizedInput = {
    initialInvestment: Number(userInput.initialInvestment) || 0,
    annualInvestment: Number(userInput.annualInvestment) || 0,
    expectedReturn: Number(userInput.expectedReturn) || 0,
    duration: Number(userInput.duration) || 0,
  };

  const inputIsValid = sanitizedInput.duration >= 1;

  return (
    <main>
      <Toolbar
        currency={currency}
        onCurrencyChange={setCurrency}
        theme={theme}
        onThemeChange={setTheme}
        onReset={handleReset}
      />
      <Header />
      <UserInput
        userInput={userInput}
        onChange={handleChange}
        onReset={handleReset}
        onClear={handleClear}
      />
      {!inputIsValid && (
        <p className="center">Please enter a duration greater than zero.</p>
      )}
      {inputIsValid && <Results input={sanitizedInput} currency={currency} />}
    </main>
  );
}

export default App;
