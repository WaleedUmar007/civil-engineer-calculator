# Material Cutting Calculator - Mathematical Formulas

This document explains all the mathematical calculations performed by the calculator.

## Input Variables

| Variable | Symbol | Unit | Description |
|----------|--------|------|-------------|
| thickness | t | mm | Material thickness |
| totalWidth | w | mm | Width of finished piece |
| lengthPerPcs | l | mm | Length of finished piece |
| noOfPcs | n | pieces | Number of pieces required |
| sheetWidth | W | mm | Width of raw material sheet |
| sheetLength | L | mm | Length of raw material sheet |
| costPerKg | C | AED/kg | Cost per kilogram of material |

## Constants

- **Steel Density**: ρ = 7,850 kg/m³

## Calculations

### 1. Material Cutting Calculations

**Pieces per sheet:**
```
piecesPerSheet = ⌊W ÷ w⌋
```
Uses floor function to get whole pieces only.

**Sheets needed:**
```
sheetsNeeded = ⌈n ÷ piecesPerSheet⌉
```
Uses ceiling function to round up to whole sheets.

**Total pieces obtained:**
```
piecesObtained = sheetsNeeded × piecesPerSheet
```

**Extra pieces:**
```
extraPieces = piecesObtained - n
```

**Width used per sheet:**
```
widthUsed = piecesPerSheet × w
```

**Scrap per sheet:**
```
scrapWidth = W - widthUsed
```

**Width utilization:**
```
widthUtilization = (widthUsed ÷ W) × 100%
```

### 2. Weight Calculations

**Volume of one sheet (in m³):**
```
volumePerSheet = (W/1000) × (L/1000) × (t/1000)
```

**Weight of one sheet (in kg):**
```
weightPerSheet = volumePerSheet × ρ
                = (W × L × t) / 1,000,000,000 × 7,850
```

**Volume of one piece (in m³):**
```
volumePerPiece = (w/1000) × (l/1000) × (t/1000)
```

**Weight of one piece (in kg):**
```
weightPerPiece = volumePerPiece × ρ
                = (w × l × t) / 1,000,000,000 × 7,850
```

**Total sheet weight:**
```
totalSheetWeight = weightPerSheet × sheetsNeeded
```

**Total finished weight:**
```
totalFinishedWeight = weightPerPiece × n
```

### 3. Cost Calculations

**Total sheet cost (what you pay):**
```
totalSheetCost = totalSheetWeight × C
```

**Total finished cost (theoretical minimum):**
```
totalFinishedCost = totalFinishedWeight × C
```

**Cost per piece - Sheet Basis (SELLING PRICE):**
```
costPerPieceSheetBasis = totalSheetCost ÷ n
```
This includes the cost of:
- Extra pieces
- Width scrap from each sheet
- Distributed evenly across required quantity

**Cost per piece - Actual Weight:**
```
costPerPieceActualWeight = totalFinishedCost ÷ n
```
This is the theoretical minimum without considering waste.

## Example Calculation

### Given:
- Thickness: 2 mm
- Total Width: 300 mm
- Length Per Pcs: 3000 mm
- No of Pcs: 50
- Sheet Width: 1220 mm
- Sheet Length: 3000 mm
- Cost Per Kg: AED 6

### Step-by-step:

1. **Pieces per sheet:**
   - ⌊1220 ÷ 300⌋ = ⌊4.0667⌋ = **4 pieces/sheet**

2. **Sheets needed:**
   - ⌈50 ÷ 4⌉ = ⌈12.5⌉ = **13 sheets**

3. **Total pieces obtained:**
   - 13 × 4 = **52 pieces**

4. **Extra pieces:**
   - 52 - 50 = **2 pieces**

5. **Width used:**
   - 4 × 300 = **1200 mm**

6. **Scrap:**
   - 1220 - 1200 = **20 mm per sheet**

7. **Width utilization:**
   - (1200 ÷ 1220) × 100 = **98.36%**

8. **Weight per sheet:**
   - (1.22 × 3.0 × 0.002) × 7850 = **57.462 kg**

9. **Weight per piece:**
   - (0.3 × 3.0 × 0.002) × 7850 = **14.13 kg**

10. **Total sheet weight:**
    - 57.462 × 13 = **747.006 kg**

11. **Total finished weight:**
    - 14.13 × 50 = **706.5 kg**

12. **Total sheet cost:**
    - 747.006 × 6 = **AED 4,482.04**

13. **Selling price per piece:**
    - 4,482.04 ÷ 50 = **AED 89.64/pc**

## Why Selling Price > Actual Material Cost?

The selling price (AED 89.64/pc) is higher than the actual material cost per piece (AED 84.78/pc) because:

1. **Extra pieces**: 2 extra pieces from 52 total = 2 × 14.13 kg = 28.26 kg
2. **Width scrap**: 20 mm per sheet × 13 sheets ≈ 12.24 kg
3. **Total waste**: 40.5 kg @ AED 6/kg = AED 243

This waste cost is distributed across the 50 required pieces, adding approximately AED 4.86 per piece to the selling price.

