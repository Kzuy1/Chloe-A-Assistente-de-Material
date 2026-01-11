function normalizeMinimumValue(value, defaultValue = 0.1) {
  if (value === null || value === undefined) {
    return 'ERROR';
  }
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 'ERROR';
  }

  const rounded = Math.round(number * 10) / 10;

  return rounded < defaultValue ? defaultValue : rounded;
}

module.exports = {
  normalizeMinimumValue,
};