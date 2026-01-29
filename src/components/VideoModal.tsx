import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Resource, getVideoEmbedUrl } from "@/data/resources";

interface VideoModalProps {
  resource: Resource | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VideoModal = ({ resource, open, onOpenChange }: VideoModalProps) => {
  if (!resource) return null;

  const embedUrl = getVideoEmbedUrl(resource.url);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-card">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-lg font-semibold pr-8">
            {resource.description}
          </DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full">
          {embedUrl && (
            <iframe
              src={embedUrl}
              title={resource.description}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
