defmodule Aoc2019.Day7 do
  @moduledoc false

  @doc ~S"""
    iex> part1("3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0")
    43210
    iex> part1("3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0")
    54321
    iex> part1("3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0")
    65210

    iex> Aoc2019.load_data(7) |> part1()
    255840
  """
  @spec part1(String.t()) :: integer()
  def part1(input) do
    ram = input |> prepare_input

    [0, 1, 2, 3, 4]
    |> Permutation.permute!()
    |> Enum.map(fn inputs ->
      inputs
      |> Enum.reduce(%Aoc2019.IntCode{memory: ram}, fn input, vm ->
        {:ok, res} =
          Aoc2019.IntCode.run(%{
            vm
            | memory: ram,
              inputs: [input, Enum.at(vm.outputs, 0, 0)],
              outputs: [],
              instruction_pointer: 0
          })

        res
      end)
      |> (fn vm -> Enum.at(vm.outputs, 0) end).()
    end)
    |> Enum.max()
  end

  @doc false
  @spec part2(String.t()) :: integer()
  def part2(input) do
  end

  @spec prepare_input(String.t()) :: [integer()]
  defp prepare_input(input) do
    input
    |> String.split(~r/,/, trim: true)
    |> Enum.map(&(Integer.parse(&1) |> elem(0)))
  end
end
