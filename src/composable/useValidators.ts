function validateIsJson(value: any) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export { validateIsJson }
