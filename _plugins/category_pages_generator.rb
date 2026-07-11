module Jekyll
  class CategoryPage < Page
    def initialize(site, base, slug, category_name)
      @site = site
      @base = base
      @dir  = File.join("categories", slug)
      @name = "index.html"

      self.process(@name)
      self.read_yaml(File.join(base, "_layouts"), "category.html")

      self.data["title"] = category_name
      self.data["category_name"] = category_name
      self.data["permalink"] = "/categories/#{slug}/"
    end
  end

  class CategoryPagesGenerator < Generator
    safe true
    priority :low

    def generate(site)
      categories = site.data["categories"] || []

      categories.each do |cat|
        next unless cat["slug"] && cat["name"]
        site.pages << CategoryPage.new(site, site.source, cat["slug"], cat["name"])
      end
    end
  end
end