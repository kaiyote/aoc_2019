defmodule Aoc2019.Day5 do
  @moduledoc false

  @doc ~S"""
    iex> part1("3,0,4,0,99", [42])
    42

    iex> Aoc2019.load_data(5) |> part1([1])
    4601506
  """
  @spec part1(String.t(), [integer()]) :: integer()
  def part1(input, inputs) do
    input
    |> prepare_input
    |> (fn ram -> %Aoc2019.IntCode{memory: ram, inputs: inputs} end).()
    |> Aoc2019.IntCode.run()
    |> elem(1)
    |> (fn %Aoc2019.IntCode{outputs: outputs} -> List.last(outputs) end).()
  end

  @doc ~S"""
    iex> part2("3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99", [7])
    999
    iex> part2("3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99", [8])
    1000
    iex> part2("3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99", [9])
    1001

    iex> Aoc2019.load_data(5) |> part1([5])
    5525561
  """
  @spec part2(String.t(), [integer()]) :: integer()
  def part2(input, inputs), do: part1(input, inputs)

  @spec prepare_input(String.t()) :: [integer()]
  defp prepare_input(input) do
    input
    |> String.split(~r/,/, trim: true)
    |> Enum.map(&(Integer.parse(&1) |> elem(0)))
  end
end
