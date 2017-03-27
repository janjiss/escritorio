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

  scope "/", WebApp, as: :public do
    pipe_through :browser # Use the default browser stack

    get "/", Public.PostController, :index

    resources "/posts", Public.PostController, only: [:show]
  end

  scope "/admin", WebApp, as: :admin do
    pipe_through :browser # Use the default browser stack

    resources "/posts", Admin.PostController, only: [:index, :edit, :new]
  end

  # Other scopes may use custom stacks.
  scope "/api", WebApp, as: :api do
    pipe_through :api

    resources "/posts", Api.PostController, only: [:show, :update]
    resources "/uploads", Api.UploadController, only: [:create]
  end
end
