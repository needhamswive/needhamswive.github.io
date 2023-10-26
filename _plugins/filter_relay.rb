module Jekyll
  module FilterRelayFilter
    def filter_relay(input)
      return input.select{ |item| item["event"].include? "Split" }
    end
  end
end

Liquid::Template.register_filter(Jekyll::FilterRelayFilter)
