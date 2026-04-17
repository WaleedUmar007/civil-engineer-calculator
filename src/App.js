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

  const [standardProfilesStr, setStandardProfilesStr] = useState("325, 625, 524.5, 725, 425, 575, 474.6, 475, 375");

  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (value === '') {
      setInputs(prev => ({
        ...prev,
        [name]: ''
      }));
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setInputs(prev => ({
          ...prev,
          [name]: numValue
        }));
      }
    }
    
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
      thickness: 2.5,
      totalWidth: 325,
      lengthPerPcs: 3000,
      noOfPcs: 48,
      sheetWidth: 1219,
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

    const newErrors = {};

    if (thickness === '' || thickness === null || thickness === undefined || thickness <= 0) {
      newErrors.thickness = 'Thickness must be greater than 0';
    }
    if (totalWidth === '' || totalWidth === null || totalWidth === undefined || totalWidth <= 0) {
      newErrors.totalWidth = 'Target width must be greater than 0';
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

    if (totalWidth > 0 && sheetWidth > 0 && totalWidth > sheetWidth) {
      newErrors.totalWidth = 'Piece width cannot exceed sheet width!';
      newErrors.sheetWidth = 'Sheet width must be larger than piece width!';
    }
    if (lengthPerPcs > 0 && sheetLength > 0 && lengthPerPcs > sheetLength) {
      newErrors.lengthPerPcs = 'Piece length cannot exceed sheet length!';
      newErrors.sheetLength = 'Sheet length must be larger than piece length!';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsCalculating(true);

    setTimeout(() => {
      performCalculation();
      setIsCalculating(false);
    }, 150);
  };

  const getOptimization = (targetW, sheetW, standardProfsStr) => {
      const multiplier = 100;
      const capacity = Math.round((sheetW - targetW) * multiplier);

      let profsArray = [];
      try {
        profsArray = standardProfsStr.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n) && n > 0);
      } catch (e) {
        profsArray = [];
      }

      if (!profsArray.includes(targetW)) profsArray.push(targetW);

      const validProfiles = profsArray
        .filter(w => w > 0 && w <= sheetW)
        .map(w => ({ intWidth: Math.round(w * multiplier), realW: w }));

      const dp = new Array(capacity + 1).fill(-1);
      dp[0] = 0;

      for (let w = 0; w <= capacity; w++) {
        if (dp[w] !== -1) {
          for (let p of validProfiles) {
            if (w + p.intWidth <= capacity) {
              dp[w + p.intWidth] = p.realW; 
            }
          }
        }
      }

      let maxW = capacity;
      while (maxW > 0 && dp[maxW] === -1) {
        maxW--;
      }

      let currW = maxW;
      const combination = {};
      while (currW > 0) {
        const wValue = dp[currW];
        combination[wValue] = (combination[wValue] || 0) + 1;
        currW -= Math.round(wValue * multiplier);
      }

      return {
          combination,
          usedOtherWidth: maxW / multiplier,
          scrapWidth: Number((sheetW - (targetW + maxW / multiplier)).toFixed(2))
      };
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

    const steelDensity = 7850;

    // OPTIMIZATION
    const optResult = getOptimization(totalWidth, sheetWidth, standardProfilesStr);
    const scrapWidth = optResult.scrapWidth;
    
    let targetPiecesPerSheet = 1;
    if (optResult.combination[totalWidth]) {
         targetPiecesPerSheet += optResult.combination[totalWidth];
    }
    
    const piecesPerSheet = targetPiecesPerSheet;
    const sheetsNeeded = Math.ceil(noOfPcs / piecesPerSheet);
    const piecesObtained = sheetsNeeded * piecesPerSheet;
    const extraPieces = piecesObtained - noOfPcs;

    let comboDisplay = `1 x ${totalWidth} mm`;
    const byproductsArr = [];

    if (optResult.combination[totalWidth]) {
        comboDisplay = `${targetPiecesPerSheet} x ${totalWidth} mm`;
        Object.keys(optResult.combination).forEach(wKey => {
            const w = parseFloat(wKey);
            const count = optResult.combination[wKey];
            if (w !== totalWidth) {
                comboDisplay += ` + ${count} x ${w} mm`;
                byproductsArr.push(`Produces ${count * sheetsNeeded} units of ${w} mm`);
            }
        });
    } else {
        Object.keys(optResult.combination).forEach(wKey => {
          const w = parseFloat(wKey);
          const count = optResult.combination[wKey];
          comboDisplay += ` + ${count} x ${w} mm`;
          byproductsArr.push(`Produces ${count * sheetsNeeded} units of ${w} mm`);
        });
    }

    const byproductsText = byproductsArr.length > 0 ? byproductsArr.join(', ') : "No extra byproducts";
    const widthUsed = sheetWidth - scrapWidth;
    const widthUtilization = (widthUsed / sheetWidth) * 100;
    const lengthUtilization = lengthPerPcs === sheetLength ? 100 : (lengthPerPcs / sheetLength) * 100;
    
    const sheetWidthM = sheetWidth / 1000;
    const sheetLengthM = sheetLength / 1000;
    const thicknessM = thickness / 1000;
    const totalWidthM = totalWidth / 1000;
    const lengthPerPcsM = lengthPerPcs / 1000;
    
    const volumePerSheet = sheetWidthM * sheetLengthM * thicknessM;
    const weightPerSheet = volumePerSheet * steelDensity;
    const volumePerPiece = totalWidthM * lengthPerPcsM * thicknessM;
    const weightPerPiece = volumePerPiece * steelDensity;
    
    const totalSheetWeight = weightPerSheet * sheetsNeeded;
    const totalFinishedWeight = weightPerPiece * noOfPcs;
    
    const totalSheetCost = totalSheetWeight * costPerKg;
    const totalFinishedCost = totalFinishedWeight * costPerKg;
    const costPerPieceSheetBasis = totalSheetCost / noOfPcs;
    const costPerPieceActualWeight = totalFinishedCost / noOfPcs;
    
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
      costPerPieceActualWeight,
      comboDisplay,
      byproductsText
    });
  };

  const Tooltip = ({ text }) => (
    <span className="info-icon">
      i
      <span className="tooltip-text">{text}</span>
    </span>
  );

  return (
    <div className="App">
      <div className="container">
        <h1>Material Cutting Calculator</h1>
        <p className="subtitle">Civil Engineering & Sheet Metal Optimization Suite</p>

        <div className="calculator-grid">
          {/* Input Section */}
          <div className="input-section">
            <h2>Parameters Hub</h2>
            
            <div className="input-group">
              <h3>Target Manufacturing Product</h3>
              <div className="input-grid">
                <div className="input-field">
                  <div className="label-container">
                    <label>Thickness (mm)</label>
                    <Tooltip text="The physical depth of the steel coil being cut. E.g. 2.5mm" />
                  </div>
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
                  <div className="label-container">
                    <label>Target Profile Width (mm)</label>
                    <Tooltip text="The primary profile width you are aiming to cut from the main steel sheet. The engine will force at least 1 of these per sheet!" />
                  </div>
                  <input
                    type="number"
                    name="totalWidth"
                    value={inputs.totalWidth}
                    onChange={handleInputChange}
                    placeholder="Enter target width (e.g., 325)"
                    min="0"
                    step="0.1"
                    className={errors.totalWidth ? 'error' : ''}
                  />
                  {errors.totalWidth && <span className="error-message">{errors.totalWidth}</span>}
                </div>

                <div className="input-field">
                  <div className="label-container">
                    <label>Length Per Piece (mm)</label>
                    <Tooltip text="Length of the physical piece to be cut out. E.g. 3000mm length." />
                  </div>
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
                  <div className="label-container">
                    <label>Requested Quantity</label>
                    <Tooltip text="The total number of Target Profile pieces you need to fulfill the order." />
                  </div>
                  <input
                    type="number"
                    name="noOfPcs"
                    value={inputs.noOfPcs}
                    onChange={handleInputChange}
                    placeholder="Enter needed qty (e.g., 50)"
                    min="0"
                    className={errors.noOfPcs ? 'error' : ''}
                  />
                  {errors.noOfPcs && <span className="error-message">{errors.noOfPcs}</span>}
                </div>
              </div>
            </div>

            <div className="input-group">
              <h3>Master Coil / Sheet Constraints</h3>
              <div className="input-grid">
                <div className="input-field">
                  <div className="label-container">
                    <label>Coil Sheet Width (mm)</label>
                    <Tooltip text="The total wide width of the raw material. Used as the constraint boundaries for the mathematical optimizer." />
                  </div>
                  <input
                    type="number"
                    name="sheetWidth"
                    value={inputs.sheetWidth}
                    onChange={handleInputChange}
                    placeholder="Enter master sheet width (e.g., 1219)"
                    min="0"
                    className={errors.sheetWidth ? 'error' : ''}
                  />
                  {errors.sheetWidth && <span className="error-message">{errors.sheetWidth}</span>}
                </div>

                <div className="input-field">
                  <div className="label-container">
                    <label>Coil Sheet Length (mm)</label>
                    <Tooltip text="Standard length boundary of the purchased raw sheet material." />
                  </div>
                  <input
                    type="number"
                    name="sheetLength"
                    value={inputs.sheetLength}
                    onChange={handleInputChange}
                    placeholder="Enter master sheet length (e.g., 3000)"
                    min="0"
                    className={errors.sheetLength ? 'error' : ''}
                  />
                  {errors.sheetLength && <span className="error-message">{errors.sheetLength}</span>}
                </div>
              </div>
            </div>

            <div className="input-group">
              <h3>Optimization Engine Values</h3>
              <div className="input-grid">
                <div className="input-field">
                  <div className="label-container">
                    <label>Cost Per Kg (AED)</label>
                    <Tooltip text="The raw material purchase cost. Used to determine the minimum selling price of your finished pieces including scrap penalty." />
                  </div>
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

                <div className="input-field full-width">
                  <div className="label-container">
                    <label>Combinatory Standard Profiles (Values to test against)</label>
                    <Tooltip text="Enter your factory's other standard profile widths separated by commas. The AI engine tests combining your Target Profile alongside these numbers to locate a pattern with mathematically Zero/Minimum Scrap waste!" />
                  </div>
                  <input
                    type="text"
                    value={standardProfilesStr}
                    onChange={(e) => setStandardProfilesStr(e.target.value)}
                    placeholder="e.g. 325, 425, 625, 524.5"
                  />
                </div>
              </div>
            </div>

            <div className="button-group">
              <button 
                className="calculate-btn" 
                onClick={calculate}
                disabled={isCalculating}
              >
                {isCalculating ? 'Computing Optimal Pathways...' : 'Algorithmically Calculate'}
              </button>
              <button className="reset-btn" onClick={handleReset}>
                Clear
              </button>
            </div>
            
            <div className="example-button-container">
              <button className="example-btn" onClick={loadExample}>
                Try WhatsApp Example (325mm out of 1219mm)
              </button>
            </div>
          </div>

          {/* Results Section */}
          {results && (
            <div className={`results-section ${isCalculating ? 'updating' : ''}`}>
              <h2>Computed Extraction Details</h2>
              
              <div className="results-table">
                <div className="result-row highlight">
                  <span className="result-label">Raw Material Sheets Needed</span>
                  <span className="result-value">{results.sheetsNeeded} sheets</span>
                </div>
                <div className="result-row">
                  <span className="result-label">Approx Target Weight Per Pcs</span>
                  <span className="result-value">{results.weightPerPiece.toFixed(2)} kg</span>
                </div>
                <div className="result-row success">
                  <span className="result-label">Minimum Selling Price per Pcs</span>
                  <span className="result-value">AED {results.costPerPieceSheetBasis.toFixed(2)}</span>
                </div>
                
                <div style={{marginTop: "1.5rem", padding: "1.25rem", background: "linear-gradient(to right, #f0fdfa, #ecfdf5)", borderRadius: "10px", border: "1px solid #34d399", position: "relative"}}>
                    <div style={{position: "absolute", top: "-12px", background: "white", padding: "2px 10px", borderRadius: "10px", fontSize: "0.8rem", fontWeight: "bold", border: "1px solid #34d399", color: "#059669"}}>OPTIMIZED CUT PATTERN</div>
                    <div style={{fontSize: "1.2rem", fontWeight: "bold", color: "#0f172a", marginBottom: "8px", fontFamily: "monospace"}}>{results.comboDisplay}</div>
                    <div style={{fontSize: "0.95rem", color: "#475569", marginBottom: "4px"}}>Calculated Leftover Scrap: <strong style={{color: results.scrapWidth === 0 ? "green" : "#ef4444"}}>{results.scrapWidth} mm</strong></div>
                    <div style={{fontSize: "0.85em", color: "#64748b", fontStyle: "italic"}}><Tooltip text="This indicates how many extra pieces are automatically formulated due to injecting standard profiles into the open spaces of the cut pattern." /> {results.byproductsText}</div>
                </div>
              </div>

              <div className="calculation-details">
                <h3>Technical Summary</h3>
                
                <div className="detail-section">
                  <h4>Extraction Data</h4>
                  <div className="detail-grid">
                    <div className="detail-box">
                      <p><strong>Target Pieces Extracted p/sheet:</strong></p>
                      <p className="formula">{results.piecesPerSheet} pcs</p>
                    </div>
                    <div className="detail-box">
                      <p><strong>Sheets Required:</strong></p>
                      <p className="formula">⌈{inputs.noOfPcs} ÷ {results.piecesPerSheet}⌉ = {results.sheetsNeeded}</p>
                    </div>
                    <div className="detail-box">
                      <p><strong>Surplus Pieces Acquired:</strong></p>
                      <p className="formula">{results.piecesObtained} - {inputs.noOfPcs} = {results.extraPieces}</p>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Width Utility Report</h4>
                  <div className="detail-grid">
                    <div className="detail-box">
                      <p><strong>Pattern Base Width Consumption:</strong></p>
                      <p className="formula">{results.widthUsed.toFixed(2)} mm</p>
                    </div>
                    <div className="detail-box">
                      <p><strong>Remaining Dead Space:</strong></p>
                      <p className="formula">{results.scrapWidth.toFixed(2)} mm</p>
                    </div>
                    <div className="detail-box">
                      <p><strong>Max Yield Percentage:</strong></p>
                      <p className="formula">{results.widthUtilization.toFixed(2)}%</p>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Financial Index</h4>
                  <div className="detail-grid">
                    <div className="detail-box">
                      <p><strong>Single Coil Purchase Cost:</strong></p>
                      <p className="formula">AED {(results.weightPerSheet * inputs.costPerKg).toFixed(2)}</p>
                    </div>
                    <div className="detail-box">
                      <p><strong>Grand Total Cost:</strong></p>
                      <p className="formula">AED {results.totalSheetCost.toFixed(2)}</p>
                    </div>
                    <div className="detail-box">
                      <p><strong>Target Actual Baseline Value:</strong></p>
                      <p className="formula">AED {results.costPerPieceActualWeight.toFixed(2)}/pc</p>
                    </div>
                  </div>
                  <p className="info-text" style={{marginTop:"1rem"}}>* Note: Minimum Selling Price automatically accounts for Scrap dead-weight loss factor distributed into required piece count.</p>
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
