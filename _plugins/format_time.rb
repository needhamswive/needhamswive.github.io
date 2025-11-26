# https://stackoverflow.com/a/1034499
class String
  def valid_float?
    # The double negation turns this into an actual boolean true - if you're
    # okay with "truthy" values (like 0.0), you can remove it.
    !!Float(self) rescue false
  end
end

module Jekyll
  module FormatTimeFilter
    def format_time(input)
      if input.nil?
        return input
      elsif !input.valid_float?
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
