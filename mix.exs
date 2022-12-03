defmodule Aoc2019.MixProject do
  use Mix.Project

  def project do
    [
      app: :aoc_2019,
      version: "0.1.0",
      elixir: "~> 1.14",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:credo, "~> 1.6", only: [:dev, :test]},
      {:dialyxir, "~> 1.0", only: [:dev, :test], runtime: false},
      {:mix_test_interactive, "~> 1.2", only: [:dev, :test]},
      {:libgraph, "~> 0.16.0"},
      {:permutation, "~> 0.1.0"}
    ]
  end
end
