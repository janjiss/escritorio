defmodule Backend.Post do
  use Ecto.Schema
  import Ecto.Changeset

  schema "posts" do
    field :title, :string
    field :body, :string

    timestamps()
  end

  @required_fields ~w()
  @optional_fields ~w(title body)


  def changeset(record, params \\ :empty) do
    record
    |> cast(params, @required_fields, @optional_fields)
  end
end
