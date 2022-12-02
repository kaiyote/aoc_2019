defmodule Aoc2019.IntCode do
  @moduledoc ~S"""
    The intcode runner
  """

  @spec run([integer()], integer()) :: {:ok, [integer()], integer()} | {:error, [integer()], integer(), integer()}
  def run(memory, instruction_pointer \\ 0) do
    case Enum.at(memory, instruction_pointer) do
      99 -> {:ok, memory, instruction_pointer}
      1 -> memory |> add(instruction_pointer) |> run(instruction_pointer + 4)
      2 -> memory |> multiply(instruction_pointer) |> run(instruction_pointer + 4)
      x -> {:error, memory, instruction_pointer, x}
    end
  end

  @spec add([integer()], integer()) :: [integer()]
  defp add(memory, instruction_pointer) do
    operand_l = memory |> read_memory(instruction_pointer + 1)
    operand_r = memory |> read_memory(instruction_pointer + 2)

    set_memory(memory, instruction_pointer + 3, operand_l + operand_r)
  end

  @spec multiply([integer()], integer()) :: [integer()]
  defp multiply(memory, instruction_pointer) do
    operand_l = memory |> read_memory(instruction_pointer + 1)
    operand_r = memory |> read_memory(instruction_pointer + 2)

    set_memory(memory, instruction_pointer + 3, operand_l * operand_r)
  end

  @spec read_memory([integer()], integer()) :: integer()
  defp read_memory(memory, instruction_pointer) do
    Enum.at(memory, Enum.at(memory, instruction_pointer))
  end

  @spec set_memory([integer()], integer(), integer()) :: [integer()]
  defp set_memory(memory, instruction_pointer, value) do
    List.replace_at(memory, Enum.at(memory, instruction_pointer), value)
  end
end
