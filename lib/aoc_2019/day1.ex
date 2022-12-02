defmodule Aoc2019.Day1 do
  @moduledoc false

  @doc ~S"""
    iex> part1("12")
    2
    iex> part1("14")
    2
    iex> part1("1969")
    654
    iex> part1("100756")
    33583

    iex> Aoc2019.load_data(1) |> part1()
    3297866
  """
  @spec part1(String.t()) :: integer()
  def part1(input) do
    input
    |> prepare_input()
    |> Enum.map(&(calc_fuel(&1)))
    |> Enum.sum()
  end

  @doc ~S"""
    iex> part2("14")
    2
    iex> part2("1969")
    966
    iex> part2("100756")
    50346

    iex> Aoc2019.load_data(1) |> part2()
    4943923
  """
  @spec part2(String.t()) :: integer()
  def part2(input) do
    input
    |> prepare_input()
    |> Enum.map(&(calc_fuel(&1, true)))
    |> Enum.sum()
  end

  @spec prepare_input(String.t()) :: [integer()]
  defp prepare_input(input) do
    input
    |> String.split(~r/\n/, trim: true)
    |> Enum.map(&(&1 |> Integer.parse() |> elem(0)))
  end

  @spec calc_fuel(integer(), boolean()) :: integer()
  defp calc_fuel(mass, recurse \\ false) do
    next = div(mass, 3) - 2
    case next do
      x when x > 0 and recurse -> next + calc_fuel(next, true)
      x when x > 0 -> next
      _ -> 0
    end
  end
end
