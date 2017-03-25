defmodule Public.DynamicView do
  defmacro __using__(opts) do
    quote do
      import Phoenix.View
      use Phoenix.Template, unquote(opts)
      @view_resource String.to_atom(Phoenix.Naming.resource_name(__MODULE__, "View"))

      @doc "The resource name, as an atom, for this view"
      def __resource__ do
        @view_resource
      end
    end
  end
end
