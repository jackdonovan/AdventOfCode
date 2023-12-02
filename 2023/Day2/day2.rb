file_contents = File.readlines("input.txt").map(&:chomp)
red_limit = 12
blue_limit = 14
green_limit = 13
total = 0
game_total = 0


file_contents.each { |line| 
    puts line
    game_id = line.gsub!('Game ', ':')[/#{':'}(.*?)#{':'}/m, 1] # game Id
    game_valid = 1
    red_max = 0
    blue_max = 0
    green_max = 0

    line.split(';').each { |cube_reveal| 
        puts cube_reveal.split(':')[-1].split(',')
        blue_reveal = 0
        red_reveal = 0
        green_reveal = 0
        cube_reveal.split(':')[-1].split(',').each { |cube_color|
            puts cube_color
            if cube_color.include? 'blue'
                blue_reveal = Integer(cube_color.strip.gsub!('blue', ''))
                if blue_reveal > blue_max
                    blue_max = blue_reveal
                end
            end
            if cube_color.include? 'green'
                green_reveal = Integer(cube_color.strip.gsub!('green', ''))
                if green_reveal > green_max
                    green_max = green_reveal
                end
            end
            if cube_color.include? 'red'
                red_reveal = Integer(cube_color.strip.gsub!('red', ''))
                if red_reveal > red_max
                    red_max = red_reveal
                end
            end
        }
        # part 1
        # if (red_limit < red_reveal || green_limit < green_reveal || blue_limit < blue_reveal) && game_valid == 1
        #     game_valid = 0
        # end
    }
    # part 1
    # if (game_valid == 1) 
    #     total += Integer(game_id)
    # end
    game_total += red_max * blue_max * green_max
}
puts total
puts game_total