import nextConfig from "eslint-config-next"

export default [
  ...nextConfig,
  {
    rules: {
      "react/no-unescaped-entities": "warn",
      "@next/next/no-img-element": "warn",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
]
