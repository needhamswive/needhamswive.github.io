module Jekyll
  module FormatCellFilter
    def formatcell(input)
      if input.nil?
        return input
      end
      formatted_input = input.dup
      formatted_input.gsub! ";", "<br>"
      formatted_input.gsub! " ", "&nbsp;"
      formatted_input.gsub! "-", "&#8209;"
      return formatted_input
    end
  end
end

Liquid::Template.register_filter(Jekyll::FormatCellFilter)
