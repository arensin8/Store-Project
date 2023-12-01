module.exports = {
  mongoIdPattern: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
  EXPIRES_IN: new Date().getTime() * 120000,
  ROLES: {
    USER: "USER",
    ADMIN: "ADMIN",
    TEACHER: "TEACHER",
    WRITER: "WRITER",
    SUPPLIER: "SUPPLIER",
  },
  ACCESS_TOKEN_SECRET_KEY:
    "23070C21A48C9C5A7E4913D53F1200BC89E2D61626881118B17A0E612549EA99",
  REFRESH_TOKEN_SECRET_KEY:
    "65824D54D23F5997AB8AB2F43978FF04543596CD677F0E0F87222CFED53DA304",
};


// {
//   "data": {
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMTE1ODg0MSwiZXhwIjoxNzAxMjQ1MjQxfQ.yVrVPHHYw6w58uAigjbyPT6pabCoCRVazMtpbh0wzc8",
//     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMTQzMDQzNCwiZXhwIjoxNzAxNTE2ODM0fQ.i6IiEXIs0WJFLXXdk6Dj2eaIWW44i1yBUO0128Hidgs"
//   }
// }