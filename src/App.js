import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputs, setInputs] = useState({
    piecesRequired: 50,
    pieceWidth: 300,
    pieceLength: 3000,
    sheetWidth: 1220,
    sheetLength: 3000,
    availableCoilLength: 150
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);
    // Ensure non-negative values
    setInputs(prev => ({
      ...prev,
      [name]: numValue >= 0 ? numValue : 0
    }));
  };

  const handleReset = () => {
    setInputs({
      piecesRequired: 50,
      pieceWidth: 300,
      pieceLength: 3000,
      sheetWidth: 1220,
      sheetLength: 3000,
      availableCoilLength: 150
    });
    setResults(null);
  };

  const calculate = () => {
    const {
      piecesRequired,
      pieceWidth,
      pieceLength,
      sheetWidth,
      sheetLength
    } = inputs;

    // Calculate pieces per sheet
    const piecesPerSheet = Math.floor(sheetWidth / pieceWidth);
    
    // Calculate sheets needed
    const sheetsNeeded = Math.ceil(piecesRequired / piecesPerSheet);
    
    // Calculate total pieces obtained
    const piecesObtained = sheetsNeeded * piecesPerSheet;
    
    // Calculate extra pieces
    const extraPieces = piecesObtained - piecesRequired;
    
    // Calculate scrap
    const widthUsed = piecesPerSheet * pieceWidth;
    const scrapWidth = sheetWidth - widthUsed;
    
    // Calculate utilization
    const widthUtilization = (widthUsed / sheetWidth) * 100;
    const lengthUtilization = pieceLength === sheetLength ? 100 : (pieceLength / sheetLength) * 100;
    
    setResults({
      piecesPerSheet,
      sheetsNeeded,
      piecesObtained,
      extraPieces,
      scrapWidth,
      widthUtilization,
      lengthUtilization,
      widthUsed
    });
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Material Cutting Calculator</h1>
        <p className="subtitle">Civil Engineering - Sheet Material Optimization</p>

        <div className="calculator-grid">
          {/* Input Section */}
          <div className="input-section">
            <h2>Input Parameters</h2>
            
            <div className="input-group">
              <h3>Required Finished Parts</h3>
              <div className="input-field">
                <label>Number of Pieces</label>
                <input
                  type="number"
                  name="piecesRequired"
                  value={inputs.piecesRequired}
                  onChange={handleInputChange}
                  placeholder="e.g., 50"
                  min="0"
                />
              </div>
              <div className="input-field">
                <label>Piece Width (mm)</label>
                <input
                  type="number"
                  name="pieceWidth"
                  value={inputs.pieceWidth}
                  onChange={handleInputChange}
                  placeholder="e.g., 300"
                  min="0"
                />
              </div>
              <div className="input-field">
                <label>Piece Length (mm)</label>
                <input
                  type="number"
                  name="pieceLength"
                  value={inputs.pieceLength}
                  onChange={handleInputChange}
                  placeholder="e.g., 3000"
                  min="0"
                />
              </div>
            </div>

            <div className="input-group">
              <h3>Raw Material Sheet Size</h3>
              <div className="input-field">
                <label>Sheet Width (mm)</label>
                <input
                  type="number"
                  name="sheetWidth"
                  value={inputs.sheetWidth}
                  onChange={handleInputChange}
                  placeholder="e.g., 1220"
                  min="0"
                />
              </div>
              <div className="input-field">
                <label>Sheet Length (mm)</label>
                <input
                  type="number"
                  name="sheetLength"
                  value={inputs.sheetLength}
                  onChange={handleInputChange}
                  placeholder="e.g., 3000"
                  min="0"
                />
              </div>
            </div>

            <div className="input-group">
              <h3>Optional</h3>
              <div className="input-field">
                <label>Available Coil Length (meters)</label>
                <input
                  type="number"
                  name="availableCoilLength"
                  value={inputs.availableCoilLength}
                  onChange={handleInputChange}
                  placeholder="e.g., 150"
                  min="0"
                />
              </div>
            </div>

            <div className="button-group">
              <button className="calculate-btn" onClick={calculate}>
                Calculate
              </button>
              <button className="reset-btn" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>

          {/* Results Section */}
          {results && (
            <div className="results-section">
              <h2>Calculation Results</h2>
              
              <div className="results-table">
                <div className="result-row">
                  <span className="result-label">Pieces Required</span>
                  <span className="result-value">{inputs.piecesRequired} pcs</span>
                </div>
                <div className="result-row highlight">
                  <span className="result-label">Sheets Needed</span>
                  <span className="result-value">{results.sheetsNeeded} sheets</span>
                </div>
                <div className="result-row">
                  <span className="result-label">Pieces Obtained</span>
                  <span className="result-value">{results.piecesObtained} pcs</span>
                </div>
                <div className="result-row success">
                  <span className="result-label">Extra Pieces</span>
                  <span className="result-value">{results.extraPieces} pcs</span>
                </div>
                <div className="result-row warning">
                  <span className="result-label">Scrap (width)</span>
                  <span className="result-value">{results.scrapWidth} mm per sheet</span>
                </div>
                <div className="result-row">
                  <span className="result-label">Utilization</span>
                  <span className="result-value">≈ {results.widthUtilization.toFixed(2)}%</span>
                </div>
              </div>

              <div className="calculation-details">
                <h3>Calculation Breakdown</h3>
                <div className="detail-box">
                  <p><strong>Pieces per sheet:</strong></p>
                  <p className="formula">⌊{inputs.sheetWidth} ÷ {inputs.pieceWidth}⌋ = {results.piecesPerSheet} pcs/sheet</p>
                </div>
                <div className="detail-box">
                  <p><strong>Width used:</strong></p>
                  <p className="formula">{results.piecesPerSheet} × {inputs.pieceWidth} = {results.widthUsed} mm</p>
                </div>
                <div className="detail-box">
                  <p><strong>Width utilization:</strong></p>
                  <p className="formula">{results.widthUsed} ÷ {inputs.sheetWidth} = {results.widthUtilization.toFixed(2)}%</p>
                </div>
                <div className="detail-box">
                  <p><strong>Length utilization:</strong></p>
                  <p className="formula">{results.lengthUtilization.toFixed(2)}% {inputs.pieceLength === inputs.sheetLength ? '(exact match)' : ''}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

