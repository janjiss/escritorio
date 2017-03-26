defmodule WebApp.Public.PostView do
  use WebApp.DynamicView, root: "../../themes", pattern: "**/templates/*"

  def current_url(conn) do
    WebApp.Router.Helpers.url(conn) <> conn.request_path
  end
end
