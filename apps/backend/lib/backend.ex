defmodule Backend do
  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      supervisor(Backend.Repo, [])
    ]

    opts = [strategy: :one_for_one, name: Backend.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
