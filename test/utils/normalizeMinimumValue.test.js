const { normalizeMinimumValue } = require('../utils/normalizeMinimumValues');

describe('normalizeMinimumValue', () => {
  test('returns type number for valid numeric inputs', () => {
    expect(typeof normalizeMinimumValue(1)).toBe('number');
    expect(typeof normalizeMinimumValue(0.5)).toBe('number');
    expect(typeof normalizeMinimumValue(10.123)).toBe('number');
    expect(typeof normalizeMinimumValue('1.25')).toBe('number');
  });

  test('returns a number for valid numeric inputs', () => {
    expect(normalizeMinimumValue(1)).toBe(1);
    expect(normalizeMinimumValue(0.5)).toBe(0.5);
    expect(normalizeMinimumValue(10.123)).toBe(10.1);
    expect(normalizeMinimumValue('1.25')).toBe(1.3);
  });

  test('applies minimum value', () => {
    expect(normalizeMinimumValue(0.004)).toBe(0.1);
  });

  test('returns "ERROR" for non-numeric values', () => {
    expect(normalizeMinimumValue('abacate')).toBe('ERROR');
    expect(normalizeMinimumValue(undefined)).toBe('ERROR');
    expect(normalizeMinimumValue(null)).toBe('ERROR');
    expect(normalizeMinimumValue(NaN)).toBe('ERROR');
  });
});