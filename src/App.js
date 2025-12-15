import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputs, setInputs] = useState({
    // Finish Product specs
    thickness: '',
    totalWidth: '',
    lengthPerPcs: '',
    noOfPcs: '',
    // Raw Material specs
    sheetWidth: '',
    sheetLength: '',
    // Pricing
    costPerKg: ''
  });

  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Allow empty string or valid positive numbers
    if (value === '') {
      setInputs(prev => ({
        ...prev,
        [name]: ''
      }));
    } else {
      const numValue = parseFloat(value);
      // Only set if it's a valid positive number
      if (!isNaN(numValue) && numValue >= 0) {
        setInputs(prev => ({
          ...prev,
          [name]: numValue
        }));
      }
    }
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleReset = () => {
    setInputs({
      thickness: '',
      totalWidth: '',
      lengthPerPcs: '',
      noOfPcs: '',
      sheetWidth: '',
      sheetLength: '',
      costPerKg: ''
    });
    setResults(null);
    setErrors({});
  };

  const loadExample = () => {
    setInputs({
      thickness: 2,
      totalWidth: 300,
      lengthPerPcs: 3000,
      noOfPcs: 50,
      sheetWidth: 1220,
      sheetLength: 3000,
      costPerKg: 6
    });
    setErrors({});
  };

  const calculate = () => {
    const {
      thickness,
      totalWidth,
      lengthPerPcs,
      noOfPcs,
      sheetWidth,
      sheetLength,
      costPerKg
    } = inputs;

    // Clear previous errors
    const newErrors = {};

    // Validation: Check for empty, zero or invalid values
    if (thickness === '' || thickness === null || thickness === undefined || thickness <= 0) {
      newErrors.thickness = 'Thickness must be greater than 0';
    }
    if (totalWidth === '' || totalWidth === null || totalWidth === undefined || totalWidth <= 0) {
      newErrors.totalWidth = 'Total width must be greater than 0';
    }
    if (lengthPerPcs === '' || lengthPerPcs === null || lengthPerPcs === undefined || lengthPerPcs <= 0) {
      newErrors.lengthPerPcs = 'Length per piece must be greater than 0';
    }
    if (noOfPcs === '' || noOfPcs === null || noOfPcs === undefined || noOfPcs <= 0) {
      newErrors.noOfPcs = 'Number of pieces must be greater than 0';
    }
    if (sheetWidth === '' || sheetWidth === null || sheetWidth === undefined || sheetWidth <= 0) {
      newErrors.sheetWidth = 'Sheet width must be greater than 0';
    }
    if (sheetLength === '' || sheetLength === null || sheetLength === undefined || sheetLength <= 0) {
      newErrors.sheetLength = 'Sheet length must be greater than 0';
    }
    if (costPerKg === '' || costPerKg === null || costPerKg === undefined || costPerKg <= 0) {
      newErrors.costPerKg = 'Cost per kg must be greater than 0';
    }

    // Check if piece width exceeds sheet width
    if (totalWidth > 0 && sheetWidth > 0 && totalWidth > sheetWidth) {
      newErrors.totalWidth = 'Piece width cannot exceed sheet width!';
      newErrors.sheetWidth = 'Sheet width must be larger than piece width!';
    }

    // Check if piece length exceeds sheet length
    if (lengthPerPcs > 0 && sheetLength > 0 && lengthPerPcs > sheetLength) {
      newErrors.lengthPerPcs = 'Piece length cannot exceed sheet length!';
      newErrors.sheetLength = 'Sheet length must be larger than piece length!';
    }

    // If there are any errors, set them and stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if validation passed
    setErrors({});

    // Add smooth transition effect
    setIsCalculating(true);

    // Use setTimeout to create smooth transition
    setTimeout(() => {
      performCalculation();
      setIsCalculating(false);
    }, 150);
  };

  const performCalculation = () => {
    const {
      thickness,
      totalWidth,
      lengthPerPcs,
      noOfPcs,
      sheetWidth,
      sheetLength,
      costPerKg
    } = inputs;

    // Steel density in kg/m³ (7850 kg/m³ for steel)
    const steelDensity = 7850;

    // Calculate pieces per sheet (how many pieces fit across the width)
    const piecesPerSheet = Math.floor(sheetWidth / totalWidth);
    
    // This should be caught by the validation above, but just in case
    if (piecesPerSheet === 0) {
      setErrors({
        totalWidth: 'Piece is too wide to fit in sheet!',
        sheetWidth: 'Sheet is too narrow for this piece width!'
      });
      return;
    }
    
    // Calculate sheets needed (round up to get whole sheets)
    const sheetsNeeded = Math.ceil(noOfPcs / piecesPerSheet);
    
    // Calculate total pieces obtained from all sheets
    const piecesObtained = sheetsNeeded * piecesPerSheet;
    
    // Calculate extra pieces (leftover after fulfilling requirement)
    const extraPieces = piecesObtained - noOfPcs;
    
    // Calculate scrap (unused width per sheet)
    const widthUsed = piecesPerSheet * totalWidth;
    const scrapWidth = sheetWidth - widthUsed;
    
    // Calculate utilization percentages
    const widthUtilization = (widthUsed / sheetWidth) * 100;
    const lengthUtilization = lengthPerPcs === sheetLength ? 100 : (lengthPerPcs / sheetLength) * 100;
    
    // === WEIGHT CALCULATIONS ===
    // Convert all dimensions from millimeters to meters for volume calculation
    const sheetWidthM = sheetWidth / 1000;
    const sheetLengthM = sheetLength / 1000;
    const thicknessM = thickness / 1000;
    const totalWidthM = totalWidth / 1000;
    const lengthPerPcsM = lengthPerPcs / 1000;
    
    // Calculate volume and weight of one sheet
    // Volume = width × length × thickness (in m³)
    const volumePerSheet = sheetWidthM * sheetLengthM * thicknessM;
    // Weight = volume × density
    const weightPerSheet = volumePerSheet * steelDensity;
    
    // Calculate volume and weight of one finished piece
    const volumePerPiece = totalWidthM * lengthPerPcsM * thicknessM;
    const weightPerPiece = volumePerPiece * steelDensity;
    
    // Calculate total weights
    const totalSheetWeight = weightPerSheet * sheetsNeeded;
    const totalFinishedWeight = weightPerPiece * noOfPcs;
    
    // === COST CALCULATIONS ===
    // Total cost based on purchased sheets (includes scrap and extra pieces)
    const totalSheetCost = totalSheetWeight * costPerKg;
    
    // Cost based only on finished product weight (theoretical minimum)
    const totalFinishedCost = totalFinishedWeight * costPerKg;
    
    // Cost per piece spreading sheet cost over required pieces (SELLING PRICE)
    // This includes the cost of scrap and extra pieces distributed across the required quantity
    const costPerPieceSheetBasis = totalSheetCost / noOfPcs;
    
    // Cost per piece based only on actual piece weight (for comparison)
    const costPerPieceActualWeight = totalFinishedCost / noOfPcs;
    
    // Set all calculated results with smooth transition
    setResults({
      piecesPerSheet,
      sheetsNeeded,
      piecesObtained,
      extraPieces,
      scrapWidth,
      widthUtilization,
      lengthUtilization,
      widthUsed,
      weightPerSheet,
      weightPerPiece,
      totalSheetWeight,
      totalFinishedWeight,
      totalSheetCost,
      totalFinishedCost,
      costPerPieceSheetBasis,
      costPerPieceActualWeight
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
            <h2>Input</h2>
            
            <div className="input-group">
              <h3>Finish Product</h3>
              <div className="input-field">
                <label>Thickness (mm)</label>
                <input
                  type="number"
                  name="thickness"
                  value={inputs.thickness}
                  onChange={handleInputChange}
                  placeholder="Enter thickness (e.g., 2)"
                  min="0"
                  step="0.1"
                  className={errors.thickness ? 'error' : ''}
                />
                {errors.thickness && <span className="error-message">{errors.thickness}</span>}
              </div>
              <div className="input-field">
                <label>Total Width (mm)</label>
                <input
                  type="number"
                  name="totalWidth"
                  value={inputs.totalWidth}
                  onChange={handleInputChange}
                  placeholder="Enter piece width (e.g., 300)"
                  min="0"
                  className={errors.totalWidth ? 'error' : ''}
                />
                {errors.totalWidth && <span className="error-message">{errors.totalWidth}</span>}
              </div>
              <div className="input-field">
                <label>Length Per Pcs (mm)</label>
                <input
                  type="number"
                  name="lengthPerPcs"
                  value={inputs.lengthPerPcs}
                  onChange={handleInputChange}
                  placeholder="Enter piece length (e.g., 3000)"
                  min="0"
                  className={errors.lengthPerPcs ? 'error' : ''}
                />
                {errors.lengthPerPcs && <span className="error-message">{errors.lengthPerPcs}</span>}
              </div>
              <div className="input-field">
                <label>No of Pcs</label>
                <input
                  type="number"
                  name="noOfPcs"
                  value={inputs.noOfPcs}
                  onChange={handleInputChange}
                  placeholder="Enter quantity (e.g., 50)"
                  min="0"
                  className={errors.noOfPcs ? 'error' : ''}
                />
                {errors.noOfPcs && <span className="error-message">{errors.noOfPcs}</span>}
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
                  placeholder="Enter sheet width (e.g., 1220)"
                  min="0"
                  className={errors.sheetWidth ? 'error' : ''}
                />
                {errors.sheetWidth && <span className="error-message">{errors.sheetWidth}</span>}
              </div>
              <div className="input-field">
                <label>Sheet Length (mm)</label>
                <input
                  type="number"
                  name="sheetLength"
                  value={inputs.sheetLength}
                  onChange={handleInputChange}
                  placeholder="Enter sheet length (e.g., 3000)"
                  min="0"
                  className={errors.sheetLength ? 'error' : ''}
                />
                {errors.sheetLength && <span className="error-message">{errors.sheetLength}</span>}
              </div>
            </div>

            <div className="input-group">
              <h3>Pricing</h3>
              <div className="input-field">
                <label>Cost Per Kg (AED)</label>
                <input
                  type="number"
                  name="costPerKg"
                  value={inputs.costPerKg}
                  onChange={handleInputChange}
                  placeholder="Enter cost per kg (e.g., 6)"
                  min="0"
                  step="0.01"
                  className={errors.costPerKg ? 'error' : ''}
                />
                {errors.costPerKg && <span className="error-message">{errors.costPerKg}</span>}
              </div>
            </div>

            <div className="button-group">
              <button 
                className="calculate-btn" 
                onClick={calculate}
                disabled={isCalculating}
              >
                {isCalculating ? 'Calculating...' : 'Calculate'}
              </button>
              <button className="reset-btn" onClick={handleReset}>
                Reset
              </button>
            </div>
            
            <div className="example-button-container">
              <button className="example-btn" onClick={loadExample}>
                📋 Load Example Data
              </button>
            </div>
          </div>

          {/* Results Section */}
          {results && (
            <div className={`results-section ${isCalculating ? 'updating' : ''}`}>
              <h2>Output</h2>
              
              <div className="results-table">
                <div className="result-row highlight">
                  <span className="result-label">No Of Pcs Required from Raw Material</span>
                  <span className="result-value">{results.sheetsNeeded} sheets</span>
                </div>
                <div className="result-row">
                  <span className="result-label">Finish Product Weight Per Pcs</span>
                  <span className="result-value">{results.weightPerPiece.toFixed(2)} kg</span>
                </div>
                <div className="result-row success">
                  <span className="result-label">Selling Price per Pcs</span>
                  <span className="result-value">AED {results.costPerPieceSheetBasis.toFixed(2)}</span>
                </div>
              </div>

              <div className="calculation-details">
                <h3>Detailed Breakdown</h3>
                
                <div className="detail-section">
                  <h4>Material Calculation</h4>
                  <div className="detail-box">
                    <p><strong>Pieces per sheet:</strong></p>
                    <p className="formula">⌊{inputs.sheetWidth} ÷ {inputs.totalWidth}⌋ = {results.piecesPerSheet} pcs/sheet</p>
                  </div>
                  <div className="detail-box">
                    <p><strong>Sheets needed:</strong></p>
                    <p className="formula">⌈{inputs.noOfPcs} ÷ {results.piecesPerSheet}⌉ = {results.sheetsNeeded} sheets</p>
                  </div>
                  <div className="detail-box">
                    <p><strong>Total pieces obtained:</strong></p>
                    <p className="formula">{results.sheetsNeeded} × {results.piecesPerSheet} = {results.piecesObtained} pcs</p>
                  </div>
                  <div className="detail-box">
                    <p><strong>Extra pieces:</strong></p>
                    <p className="formula">{results.piecesObtained} - {inputs.noOfPcs} = {results.extraPieces} pcs</p>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Utilization</h4>
                  <div className="detail-box">
                    <p><strong>Width used per sheet:</strong></p>
                    <p className="formula">{results.piecesPerSheet} × {inputs.totalWidth} = {results.widthUsed} mm</p>
                  </div>
                  <div className="detail-box">
                    <p><strong>Scrap per sheet:</strong></p>
                    <p className="formula">{inputs.sheetWidth} - {results.widthUsed} = {results.scrapWidth} mm</p>
                  </div>
                  <div className="detail-box">
                    <p><strong>Width utilization:</strong></p>
                    <p className="formula">{results.widthUtilization.toFixed(2)}%</p>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Weight & Cost Analysis</h4>
                  <div className="detail-box">
                    <p><strong>Weight per sheet:</strong></p>
                    <p className="formula">{results.weightPerSheet.toFixed(2)} kg</p>
                  </div>
                  <div className="detail-box">
                    <p><strong>Total sheet weight:</strong></p>
                    <p className="formula">{results.sheetsNeeded} × {results.weightPerSheet.toFixed(2)} = {results.totalSheetWeight.toFixed(2)} kg</p>
                  </div>
                  <div className="detail-box">
                    <p><strong>Total finished weight ({inputs.noOfPcs} pcs):</strong></p>
                    <p className="formula">{inputs.noOfPcs} × {results.weightPerPiece.toFixed(2)} = {results.totalFinishedWeight.toFixed(2)} kg</p>
                  </div>
                  <div className="detail-box">
                    <p><strong>Total sheet cost:</strong></p>
                    <p className="formula">{results.totalSheetWeight.toFixed(2)} kg × AED {inputs.costPerKg} = AED {results.totalSheetCost.toFixed(2)}</p>
                  </div>
                  <div className="detail-box">
                    <p><strong>Cost breakdown:</strong></p>
                    <p className="formula">Sheet basis (incl. scrap): AED {results.costPerPieceSheetBasis.toFixed(2)}/pc</p>
                    <p className="formula">Actual weight only: AED {results.costPerPieceActualWeight.toFixed(2)}/pc</p>
                    <p className="info-text">* Selling price includes cost of {results.extraPieces} extra pcs + {results.scrapWidth}mm scrap per sheet</p>
                  </div>
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

