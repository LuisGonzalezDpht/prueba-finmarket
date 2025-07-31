function formatPrices(price: number) {
  const priceFormatted = new Intl.NumberFormat('es-CL', {
    // style: 'currency',
    minimumFractionDigits: 0,
    currency: 'CLP',
  })

  // pon [1] si quieres quitar los decimales
  return priceFormatted.format(price)
}

export { formatPrices }
