const jsonServer = require("json-server");
const auth = require("json-server-auth");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Reguły autoryzacji
const rules = auth.rewriter({
  // Tylko zalogowani użytkownicy mogą przeglądać zasoby
  users: 600
});

server.use(middlewares);
server.use(rules);
server.use(auth);
server.use(router);

server.listen(5000, () => {
  console.log("JSON Server is running on http://localhost:5000");
});
