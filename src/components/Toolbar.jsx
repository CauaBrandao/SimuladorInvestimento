export default function Toolbar({
  currency,
  onCurrencyChange,
  theme,
  onThemeChange,
  onReset,
}) {
  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <label className="toolbar-label">Moeda:</label>
        <div className="toggle-buttons">
          <button
            type="button"
            className={`toggle-btn ${currency === 'USD' ? 'active' : ''}`}
            onClick={() => onCurrencyChange('USD')}
            title="Dólar Americano"
          >
            USD ($)
          </button>
          <button
            type="button"
            className={`toggle-btn ${currency === 'BRL' ? 'active' : ''}`}
            onClick={() => onCurrencyChange('BRL')}
            title="Real Brasileiro"
          >
            BRL (R$)
          </button>
          <button
            type="button"
            className={`toggle-btn ${currency === 'EUR' ? 'active' : ''}`}
            onClick={() => onCurrencyChange('EUR')}
            title="Euro Europeu"
          >
            EUR (€)
          </button>
          <button
            type="button"
            className={`toggle-btn ${currency === 'GBP' ? 'active' : ''}`}
            onClick={() => onCurrencyChange('GBP')}
            title="Libra Esterlina"
          >
            GBP (£)
          </button>
        </div>
      </div>

      <div className="toolbar-group">
        <label className="toolbar-label">Tema:</label>
        <div className="toggle-buttons">
          <button
            type="button"
            className={`toggle-btn ${theme === 'emerald' ? 'active' : ''}`}
            onClick={() => onThemeChange('emerald')}
            title="Tema Verde Esmeralda (Padrão Figma)"
          >
            🌿 Esmeralda
          </button>
          <button
            type="button"
            className={`toggle-btn ${theme === 'midnight' ? 'active' : ''}`}
            onClick={() => onThemeChange('midnight')}
            title="Tema Azul Midnight"
          >
            🌌 Midnight
          </button>
          <button
            type="button"
            className={`toggle-btn ${theme === 'light' ? 'active' : ''}`}
            onClick={() => onThemeChange('light')}
            title="Tema Claro"
          >
            ☀️ Claro
          </button>
        </div>
      </div>

      <button
        type="button"
        id="reset-btn"
        className="reset-btn"
        onClick={onReset}
        title="Restaurar valores padrão do simulador"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          <path d="M3 21v-5h5" />
        </svg>
        Redefinir
      </button>
    </div>
  );
}
