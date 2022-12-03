defmodule Aoc2019.Day4 do
  @moduledoc false

  @doc ~S"""
    iex> part1("111111-111111")
    1
    iex> part1("223450-223450")
    0
    iex> part1("123789-123789")
    0

    iex> Aoc2019.load_data(4) |> part1()
    1855
  """
  @spec part1(String.t()) :: integer()
  def part1(input) do
    input
    |> prepare_input()
    |> Stream.map(fn num -> repeats?(num) and increase?(num) end)
    |> Enum.filter(& &1)
    |> Enum.count()
  end

  @doc ~S"""
    iex> part2("112233-112233")
    1
    iex> part2("123444-123444")
    0
    iex> part2("111122-111122")
    1

    iex> Aoc2019.load_data(4) |> part2()
    1253
  """
  @spec part2(String.t()) :: integer()
  def part2(input) do
    input
    |> prepare_input()
    |> Stream.map(fn num -> only_repeats_twice?(num) and increase?(num) end)
    |> Enum.filter(& &1)
    |> Enum.count()
  end

  @spec prepare_input(String.t()) :: Range.t()
  defp prepare_input(input) do
    input
    |> String.trim()
    |> String.split("-", trim: true)
    |> Enum.map(&String.to_integer/1)
    |> (fn [a, b] -> Range.new(a, b) end).()
  end

  defp repeats?(num) do
    num
    |> Integer.to_string()
    |> String.graphemes()
    |> Enum.chunk_every(2, 1, :discard)
    |> Enum.any?(fn [a, b] -> a == b end)
  end

  defp increase?(num) do
    num
    |> Integer.to_string()
    |> String.graphemes()
    |> Enum.chunk_every(2, 1, :discard)
    |> Enum.all?(fn [a, b] -> a <= b end)
  end

  defp only_repeats_twice?(num) do
    graphemes = num |> Integer.to_string() |> String.graphemes()

    doubles =
      graphemes
      |> Enum.chunk_every(2, 1, :discard)
      |> Enum.filter(fn [a, b] -> a == b end)
      |> Enum.map(&Enum.at(&1, 0))
      |> Enum.uniq()

    triples =
      graphemes
      |> Enum.chunk_every(3, 1, :discard)
      |> Enum.filter(fn [a, b, c] -> a == b and a == c end)
      |> Enum.map(&Enum.at(&1, 0))
      |> Enum.uniq()

    not Enum.empty?(doubles) and
      (Enum.empty?(triples) or not Enum.all?(doubles, fn num -> Enum.member?(triples, num) end))
  end
end
