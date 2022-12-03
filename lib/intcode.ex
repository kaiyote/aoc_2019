defmodule Aoc2019.IntCode do
  @moduledoc ~S"""
    The intcode runner
  """

  @enforce_keys :memory
  defstruct [:memory, instruction_pointer: 0, inputs: [], outputs: []]

  @spec run(%__MODULE__{}) :: {:ok, %__MODULE__{}} | {:error, %__MODULE__{}, integer()}
  def run(vm) do
    [param_3, param_2, param_1, opcode_10, opcode_1] =
      Enum.at(vm.memory, vm.instruction_pointer)
      |> Integer.to_string()
      |> String.pad_leading(5, "0")
      |> String.graphemes()
      |> Enum.map(&String.to_integer/1)

    case [opcode_10, opcode_1] do
      # HALT
      [9, 9] ->
        {:ok, vm}

      # ADD
      [0, 1] ->
        run(%{
          vm
          | memory: add(vm, param_1, param_2),
            instruction_pointer: vm.instruction_pointer + 4
        })

      # MULTIPLY
      [0, 2] ->
        run(%{
          vm
          | memory: multiply(vm, param_1, param_2),
            instruction_pointer: vm.instruction_pointer + 4
        })

      # READ INPUT
      [0, 3] ->
        run(%{
          vm
          | memory: input(vm),
            inputs: List.delete_at(vm.inputs, 0),
            instruction_pointer: vm.instruction_pointer + 2
        })

      # WRITE OUTPUT
      [0, 4] ->
        run(%{
          vm
          | outputs: vm.outputs ++ [output(vm, param_1)],
            instruction_pointer: vm.instruction_pointer + 2
        })

      # JNZ
      [0, 5] ->
        run(%{
          vm
          | instruction_pointer: jump_non_zero(vm, param_1, param_2)
        })

      # JZ
      [0, 6] ->
        run(%{
          vm
          | instruction_pointer: jump_zero(vm, param_1, param_2)
        })

      # LT
      [0, 7] ->
        run(%{
          vm
          | memory: less_than(vm, param_1, param_2),
            instruction_pointer: vm.instruction_pointer + 4
        })

      # EQ
      [0, 8] ->
        run(%{
          vm
          | memory: equals(vm, param_1, param_2),
            instruction_pointer: vm.instruction_pointer + 4
        })

      # ERROR
      x ->
        {:error, vm, x}
    end
  end

  @spec add(%__MODULE__{}, integer(), integer()) :: [integer()]
  defp add(%__MODULE__{memory: memory, instruction_pointer: pointer}, param_1_mode, param_2_mode) do
    operand_l = memory |> read_memory(pointer + 1, param_1_mode)
    operand_r = memory |> read_memory(pointer + 2, param_2_mode)

    set_memory(memory, pointer + 3, operand_l + operand_r)
  end

  @spec multiply(%__MODULE__{}, integer(), integer()) :: [integer()]
  defp multiply(
         %__MODULE__{memory: memory, instruction_pointer: pointer},
         param_1_mode,
         param_2_mode
       ) do
    operand_l = memory |> read_memory(pointer + 1, param_1_mode)
    operand_r = memory |> read_memory(pointer + 2, param_2_mode)

    set_memory(memory, pointer + 3, operand_l * operand_r)
  end

  @spec input(%__MODULE__{}) :: [integer()]
  defp input(%__MODULE__{memory: memory, instruction_pointer: pointer, inputs: inputs}) do
    set_memory(memory, pointer + 1, Enum.at(inputs, 0))
  end

  @spec output(%__MODULE__{}, integer()) :: integer()
  defp output(%__MODULE__{memory: memory, instruction_pointer: pointer}, param_1_mode) do
    read_memory(memory, pointer + 1, param_1_mode)
  end

  @spec jump_non_zero(%__MODULE__{}, integer(), integer()) :: integer()
  defp jump_non_zero(
         %__MODULE__{memory: memory, instruction_pointer: pointer},
         param_1_mode,
         param_2_mode
       ) do
    if read_memory(memory, pointer + 1, param_1_mode) != 0,
      do: read_memory(memory, pointer + 2, param_2_mode),
      else: pointer + 3
  end

  @spec jump_zero(%__MODULE__{}, integer(), integer()) :: integer()
  defp jump_zero(
         %__MODULE__{memory: memory, instruction_pointer: pointer},
         param_1_mode,
         param_2_mode
       ) do
    if read_memory(memory, pointer + 1, param_1_mode) == 0,
      do: read_memory(memory, pointer + 2, param_2_mode),
      else: pointer + 3
  end

  @spec less_than(%__MODULE__{}, integer(), integer()) :: [integer()]
  defp less_than(
         %__MODULE__{memory: memory, instruction_pointer: pointer},
         param_1_mode,
         param_2_mode
       ) do
    if read_memory(memory, pointer + 1, param_1_mode) <
         read_memory(memory, pointer + 2, param_2_mode) do
      set_memory(memory, pointer + 3, 1)
    else
      set_memory(memory, pointer + 3, 0)
    end
  end

  @spec equals(%__MODULE__{}, integer(), integer()) :: [integer()]
  defp equals(
         %__MODULE__{memory: memory, instruction_pointer: pointer},
         param_1_mode,
         param_2_mode
       ) do
    if read_memory(memory, pointer + 1, param_1_mode) ==
         read_memory(memory, pointer + 2, param_2_mode) do
      set_memory(memory, pointer + 3, 1)
    else
      set_memory(memory, pointer + 3, 0)
    end
  end

  @spec read_memory([integer()], integer(), integer()) :: integer()
  defp read_memory(memory, instruction_pointer, mode) do
    case mode do
      0 -> Enum.at(memory, Enum.at(memory, instruction_pointer))
      1 -> Enum.at(memory, instruction_pointer)
    end
  end

  @spec set_memory([integer()], integer(), integer()) :: [integer()]
  defp set_memory(memory, instruction_pointer, value) do
    List.replace_at(memory, Enum.at(memory, instruction_pointer), value)
  end
end
