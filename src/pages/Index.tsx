import { useState, useMemo } from "react";
import { resources, getCategories, Resource } from "@/data/resources";
import Sidebar from "@/components/Sidebar";
import ResourceCard from "@/components/ResourceCard";
import VideoModal from "@/components/VideoModal";
import CategoryChart from "@/components/CategoryChart";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Resource | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Get all categories
  const categories = useMemo(() => getCategories(resources), []);

  // Filter resources
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch = resource.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(resource.type);
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategories]);

  // Count by category (from filtered)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    resources.forEach((r) => {
      counts[r.type] = (counts[r.type] || 0) + 1;
    });
    return counts;
  }, []);

  // Count by category for chart (filtered)
  const filteredCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredResources.forEach((r) => {
      counts[r.type] = (counts[r.type] || 0) + 1;
    });
    return counts;
  }, [filteredResources]);

  // Group filtered resources by category
  const groupedResources = useMemo(() => {
    const groups: Record<string, Resource[]> = {};
    filteredResources.forEach((resource) => {
      if (!groups[resource.type]) {
        groups[resource.type] = [];
      }
      groups[resource.type].push(resource);
    });
    return groups;
  }, [filteredResources]);

  const handlePlayVideo = (resource: Resource) => {
    setSelectedVideo(resource);
    setModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        categoryCounts={categoryCounts}
      />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Biblioteca de Vídeos
          </h1>
          <p className="text-muted-foreground">
            {filteredResources.length} vídeos encontrados
            {selectedCategories.length > 0 && ` en ${selectedCategories.length} categoría(s)`}
          </p>
        </div>

        {/* Chart */}
        <div className="mb-8 max-w-sm">
          <CategoryChart data={filteredCategoryCounts} />
        </div>

        {/* Video grid by category */}
        {Object.keys(groupedResources).length > 0 ? (
          <div className="space-y-10">
            {Object.entries(groupedResources)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([category, categoryResources]) => (
                <section key={category}>
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    {category}
                    <span className="text-sm font-normal text-muted-foreground">
                      ({categoryResources.length})
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoryResources.map((resource) => (
                      <ResourceCard
                        key={resource.id}
                        resource={resource}
                        onPlayVideo={handlePlayVideo}
                      />
                    ))}
                  </div>
                </section>
              ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No se encontraron vídeos con los filtros seleccionados
            </p>
          </div>
        )}
      </main>

      {/* Video modal */}
      <VideoModal
        resource={selectedVideo}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default Index;
