import { formatCurrency } from '../util/investment.js';

export default function SummaryCards({ resultsData, initialInvestment, currency }) {
  if (!resultsData || resultsData.length === 0) {
    return null;
  }

  const finalYear = resultsData[resultsData.length - 1];
  const finalValue = finalYear.valueEndOfYear;
  const totalInterest =
    finalYear.valueEndOfYear -
    finalYear.annualInvestment * finalYear.year -
    initialInvestment;
  const totalInvested = finalValue - totalInterest;
  const profitability = totalInvested > 0 ? ((totalInterest / totalInvested) * 100).toFixed(1) : 0;

  return (
    <div className="summary-cards">
      <div className="summary-card highlight">
        <span className="card-label">Patrimônio Final</span>
        <strong className="card-value">{formatCurrency(finalValue, currency)}</strong>
        <span className="card-sub">Após {finalYear.year} anos</span>
      </div>

      <div className="summary-card">
        <span className="card-label">Total Investido</span>
        <strong className="card-value">{formatCurrency(totalInvested, currency)}</strong>
        <span className="card-sub">Capital do seu bolso</span>
      </div>

      <div className="summary-card">
        <span className="card-label">Total em Juros</span>
        <strong className="card-value positive">+{formatCurrency(totalInterest, currency)}</strong>
        <span className="card-sub">Rendimento gerado</span>
      </div>

      <div className="summary-card">
        <span className="card-label">Rentabilidade</span>
        <strong className="card-value positive">+{profitability}%</strong>
        <span className="card-sub">Ganho sobre o capital</span>
      </div>
    </div>
  );
}
