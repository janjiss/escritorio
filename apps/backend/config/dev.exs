use Mix.Config

config :backend, Backend.Repo, [
  adapter: Ecto.Adapters.Postgres,
  database: "backend_dev",
  username: "janjiss",
  hostname: "localhost"
]
