import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

// Flat config (ESLint 9+): reemplaza a .eslintrc.json, que ESLint 10 ya no lee.
const eslintConfig = [...nextCoreWebVitals]

export default eslintConfig
