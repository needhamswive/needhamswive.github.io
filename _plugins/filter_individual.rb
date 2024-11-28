module Jekyll
  module FilterIndividualFilter
    def filter_individual(input)
      if input.nil?
        return nil
      else
        return input.select{ |item| not item["event"].include? "Split" }
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::FilterIndividualFilter)
