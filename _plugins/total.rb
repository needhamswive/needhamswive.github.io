module Jekyll
  module TotalFilter
    def total(input)
      sum = input.clone.compact.map(&:to_f).sum
      if sum % 1 == 0
        return sum.to_i
      else
        return sum
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::TotalFilter)
