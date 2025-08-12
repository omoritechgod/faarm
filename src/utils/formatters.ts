export const formatCurrency = (amount: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj)
}

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "")

  // Format as Nigerian phone number if it starts with 234
  if (cleaned.startsWith("234")) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`
  }

  // Format as international number if it starts with +
  if (phone.startsWith("+")) {
    return phone
  }

  // Default formatting
  return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + "..."
}

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
