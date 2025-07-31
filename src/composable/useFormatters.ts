function formatPrices(price: number) {
  const priceFormatted = new Intl.NumberFormat('es-CL', {
    // style: 'currency',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    currency: 'CLP',
  })

  // pon [1] si quieres quitar los decimales
  return priceFormatted.format(price)
}

function justALineInTheDate(date: string) {
  const dateFormat = date.split(' ')

  return dateFormat.join(' - ')
}

export { formatPrices, justALineInTheDate }
