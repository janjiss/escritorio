defmodule WebApp.Plug.Static do
  def init(_) do
  end

  def call(conn, _) do
    options = Plug.Static.init(at: "/", from: Path.expand(WebApp.Theme.name, "themes"))
    Plug.Static.call(conn, options)
  end
end
