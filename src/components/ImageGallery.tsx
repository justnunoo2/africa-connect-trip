import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  mainImage: string;
  subImages?: string[];
  alt: string;
}

const ImageGallery = ({ mainImage, subImages = [], alt }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(mainImage);
  
  // If no subImages provided, use mainImage as the only image
  const allImages = subImages.length > 0 ? [mainImage, ...subImages] : [mainImage];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-[400px] rounded-xl overflow-hidden">
        <img
          src={selectedImage}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Images */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={cn(
                "relative h-20 rounded-lg overflow-hidden border-2 transition-all hover:opacity-80",
                selectedImage === image
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent"
              )}
            >
              <img
                src={image}
                alt={`${alt} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
