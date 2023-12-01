file_contents = File.readlines("input.txt").map(&:chomp)
total = 0
file_contents.each { |line| 
    total += line.scan(/\d/).map(&:to_i).sum
}

puts total

replacements = {
  'one' => 'o1e',
  'two' => 't2o',
  'three' => 't3e',
  'four' => 'f4r',
  'five' => 'f5e',
  'six' => 's6x',
  'seven' => 's7n',
  'eight' => 'e8t',
  'nine' => 'n9e'
}
total = 0

file_contents.each { |line| 
    replacements.each { |word, replacement| line.gsub!(word, replacement) }
    total += Integer(line.scan(/\d/).join('')[0] + line.scan(/\d/).join('')[-1])
}
puts total