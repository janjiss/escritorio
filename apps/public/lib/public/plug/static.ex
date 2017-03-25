defmodule Public.Plug.Static do
  import Plug.Conn

  def init(_) do
  end

  def call(conn, _) do
    options = Plug.Static.init(at: "/", from: Path.expand(Public.Theme.name, "themes"))
    Plug.Static.call(conn, options)
  end
end
