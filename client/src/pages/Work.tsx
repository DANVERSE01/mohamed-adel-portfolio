import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Search, Play, Filter } from "lucide-react";
import { Link } from "wouter";
import GlassCard from "@/components/GlassCard";
import LazyImage from "@/components/LazyImage";
import LazyVideo from "@/components/LazyVideo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { portfolioAssets, CATEGORIES } from "@/data/portfolio";

export default function Work() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsToShow, setItemsToShow] = useState(12);

  // Filter and search logic
  const filteredAssets = useMemo(() => {
    let filtered = portfolioAssets;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(asset => asset.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(asset =>
        asset.title.toLowerCase().includes(query) ||
        asset.caption.toLowerCase().includes(query) ||
        asset.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const visibleAssets = filteredAssets.slice(0, itemsToShow);
  const hasMore = filteredAssets.length > itemsToShow;

  const handleLoadMore = () => {
    setItemsToShow(prev => prev + 12);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Portfolio
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore my collection of AI-powered creative projects spanning character design, 
            brand identity, cinematic production, and digital art.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects by title, category, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-background/50 backdrop-blur-sm border-border/50"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter by Category:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="rounded-full filter-button hover-glow"
            >
              All Projects
            </Button>
            {CATEGORIES.map((category: string) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full filter-button hover-glow"
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8 text-center text-muted-foreground"
        >
          Showing {visibleAssets.length} of {filteredAssets.length} projects
        </motion.div>

        {/* Projects Grid */}
        {filteredAssets.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {visibleAssets.map((asset, index) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <Link href={`/work/${asset.id}`}>
                    <GlassCard className="overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300">
                      <div className="relative aspect-square overflow-hidden">
                        {asset.type === 'video' ? (
                          <LazyVideo
                            src={asset.file}
                            className="w-full h-full object-cover"
                            containerClassName="w-full h-full bg-black/20"
                          />
                        ) : (
                          <LazyImage
                            src={asset.file}
                            alt={asset.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            containerClassName="w-full h-full"
                          />
                        )}
                      </div>
                      <div className="p-6">
                        <div className="text-sm text-primary mb-2">{asset.category}</div>
                        <h3 className="text-xl font-semibold mb-2 line-clamp-1">{asset.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">{asset.caption}</p>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <Button
                  size="lg"
                  onClick={handleLoadMore}
                  className="group"
                >
                  Load More Projects
                </Button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-20"
          >
            <GlassCard className="p-12 max-w-md mx-auto">
              <h3 className="text-2xl font-bold mb-4">No Projects Found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </Button>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  );
}
