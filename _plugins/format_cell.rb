module Jekyll
  module FormatCellFilter
    def format_cell(input)
      if input.nil?
        return input
      end
      formatted_input = input.dup
      formatted_input = formatted_input.split(";", -1)
      formatted_input.map! do |element|
        case element
        when ""
          " "
        else
          element
        end
      end
      formatted_input = formatted_input.join(";")
      formatted_input.gsub! ";", "<br>"
      formatted_input.gsub! " ", "&nbsp;"
      formatted_input.gsub! "-", "&#8209;"
      return formatted_input
    end
  end
end

Liquid::Template.register_filter(Jekyll::FormatCellFilter)
