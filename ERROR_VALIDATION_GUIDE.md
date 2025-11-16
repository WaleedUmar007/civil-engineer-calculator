# Error Validation Guide

The Material Cutting Calculator now includes comprehensive inline error validation with visual feedback.

## Features

### 🔴 Visual Error Indicators

When an input field has an error:
- **Red border** around the input field
- **Light red background** (#fff5f5) on the input
- **Red error message** displayed below the field
- **Red focus shadow** when clicking on the error field

### ✅ Real-time Error Clearing

- Errors automatically clear when you start typing in the field
- All errors clear when clicking "Reset" button
- Validation runs when you click "Calculate"

## Validation Rules

### 1. **All Fields Must Be Greater Than 0**

| Field | Error Message |
|-------|---------------|
| Thickness | "Thickness must be greater than 0" |
| Total Width | "Total width must be greater than 0" |
| Length Per Pcs | "Length per piece must be greater than 0" |
| No of Pcs | "Number of pieces must be greater than 0" |
| Sheet Width | "Sheet width must be greater than 0" |
| Sheet Length | "Sheet length must be greater than 0" |
| Cost Per Kg | "Cost per kg must be greater than 0" |

**How to trigger:**
- Set any field to 0 or leave empty
- Click "Calculate"

**Example:**
```
Thickness: 0  ❌ → "Thickness must be greater than 0"
```

---

### 2. **Piece Width Cannot Exceed Sheet Width**

**Error Messages:**
- Total Width: "Piece width cannot exceed sheet width!"
- Sheet Width: "Sheet width must be larger than piece width!"

**How to trigger:**
- Set Total Width larger than Sheet Width
- Click "Calculate"

**Example:**
```
Total Width: 1500 mm
Sheet Width: 1220 mm  ❌ → Shows errors on both fields
```

**Fix:**
```
Total Width: 1200 mm  ✅
Sheet Width: 1220 mm  ✅
```

---

### 3. **Piece Length Cannot Exceed Sheet Length**

**Error Messages:**
- Length Per Pcs: "Piece length cannot exceed sheet length!"
- Sheet Length: "Sheet length must be larger than piece length!"

**How to trigger:**
- Set Length Per Pcs larger than Sheet Length
- Click "Calculate"

**Example:**
```
Length Per Pcs: 4000 mm
Sheet Length: 3000 mm  ❌ → Shows errors on both fields
```

**Fix:**
```
Length Per Pcs: 2800 mm  ✅
Sheet Length: 3000 mm  ✅
```

---

### 4. **Piece Too Wide to Fit**

**Error Messages:**
- Total Width: "Piece is too wide to fit in sheet!"
- Sheet Width: "Sheet is too narrow for this piece width!"

**How to trigger:**
- Set Total Width equal to Sheet Width (0 pieces per sheet)
- Click "Calculate"

**Example:**
```
Total Width: 1220 mm
Sheet Width: 1220 mm  ⚠️ → Can't fit any pieces
```

**Fix:**
```
Total Width: 1200 mm  ✅ → Now fits 1 piece per sheet
```

---

## Testing Error Validation

### Test Case 1: Missing Values
```
Input: Leave all fields at 0
Expected: All 7 fields show red borders with error messages
```

### Test Case 2: Width Exceeds Sheet
```
Input:
  Total Width: 2000
  Sheet Width: 1220
Expected: 
  - Both fields turn red
  - Error messages appear below each
```

### Test Case 3: Length Exceeds Sheet
```
Input:
  Length Per Pcs: 5000
  Sheet Length: 3000
Expected:
  - Both fields turn red
  - Error messages appear below each
```

### Test Case 4: Multiple Errors
```
Input:
  Thickness: 0
  Total Width: 2000
  Sheet Width: 1220
Expected:
  - All 3 fields show errors
  - Can see all error messages simultaneously
```

### Test Case 5: Error Clearing
```
Steps:
  1. Trigger any error
  2. Start typing in the error field
  3. Error should disappear immediately
```

### Test Case 6: Reset Button
```
Steps:
  1. Trigger multiple errors
  2. Click "Reset" button
  3. All errors should clear
  4. Fields should return to default values
```

---

## User Experience Flow

### Scenario: User Makes a Mistake

1. **User enters invalid data**
   - Total Width: 1500 mm
   - Sheet Width: 1220 mm

2. **User clicks "Calculate"**
   - Both fields turn red
   - Error messages appear:
     - "Piece width cannot exceed sheet width!"
     - "Sheet width must be larger than piece width!"

3. **User corrects Total Width**
   - Changes to: 1200 mm
   - Red border disappears immediately
   - Error message disappears

4. **User corrects Sheet Width (if needed)**
   - Sheet Width field automatically clears when Total Width is fixed

5. **User clicks "Calculate" again**
   - Validation passes ✅
   - Results display successfully

---

## Design Details

### Colors Used

- **Error Red**: `#e53e3e`
- **Error Background**: `#fff5f5`
- **Error Shadow**: `rgba(229, 62, 62, 0.1)`

### Typography

- **Error Message Size**: 0.85rem
- **Error Message Weight**: 500 (medium)
- **Error Message Spacing**: 0.25rem margin-top

### Accessibility

- Clear, descriptive error messages
- High contrast red color for visibility
- Error state persists until corrected
- Focus state clearly indicates error fields

---

## Developer Notes

### Error State Management

```javascript
// Error state object structure
{
  thickness: "Error message",
  totalWidth: "Error message",
  lengthPerPcs: "Error message",
  noOfPcs: "Error message",
  sheetWidth: "Error message",
  sheetLength: "Error message",
  costPerKg: "Error message"
}
```

### Adding New Validation Rules

To add a new validation rule:

1. Add condition in `calculate()` function:
```javascript
if (condition) {
  newErrors.fieldName = 'Error message';
}
```

2. Add error display in JSX:
```javascript
className={errors.fieldName ? 'error' : ''}
{errors.fieldName && <span className="error-message">{errors.fieldName}</span>}
```

3. Error will automatically clear on input change

---

## Common User Mistakes & Solutions

| Mistake | What Happens | How to Fix |
|---------|--------------|------------|
| Piece wider than sheet | Red borders on width fields | Reduce piece width or increase sheet width |
| Piece longer than sheet | Red borders on length fields | Reduce piece length or increase sheet length |
| Zero or empty values | Red border on that field | Enter a positive number |
| Negative numbers | Field resets to 0, shows error | Enter a positive number |

---

## Future Enhancements

Potential improvements:
- ⚠️ Warning indicators (yellow) for suboptimal values
- 💡 Suggestion tooltips for common fixes
- 📊 Show optimal piece dimensions for maximum efficiency
- 🔄 Auto-suggest sheet sizes based on piece dimensions

