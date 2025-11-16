# Material Cutting Calculator

A React-based calculator for civil engineers to optimize material cutting from sheets.

## Features

- Calculate the number of sheets needed to produce required pieces
- Show material utilization and waste
- Display extra pieces and scrap dimensions
- Beautiful, modern UI with responsive design

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

The calculator determines:
- **Pieces per sheet**: How many pieces can be cut from each sheet
- **Sheets needed**: Total sheets required for the job
- **Pieces obtained**: Total pieces you'll get
- **Extra pieces**: Surplus pieces after fulfilling the requirement
- **Scrap width**: Unused material per sheet
- **Utilization**: Material efficiency percentage

## Example Calculation

**Input:**
- Required: 50 pieces
- Piece size: 300mm × 3000mm
- Sheet size: 1220mm × 3000mm

**Output:**
- Pieces per sheet: 4 pcs
- Sheets needed: 13 sheets
- Pieces obtained: 52 pcs
- Extra pieces: 2 pcs
- Scrap: 20mm per sheet
- Utilization: 98.36%

## Build for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

