# Material Cutting Calculator

A comprehensive React-based calculator for civil engineers to optimize material cutting from sheets with weight and cost analysis.

## Features

- Calculate the number of sheets needed to produce required pieces
- Calculate weight per piece and total material weight
- Calculate selling price per piece (including scrap and leftover cost)
- Show material utilization and waste analysis
- Display extra pieces and scrap dimensions
- **Empty input fields** by default - click and type immediately, no clearing needed
- **Load Example Data** button - one-click to populate fields with working example
- **Inline error validation** with visual feedback (red borders & messages)
- Real-time error clearing as you type
- **Smooth, fluid animations** for all interactions and calculations
- **Seamless result updates** without page reload or jarring changes
- Beautiful, modern UI with responsive design
- Reset functionality

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How It Works

### Inputs
**Finish Product:**
- Thickness (mm)
- Total Width (mm)
- Length Per Pcs (mm)
- No of Pcs (quantity needed)

**Raw Material:**
- Sheet Width (mm)
- Sheet Length (mm)

**Pricing:**
- Cost Per Kg (AED)

### Outputs
- **No Of Pcs Required from Raw Material**: Total sheets needed
- **Finish Product Weight Per Pcs**: Weight of each finished piece in kg
- **Selling Price per Pcs**: Cost per piece including scrap and leftover (AED)

### Calculations Include
- Pieces per sheet optimization
- Material utilization percentage
- Weight calculations using steel density (7,850 kg/m³)
- Cost analysis spreading sheet cost over required pieces
- Scrap and leftover cost distribution

## Example Calculation

**Input:**
- Thickness: 2mm
- Total Width: 300mm
- Length Per Pcs: 3000mm
- No of Pcs: 50
- Sheet size: 1220mm × 3000mm
- Cost: AED 6/kg

**Output:**
- Sheets needed: 13 sheets
- Weight per piece: 14.13 kg
- Selling price: AED 89.64/pc (including scrap cost)
- Pieces obtained: 52 pcs (2 extra)
- Scrap: 20mm per sheet
- Utilization: 98.36%

## Documentation

📋 **`EXAMPLE_DATA.md`** - 10 detailed real-world examples with expected results

📋 **`QUICK_TEST_DATA.txt`** - Quick copy-paste test values

📋 **`CALCULATION_FORMULAS.md`** - Detailed mathematical formulas used

📋 **`ERROR_VALIDATION_GUIDE.md`** - Error validation rules and testing guide

📋 **`SMOOTH_TRANSITIONS_GUIDE.md`** - Complete guide to fluid animations and UX

📋 **`USER_EXPERIENCE_IMPROVEMENTS.md`** - All UX improvements and empty fields feature

## Build for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

