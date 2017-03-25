defmodule Public.Router do
  use Public.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Public do
    pipe_through :browser # Use the default browser stack

    get "/", PostController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", Public do
  #   pipe_through :api
  # end
end
