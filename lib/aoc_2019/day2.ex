defmodule Aoc2019.Day2 do
  @moduledoc false

  @doc ~S"""
    iex> part1("1,9,10,3,2,3,11,0,99,30,40,50")
    3500
    iex> part1("1,0,0,0,99")
    2
    iex> part1("2,3,0,3,99")
    2
    iex> part1("2,4,4,5,99,0")
    2
    iex> part1("1,1,1,4,99,5,6,0,99")
    30

    iex> Aoc2019.load_data(2) |> part1(true)
    9706670
  """
  @spec part1(String.t(), boolean()) :: integer()
  def part1(input, do_replacement \\ false) do
    input
    |> prepare_input()
    |> process(do_replacement, [12, 2])
  end

  @doc ~S"""
    iex> Aoc2019.load_data(2) |> part2()
    2552
  """
  @spec part2(String.t()) :: integer()
  def part2(input) do
    memory = input |> prepare_input

    (for noun <- 0..99, verb <- 0..99, into: [], do: [noun, verb])
      |> Stream.drop_while(&(process(memory, true, &1) != 19_690_720))
      |> Enum.take(1)
      |> Enum.map(fn ([noun, verb]) -> 100 * noun + verb end)
      |> Enum.at(0)
  end

  @spec prepare_input(String.t()) :: [integer()]
  defp prepare_input(input) do
    input
      |> String.split(~r/,/, trim: true)
      |> Enum.map(&(Integer.parse(&1) |> elem(0)))
  end

  @spec initialize([integer()], integer(), integer()) :: [integer()]
  defp initialize(memory, noun, verb) do
    memory
      |> List.replace_at(1, noun)
      |> List.replace_at(2, verb)
  end

  defp process(memory, do_replacement, [noun, verb]) do
    (if do_replacement, do: initialize(memory, noun, verb), else: memory)
      |> Aoc2019.IntCode.run()
      |> elem(1)
      |> Enum.at(0)
  end
end
