# Example Data for Material Cutting Calculator

Here are various real-world examples you can use to test the calculator:

## Example 1: Edge Trim (Original Example)
**Scenario:** Manufacturing edge trim pieces for construction

| Input Field | Value | Unit |
|------------|-------|------|
| Thickness | 2 | mm |
| Total Width | 300 | mm |
| Length Per Pcs | 3000 | mm |
| No of Pcs | 50 | pieces |
| Sheet Width | 1220 | mm |
| Sheet Length | 3000 | mm |
| Cost Per Kg | 6 | AED |

**Expected Results:**
- Sheets needed: 13 sheets
- Weight per piece: 14.13 kg
- Selling price: AED 89.64/pc
- Extra pieces: 2 pcs
- Scrap: 20 mm per sheet

---

## Example 2: Large Angle Iron
**Scenario:** Producing larger angle iron pieces

| Input Field | Value | Unit |
|------------|-------|------|
| Thickness | 3 | mm |
| Total Width | 200 | mm |
| Length Per Pcs | 6000 | mm |
| No of Pcs | 100 | pieces |
| Sheet Width | 1220 | mm |
| Sheet Length | 6000 | mm |
| Cost Per Kg | 5.5 | AED |

**Expected Results:**
- Sheets needed: 17 sheets
- Pieces per sheet: 6 pcs
- Weight per piece: 28.26 kg
- Total weight of 100 pcs: 2,826 kg

---

## Example 3: Narrow Strips/Straps
**Scenario:** Small metal straps for fastening

| Input Field | Value | Unit |
|------------|-------|------|
| Thickness | 1.5 | mm |
| Total Width | 50 | mm |
| Length Per Pcs | 1000 | mm |
| No of Pcs | 500 | pieces |
| Sheet Width | 1220 | mm |
| Sheet Length | 3000 | mm |
| Cost Per Kg | 7 | AED |

**Expected Results:**
- Sheets needed: 21 sheets
- Pieces per sheet: 24 pcs
- Very efficient use of material!
- Weight per piece: 0.59 kg
- Low scrap: 20 mm per sheet

---

## Example 4: Wide Panels
**Scenario:** Large decorative or structural panels

| Input Field | Value | Unit |
|------------|-------|------|
| Thickness | 2.5 | mm |
| Total Width | 600 | mm |
| Length Per Pcs | 2400 | mm |
| No of Pcs | 30 | pieces |
| Sheet Width | 1220 | mm |
| Sheet Length | 2400 | mm |
| Cost Per Kg | 8 | AED |

**Expected Results:**
- Sheets needed: 15 sheets
- Pieces per sheet: 2 pcs
- Weight per piece: 28.26 kg
- Scrap: 20 mm per sheet

---

## Example 5: Small Precise Cuts
**Scenario:** Small brackets or mounting plates

| Input Field | Value | Unit |
|------------|-------|------|
| Thickness | 4 | mm |
| Total Width | 150 | mm |
| Length Per Pcs | 200 | mm |
| No of Pcs | 200 | pieces |
| Sheet Width | 1220 | mm |
| Sheet Length | 3000 | mm |
| Cost Per Kg | 6.5 | AED |

**Expected Results:**
- Sheets needed: 3 sheets
- Pieces per sheet: 8 pcs (across width) × 15 (along length) = 120 pcs per sheet
- Only need 2 sheets if optimized by length!
- Weight per piece: 0.94 kg

---

## Example 6: Thin Gauge Material
**Scenario:** Light gauge steel for cladding

| Input Field | Value | Unit |
|------------|-------|------|
| Thickness | 0.5 | mm |
| Total Width | 400 | mm |
| Length Per Pcs | 2500 | mm |
| No of Pcs | 75 | pieces |
| Sheet Width | 1220 | mm |
| Sheet Length | 3000 | mm |
| Cost Per Kg | 9 | AED |

**Expected Results:**
- Sheets needed: 25 sheets
- Pieces per sheet: 3 pcs
- Weight per piece: 3.93 kg
- Higher cost per kg for thin materials

---

## Example 7: Heavy Structural Steel
**Scenario:** Thick structural components

| Input Field | Value | Unit |
|------------|-------|------|
| Thickness | 6 | mm |
| Total Width | 350 | mm |
| Length Per Pcs | 4000 | mm |
| No of Pcs | 40 | pieces |
| Sheet Width | 1220 | mm |
| Sheet Length | 6000 | mm |
| Cost Per Kg | 5 | AED |

**Expected Results:**
- Sheets needed: 12 sheets
- Pieces per sheet: 3 pcs
- Weight per piece: 65.94 kg (heavy!)
- Total cost: significant due to weight

---

## Example 8: Maximum Width Utilization
**Scenario:** Optimized cutting with minimal waste

| Input Field | Value | Unit |
|------------|-------|------|
| Thickness | 2 | mm |
| Total Width | 305 | mm |
| Length Per Pcs | 3000 | mm |
| No of Pcs | 60 | pieces |
| Sheet Width | 1220 | mm |
| Sheet Length | 3000 | mm |
| Cost Per Kg | 6 | AED |

**Expected Results:**
- Sheets needed: 15 sheets
- Pieces per sheet: 4 pcs
- Width used: 1220 mm
- Scrap: 0 mm (perfect fit!)
- Utilization: 100%

---

## Example 9: Budget Material
**Scenario:** Economy project with lower material cost

| Input Field | Value | Unit |
|------------|-------|------|
| Thickness | 1 | mm |
| Total Width | 250 | mm |
| Length Per Pcs | 2000 | mm |
| No of Pcs | 80 | pieces |
| Sheet Width | 1220 | mm |
| Sheet Length | 3000 | mm |
| Cost Per Kg | 4 | AED |

**Expected Results:**
- Lower thickness = lighter weight
- Lower cost per kg = economical
- Sheets needed: 17 sheets
- Weight per piece: 3.93 kg
- Affordable project

---

## Example 10: Premium/Custom Order
**Scenario:** High-end custom fabrication

| Input Field | Value | Unit |
|------------|-------|------|
| Thickness | 5 | mm |
| Total Width | 800 | mm |
| Length Per Pcs | 2800 | mm |
| No of Pcs | 25 | pieces |
| Sheet Width | 1220 | mm |
| Sheet Length | 3000 | mm |
| Cost Per Kg | 12 | AED |

**Expected Results:**
- Sheets needed: 25 sheets
- Pieces per sheet: 1 pc only (wide piece)
- Weight per piece: 87.92 kg
- High premium cost per piece
- Scrap: 420 mm per sheet (significant)

---

## Quick Test Values

### Test for Validation Errors:
- **Zero thickness**: Set thickness to 0 → Should show error
- **Piece wider than sheet**: Width 1500, Sheet 1220 → Should show error
- **Negative values**: Any negative input → Should show error

### Test for Edge Cases:
- **Exact fit**: Width 610, Sheet 1220 → Exactly 2 pieces, 0 scrap
- **Single piece per sheet**: Width 1220, Sheet 1220 → 1 piece per sheet
- **Many pieces**: Width 100, 300 pieces → High quantity order

---

## How to Use These Examples

1. **Copy the values** from any example above
2. **Paste into the calculator** input fields
3. **Click Calculate** to see results
4. **Compare with expected results** to verify accuracy
5. **Try modifying values** to see how changes affect output

## Notes

- All examples use steel density of 7,850 kg/m³
- AED = United Arab Emirates Dirham (currency)
- Costs vary based on material thickness, type, and market conditions
- Always verify with your actual material specifications and current market prices

