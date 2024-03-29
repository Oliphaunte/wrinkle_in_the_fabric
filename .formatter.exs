[
  import_deps: [:ecto, :ecto_sql, :phoenix],
  line_length: 130,
  heex_line_length: 130,
  subdirectories: ["priv/*/migrations"],
  plugins: [Phoenix.LiveView.HTMLFormatter],
  inputs: ["*.{heex,ex,exs}", "{config,lib,test}/**/*.{heex,ex,exs}", "priv/*/seeds.exs"]
]
