# pt 1
# def extract_gears(input, col, row)
#   gears = []

#   (-1..1).each do |dx|
#     (-1..1).each do |dy|
#       i, j = row + dx, col + dy
#       next unless (0...input[0].size).cover?(i) && (0...input.size).cover?(j)
#       next if i == row && j == col

#       c = input[j][i]

#       case c
#       when "0".."9"
#         k = i - 1
#         while k >= 0
#           c = input[j][k]
#           break unless ("0".."9").cover?(c)

#           k -= 1
#         end

#         k += 1
#         num = ""
#         while k < input[0].size
#           c = input[j][k]
#           break unless ("0".."9").cover?(c)

#           num << c
#           k += 1
#         end

#         gears << num.to_i
#       end
#     end
#   end

#   gears.uniq
# end

# def process_input(input)
#   num_arr = []

#   (0...input.size).each do |col|
#     (0...input[0].size).each do |row|
#       next unless input[col][row] == "*"

#       gear_arr = extract_gears(input, col, row)
#       num_arr << gear_arr.reduce(:*) if gear_arr.size == 2
#     end
#   end

#   num_arr.sum
# end

# input = File.readlines("input.txt").map(&:chomp)
# result = process_input(input)
# puts result


# pt 2
def extract_gear(input, col, row, row_index)
  gear_arr = []

  (-1..1).each do |dig_col|
    (-1..1).each do |dig_row|
      x, y = row_index + dig_row, col + dig_col
      next if x.negative? || x >= row.size || y.negative? || y >= input.size || (x == row_index && y == col)

      neighbor_cell = input[y][x]

      case neighbor_cell
      when "0".."9"
        z = x - 1
        z -= 1 while z >= 0 && input[y][z] =~ /\d/
        z += 1

        num = ""
        num << input[y][z] while z < row.size && input[y][z] =~ /\d/

        gear_arr << num.to_i
      end
    end
  end

  gear_arr.uniq
end

def process_input(input)
  num_arr = []

  input.each_with_index do |row, col|
    row.chars.each_with_index do |cell, row_index|
      next unless cell == "*"

      gear_arr = extract_gear(input, col, row, row_index)
      puts gear_arr.uniq!

      num_arr << gear_arr.reduce(:*) if gear_arr.size == 2
    end
  end

  puts num_arr.sum
  num_arr.sum
end

input = File.readlines("input.txt", chomp: true)
result = process_input(input)
puts result