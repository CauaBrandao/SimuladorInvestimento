export default function UserInput({
  userInput,
  onChange,
  onReset,
  onClear,
}) {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>INITIAL INVESTMENT</label>
          <input
            type="number"
            min="0"
            step="100"
            required
            placeholder="Ex: 10000"
            value={userInput.initialInvestment}
            onChange={(event) =>
              onChange('initialInvestment', event.target.value)
            }
          />
        </p>
        <p>
          <label>ANNUAL INVESTMENT</label>
          <input
            type="number"
            min="0"
            step="50"
            required
            placeholder="Ex: 1200"
            value={userInput.annualInvestment}
            onChange={(event) =>
              onChange('annualInvestment', event.target.value)
            }
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>EXPECTED RETURN (%)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            required
            placeholder="Ex: 6"
            value={userInput.expectedReturn}
            onChange={(event) =>
              onChange('expectedReturn', event.target.value)
            }
          />
        </p>
        <p>
          <label>DURATION (YEARS)</label>
          <input
            type="number"
            min="1"
            max="100"
            required
            placeholder="Ex: 10"
            value={userInput.duration}
            onChange={(event) =>
              onChange('duration', event.target.value)
            }
          />
        </p>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="form-btn outline"
          onClick={onClear}
          title="Limpar todos os campos para preencher do zero"
        >
          Limpar Campos
        </button>
        <button
          type="button"
          className="form-btn primary"
          onClick={onReset}
          title="Redefinir para os valores padrão do exercício"
        >
          Restaurar Padrão
        </button>
      </div>
    </section>
  );
}
