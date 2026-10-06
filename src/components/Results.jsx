import { calculateInvestmentResults, formatter } from '../util/investment.js';

export default function Results({ input }) {
  const resultsData = calculateInvestmentResults(input);

  if (resultsData.length === 0) {
    return null;
  }

  const initialInvestment =
    resultsData[0].valueEndOfYear -
    resultsData[0].interest -
    resultsData[0].annualInvestment;

  return (
    <div id="results-wrapper">
      <div className="results-header">
        <h2>Investment projection</h2>
        <p>Projected annual value based on your inputs</p>
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
                <td>{formatter.format(yearData.valueEndOfYear)}</td>
                <td>{formatter.format(yearData.interest)}</td>
                <td>{formatter.format(totalInterest)}</td>
                <td>{formatter.format(totalAmountInvested)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
