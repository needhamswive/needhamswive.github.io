# https://github.com/Shopify/liquid/blob/e3dcc75ab533eb177cabf3df16ed27c1a21fc33c/lib/liquid/standardfilters.rb#L207-L225
module Jekyll
  module NotWhereFilter
    def not_where(input, property, target_value)
      ary = input

      if ary == nil
        []
      elsif ary.empty?
        []
      else
        ary.select do |item|
          item[property] != target_value
        rescue TypeError
          raise_property_error(property)
        rescue NoMethodError
          return nil unless item.respond_to?(:[])
          raise
        end
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::NotWhereFilter)
