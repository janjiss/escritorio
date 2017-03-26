defmodule WebApp.Api.UploadController do
  use WebApp.Web, :controller

  def create(conn, %{ "file" => file }) do
    # TODO: Figure out how to handle path from a deployed app
    res = WebApp.Upload.upload(file, Path.absname("uploads"))
    json conn, res
  end
end
