defmodule Aoc2019.Day6 do
  @moduledoc false

  @doc ~S"""
    iex> part1("COM)B
    ...>        B)C
    ...>        C)D
    ...>        D)E
    ...>        E)F
    ...>        B)G
    ...>        G)H
    ...>        D)I
    ...>        E)J
    ...>        J)K
    ...>        K)L")
    42

    iex> Aoc2019.load_data(6) |> part1()
    344238
  """
  @spec part1(String.t()) :: integer()
  def part1(input) do
    graph =
      input
      |> prepare_input()
      |> Enum.reduce(Map.new(), fn [target, orbitter], acc -> Map.put(acc, orbitter, target) end)

    graph
    |> Map.keys()
    |> Enum.map(&count_orbits(&1, graph))
    |> Enum.sum()
  end

  @doc ~S"""
    iex> part2("COM)B
    ...>        B)C
    ...>        C)D
    ...>        D)E
    ...>        E)F
    ...>        B)G
    ...>        G)H
    ...>        D)I
    ...>        E)J
    ...>        J)K
    ...>        K)L
    ...>        K)YOU
    ...>        I)SAN")
    4

    iex> Aoc2019.load_data(6) |> part2()
    436
  """
  @spec part2(String.t()) :: integer()
  def part2(input) do
    input
    |> prepare_input()
    |> Enum.reduce(Graph.new(type: :undirected), fn [target, orbitter], graph ->
      Graph.add_edge(graph, target, orbitter)
    end)
    |> Graph.a_star("YOU", "SAN", fn _ -> 0 end)
    |> (fn x -> Enum.count(x) - 3 end).()
  end

  @spec prepare_input(String.t()) :: any()
  defp prepare_input(input) do
    input
    |> String.trim()
    |> String.split(~r/\n/, trim: true)
    |> Enum.map(&(&1 |> String.trim() |> String.split(~r/\)/, trim: true)))
  end

  defp count_orbits("COM", _graph), do: 0

  defp count_orbits(target, graph) do
    1 + count_orbits(Map.get(graph, target), graph)
  end
end
