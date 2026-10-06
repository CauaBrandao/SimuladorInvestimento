// This function expects a JS object as an argument
// The object should contain the following properties
// - initialInvestment: The initial investment amount
// - annualInvestment: The amount invested every year
// - expectedReturn: The expected (annual) rate of return
// - duration: The investment duration (time frame)
export function calculateInvestmentResults({
  initialInvestment,
  annualInvestment,
  expectedReturn,
  duration,
}) {
  const annualData = [];
  let investmentValue = initialInvestment;

  for (let i = 0; i < duration; i++) {
    const interestEarnedInYear = investmentValue * (expectedReturn / 100);
    investmentValue += interestEarnedInYear + annualInvestment;
    annualData.push({
      year: i + 1, // year identifier
      interest: interestEarnedInYear, // the amount of interest earned in this year
      valueEndOfYear: investmentValue, // investment value at end of year
      annualInvestment: annualInvestment, // investment added in this year
    });
  }

  return annualData;
}

// Formatador padrão original USD para compatibilidade
export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// Mapa de localizações para moedas suportadas
const CURRENCY_LOCALES = {
  USD: 'en-US',
  BRL: 'pt-BR',
  EUR: 'de-DE',
  GBP: 'en-GB',
};

// Formatador dinâmico com suporte a USD, BRL, EUR e GBP
export function formatCurrency(amount, currency = 'USD') {
  const locale = CURRENCY_LOCALES[currency] || 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Função segura para download de arquivos sem revogação prematura de URL
function triggerDownload(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('download', filename);
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();

  // Espera 2 segundos antes de revogar a URL para o Chrome/Edge concluir o download com o nome correto
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 2000);
}

// Exportar como planilha Excel (.xls formatada com tabela HTML nativa reconhecida pelo Microsoft Excel)
export function exportToExcel(resultsData, initialInvestment, currency = 'USD') {
  const rows = resultsData.map((yearData) => {
    const totalInterest =
      yearData.valueEndOfYear -
      yearData.annualInvestment * yearData.year -
      initialInvestment;
    const totalAmountInvested = yearData.valueEndOfYear - totalInterest;

    return `
      <tr>
        <td style="text-align: center;">${yearData.year}</td>
        <td style="text-align: right;">${formatCurrency(yearData.valueEndOfYear, currency)}</td>
        <td style="text-align: right;">${formatCurrency(yearData.interest, currency)}</td>
        <td style="text-align: right;">${formatCurrency(totalInterest, currency)}</td>
        <td style="text-align: right;">${formatCurrency(totalAmountInvested, currency)}</td>
      </tr>
    `;
  }).join('');

  const excelTable = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>Simulação de Investimento</x:Name>
              <x:WorksheetOptions>
                <x:DisplayGridlines/>
              </x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>
      <style>
        th { background-color: #1e533c; color: #ffffff; font-weight: bold; padding: 8px; border: 1px solid #cccccc; }
        td { padding: 6px; border: 1px solid #cccccc; }
      </style>
    </head>
    <body>
      <table>
        <thead>
          <tr>
            <th>Ano</th>
            <th>Valor Acumulado (${currency})</th>
            <th>Juros do Ano (${currency})</th>
            <th>Total de Juros (${currency})</th>
            <th>Capital Investido (${currency})</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </body>
    </html>
  `;

  triggerDownload(
    excelTable,
    `simulacao_investimento_${currency}.xls`,
    'application/vnd.ms-excel;charset=utf-8'
  );
}

// Exportar como CSV universal
export function exportToCSV(resultsData, initialInvestment, currency = 'USD') {
  const delimiter = currency === 'BRL' || currency === 'EUR' ? ';' : ',';

  const headers = [
    'Ano',
    `Valor Acumulado (${currency})`,
    `Juros do Ano (${currency})`,
    `Total de Juros (${currency})`,
    `Capital Investido (${currency})`,
  ];

  const rows = resultsData.map((yearData) => {
    const totalInterest =
      yearData.valueEndOfYear -
      yearData.annualInvestment * yearData.year -
      initialInvestment;
    const totalAmountInvested = yearData.valueEndOfYear - totalInterest;

    return [
      yearData.year,
      Math.round(yearData.valueEndOfYear),
      Math.round(yearData.interest),
      Math.round(totalInterest),
      Math.round(totalAmountInvested),
    ].join(delimiter);
  });

  const csvContent = '\uFEFF' + [headers.join(delimiter), ...rows].join('\r\n');
  
  triggerDownload(
    csvContent,
    `simulacao_investimento_${currency}.csv`,
    'text/csv;charset=utf-8;'
  );
}
