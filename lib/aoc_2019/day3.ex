defmodule Aoc2019.Day3 do
  @moduledoc false

  @doc ~S"""
    iex> part1("R8,U5,L5,D3
    ...>        U7,R6,D4,L4")
    6
    iex> part1("R75,D30,R83,U83,L12,D49,R71,U7,L72
    ...>        U62,R66,U55,R34,D71,R55,D58,R83")
    159
    iex> part1("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
    ...>        U98,R91,D20,R16,D67,R40,U7,R15,U6,R7")
    135

    iex> Aoc2019.load_data(3) |> part1()
    8015
  """
  @spec part1(String.t()) :: integer()
  def part1(input) do
    input
    |> prepare_input()
    |> Enum.map(&path/1)
    |> intersections()
    |> Enum.map(fn {x, y} -> abs(x) + abs(y) end)
    |> Enum.min()
  end

  @doc ~S"""
    iex> part2("R8,U5,L5,D3
    ...>        U7,R6,D4,L4")
    30
    iex> part2("R75,D30,R83,U83,L12,D49,R71,U7,L72
    ...>        U62,R66,U55,R34,D71,R55,D58,R83")
    610
    iex> part2("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
    ...>        U98,R91,D20,R16,D67,R40,U7,R15,U6,R7")
    410

    iex> Aoc2019.load_data(3) |> part2()
    163676
  """
  @spec part2(String.t()) :: integer()
  def part2(input) do
    [path_1, path_2] = input |> prepare_input() |> Enum.map(&path/1)

    [path_1, path_2]
    |> intersections()
    |> Enum.map(fn i ->
      {distance_to_intersection(path_1, i), distance_to_intersection(path_2, i)}
    end)
    |> Enum.map(fn {x, y} -> abs(x) + abs(y) end)
    |> Enum.min()
  end

  @spec prepare_input(String.t()) :: any()
  defp prepare_input(input) do
    input
    |> String.split(~r/\n\s*/, trim: true)
    |> Enum.map(&String.split(&1, ~r/,/, trim: true))
  end

  defp path(commands, moves \\ [{0, 0}])
  defp path([], moves), do: moves
  defp path([current | rest], moves), do: path(rest, moves ++ move(current, List.last(moves)))

  defp move("U" <> rest, location),
    do:
      location
      |> Stream.iterate(fn {x, y} -> {x, y + 1} end)
      |> Enum.take(String.to_integer(rest) + 1)
      |> Enum.drop(1)

  defp move("D" <> rest, location),
    do:
      location
      |> Stream.iterate(fn {x, y} -> {x, y - 1} end)
      |> Enum.take(String.to_integer(rest) + 1)
      |> Enum.drop(1)

  defp move("L" <> rest, location),
    do:
      location
      |> Stream.iterate(fn {x, y} -> {x - 1, y} end)
      |> Enum.take(String.to_integer(rest) + 1)
      |> Enum.drop(1)

  defp move("R" <> rest, location),
    do:
      location
      |> Stream.iterate(fn {x, y} -> {x + 1, y} end)
      |> Enum.take(String.to_integer(rest) + 1)
      |> Enum.drop(1)

  defp intersections([path_1, path_2]) do
    path_1
    |> Enum.drop(1)
    |> MapSet.new()
    |> MapSet.intersection(MapSet.new(path_2))
  end

  defp distance_to_intersection(path, intersection),
    do: Enum.find_index(path, &(&1 == intersection))
end
