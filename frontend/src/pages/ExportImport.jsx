import React from 'react';

const ExportImport = ({ transactions }) => {
  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Type', 'Amount', 'Description', 'Category', 'Date'];
    const rows = transactions.map(t => [t.type, t.amount, t.description, t.category, new Date(t.date).toLocaleDateString()]);
    let csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to PDF (simple table)
  const handleExportPDF = () => {
    window.print(); // For demo, prints the page
  };

  // Import from CSV
  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      // Parse CSV and send to backend (not implemented here)
      alert('CSV import feature coming soon!');
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', background: '#fff', padding: 20, borderRadius: 8 }}>
      <h2>Export / Import Transactions</h2>
      <button onClick={handleExportCSV}>Export to CSV</button>
      <button onClick={handleExportPDF} style={{ marginLeft: 10 }}>Export to PDF</button>
      <div style={{ marginTop: 20 }}>
        <input type="file" accept=".csv" onChange={handleImportCSV} />
      </div>
      <p style={{ marginTop: 10, color: '#777' }}>PDF export uses browser print for demo. CSV import is a placeholder.</p>
    </div>
  );
};

export default ExportImport;
