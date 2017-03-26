use Mix.Config

config :backend, Backend.Repo, [
  adapter: Ecto.Adapters.Postgres,
  database: "backend_test",
  username: "janjiss",
  hostname: "localhost"
]
