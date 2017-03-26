defmodule Backend.Post do
  use Ecto.Schema
  import Ecto.Changeset

  schema "posts" do
    field :title, :string, default: ""
    field :body, :string, default: ""
    field :raw, :map, default: %{}
    field :excerpt, :string, default: ""

    timestamps()
  end

  @required_fields ~w()
  @optional_fields ~w(title body raw excerpt)


  def changeset(record, params \\ :empty) do
    IO.inspect(params)
    record
    |> cast(params, @required_fields, @optional_fields)
  end
end
