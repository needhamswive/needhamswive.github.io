module Jekyll
  module FilterRelayFilter
    def filter_relay(input)
      if input.nil?
        return nil
      else
        return input.select{ |item| item["event"].include? "Split" }
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::FilterRelayFilter)
