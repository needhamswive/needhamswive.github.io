module Jekyll
    module FormatAcademicYearFilter
      def format_school_year(input)
        formatted_input = input.dup.to_s
        formatted_input = formatted_input.sub "-", " &ndash; "
        return formatted_input
      end
    end
  end

  Liquid::Template.register_filter(Jekyll::FormatAcademicYearFilter)
