module Jekyll
  module FormatTimeFilter
    def format_time(input)
      if input.nil?
        return input
      elsif input.is_a? String
        time = input.to_f
      else
        time = input
      end

      if time > 59.99
        minutes = (time / 60).floor()
        seconds = (time - 60 * minutes).floor()
        milliseconds = ("%.2f" % (time % 1))[1..-1]
        return "%d:%02i%s" % [minutes, seconds, milliseconds]
      else
        return "%.2f" % time
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::FormatTimeFilter)
