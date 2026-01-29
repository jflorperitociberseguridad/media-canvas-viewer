import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getCategoryColor } from "@/data/resources";

interface SidebarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  categoryCounts: Record<string, number>;
}

const Sidebar = ({
  searchTerm,
  setSearchTerm,
  categories,
  selectedCategories,
  setSelectedCategories,
  categoryCounts,
}: SidebarProps) => {
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
  };

  const hasActiveFilters = searchTerm || selectedCategories.length > 0;

  return (
    <aside className="w-72 min-h-screen bg-sidebar-background border-r border-sidebar-border p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <Filter className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-semibold text-sidebar-foreground">Biblioteca</h2>
          <p className="text-xs text-muted-foreground">de Vídeos</p>
        </div>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-sidebar-foreground">Buscar</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-sidebar-accent border-sidebar-border"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3 flex-1">
        <label className="text-sm font-medium text-sidebar-foreground">Temáticas</label>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent cursor-pointer transition-colors"
            >
              <Checkbox
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: `hsl(${getCategoryColor(category)})` }}
              />
              <span className="text-sm text-sidebar-foreground flex-1">{category}</span>
              <span className="text-xs text-muted-foreground bg-sidebar-accent px-2 py-0.5 rounded-full">
                {categoryCounts[category] || 0}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full border-sidebar-border"
        >
          <X className="w-4 h-4 mr-2" />
          Limpiar filtros
        </Button>
      )}
    </aside>
  );
};

export default Sidebar;
