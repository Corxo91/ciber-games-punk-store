export const prefix =
  process.env.NODE_ENV === 'development'
    ? ''
    : process.env.NEXT_PUBLIC_BASE_PATH ?? '/cpa-bank-project';