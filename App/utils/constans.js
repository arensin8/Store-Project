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
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMTg1OTIxNSwiZXhwIjoxNzAxOTQ1NjE1fQ.2dpZVTcKHHbZAt93a2t3RZoOYtxoFmJEYQSXHUNUFa0",
//     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMTg1OTIxNSwiZXhwIjoxNzAxOTQ1NjE1fQ.new-_M5TTuSqLcv1TITwWuEHL4DP_d7UyFpbPAAXgp8"
//   }
// }