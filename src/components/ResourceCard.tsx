import { Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Resource, getCategoryColor, isPlayableVideo } from "@/data/resources";

interface ResourceCardProps {
  resource: Resource;
  onPlayVideo: (resource: Resource) => void;
}

const ResourceCard = ({ resource, onPlayVideo }: ResourceCardProps) => {
  const playable = isPlayableVideo(resource.url);
  const categoryColor = getCategoryColor(resource.type);

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 flex flex-col gap-4">
      {/* Badge */}
      <div className="flex items-start justify-between gap-2">
        <span
          className="text-xs font-medium px-3 py-1 rounded-full"
          style={{
            backgroundColor: `hsl(${categoryColor} / 0.15)`,
            color: `hsl(${categoryColor})`,
          }}
        >
          {resource.type}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-medium text-foreground leading-snug flex-1">
        {resource.description}
      </h3>

      {/* Action */}
      {playable ? (
        <Button
          onClick={() => onPlayVideo(resource)}
          className="w-full bg-primary hover:bg-primary/90"
        >
          <Play className="w-4 h-4 mr-2" />
          Ver vídeo
        </Button>
      ) : (
        <Button
          variant="outline"
          asChild
          className="w-full"
        >
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            Visitar enlace
          </a>
        </Button>
      )}
    </div>
  );
};

export default ResourceCard;
