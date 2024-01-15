module.exports = {
  mongoIdPattern: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
  EXPIRES_IN: new Date().getTime() * 120000,
  ROLES: Object.freeze({
    USER: "USER",
    ADMIN: "ADMIN",
    TEACHER: "TEACHER",
    WRITER: "WRITER",
    SUPPLIER: "SUPPLIER",
  }),
  PERMISSIONS: Object.freeze({
    USER: ['profile'],
    ADMIN: ["all"],
    SUPER_ADMIN: ["all"],
    ALL: ["all"],
    TEACHER: ["course" , 'blog'],
    CONTENT_MANAGER: ["course" , 'blog' , 'category' , 'product'],
    SUPPLIER: ["product"],
  }),
  ACCESS_TOKEN_SECRET_KEY:
    "23070C21A48C9C5A7E4913D53F1200BC89E2D61626881118B17A0E612549EA99",
  REFRESH_TOKEN_SECRET_KEY:
    "65824D54D23F5997AB8AB2F43978FF04543596CD677F0E0F87222CFED53DA304",
};




// {
//   "statusCode": 200,
//   "data": {
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwNTI1MTM3OCwiZXhwIjoxNzA1MzM3Nzc4fQ.aV53yl0c-M3PqyKqyEyoN2q4NehL-I8zDygzkKEpd0k",
//     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwNTI1MTM3OCwiZXhwIjoxNzA1MzM3Nzc4fQ.SlRrg2L4mncHF65bHNuU4g1SV49fEsyAxh_s2X8KiwE"
//   }
// }