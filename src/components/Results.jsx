import { calculateInvestmentResults, formatCurrency, exportToCSV, exportToExcel } from '../util/investment.js';
import SummaryCards from './SummaryCards.jsx';

export default function Results({ input, currency = 'USD' }) {
  const resultsData = calculateInvestmentResults(input);

  if (resultsData.length === 0) {
    return null;
  }

  const initialInvestment =
    resultsData[0].valueEndOfYear -
    resultsData[0].interest -
    resultsData[0].annualInvestment;

  function handleExportExcel() {
    exportToExcel(resultsData, initialInvestment, currency);
  }

  function handleExportCSV() {
    exportToCSV(resultsData, initialInvestment, currency);
  }

  return (
    <div id="results-wrapper">
      <SummaryCards
        resultsData={resultsData}
        initialInvestment={initialInvestment}
        currency={currency}
      />

      <div className="results-header">
        <div>
          <h2>Investment projection</h2>
          <p>Projected annual value based on your inputs</p>
        </div>
        <div className="export-buttons">
          <button
            className="export-btn excel"
            onClick={handleExportExcel}
            title="Baixar planilha formatada diretamente para o Microsoft Excel (.xls)"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="8" y1="13" x2="16" y2="13" />
              <line x1="8" y1="17" x2="16" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Baixar Excel (.xls)
          </button>
          <button
            className="export-btn csv"
            onClick={handleExportCSV}
            title="Baixar dados em formato CSV universal"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Baixar CSV
          </button>
        </div>
      </div>

      <table id="result">
        <thead>
          <tr>
            <th>YEAR</th>
            <th>INVESTMENT VALUE</th>
            <th>INTEREST (YEAR)</th>
            <th>TOTAL INTEREST</th>
            <th>INVESTED CAPITAL</th>
          </tr>
        </thead>
        <tbody>
          {resultsData.map((yearData) => {
            const totalInterest =
              yearData.valueEndOfYear -
              yearData.annualInvestment * yearData.year -
              initialInvestment;
            const totalAmountInvested = yearData.valueEndOfYear - totalInterest;

            return (
              <tr key={yearData.year}>
                <td>{yearData.year}</td>
                <td>{formatCurrency(yearData.valueEndOfYear, currency)}</td>
                <td>{formatCurrency(yearData.interest, currency)}</td>
                <td>{formatCurrency(totalInterest, currency)}</td>
                <td>{formatCurrency(totalAmountInvested, currency)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
