defmodule WebApp.Router do
  use WebApp.Web, :router

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

  scope "/", WebApp do
    pipe_through :browser # Use the default browser stack

    get "/", Public.PostController, :index
  end

  scope "/admin", WebApp do
    pipe_through :browser # Use the default browser stack

    get "/posts", Admin.PostController, :index
    get "/posts/new", Admin.PostController, :new
    get "/posts/:id/edit", Admin.PostController, :edit
  end

  # Other scopes may use custom stacks.
  scope "/api", WebApp do
    pipe_through :api

    get "/posts/:id", Api.PostController, :show
    put "/posts/:id", Api.PostController, :update
  end
end
