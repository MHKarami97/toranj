module Jekyll
  class CategoryPage < Jekyll::PageWithoutAFile
    def initialize(site, base, slug, category_name)
      @site = site
      @base = base
      @dir  = File.join("categories", slug)
      @name = "index.html"

      self.process(@name)

      self.data = {}
      self.data["layout"] = "category"
      self.data["title"] = category_name
      self.data["category_name"] = category_name
      self.data["permalink"] = "/categories/#{slug}/"

      self.content = ""
    end
  end

  class CategoryPagesGenerator < Generator
    safe true
    priority :low

    def generate(site)
      categories = site.data["categories"] || []
      seen_slugs = []

      categories.each do |cat|
        next unless cat["slug"] && cat["name"]

        if seen_slugs.include?(cat["slug"])
          raise "Duplicate category slug detected: #{cat['slug']}"
        end
        seen_slugs << cat["slug"]

        site.pages << CategoryPage.new(site, site.source, cat["slug"], cat["name"])
      end
    end
  end
end