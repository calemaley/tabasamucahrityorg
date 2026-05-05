import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Maximize2, Minimize2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const photos = Array.from({ length: 50 }, (_, i) =>
  `/gallery/photo_${String(i + 1).padStart(3, "0")}.jpg`
);

const Gallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setLightbox(null);
    setZoom(1);
    if (document.fullscreenElement) document.exitFullscreen();
  }, []);

  const prev = useCallback(() => {
    setZoom(1);
    setLightbox((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, []);

  const next = useCallback(() => {
    setZoom(1);
    setLightbox((i) => (i === null ? null : (i + 1) % photos.length));
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await lightboxRef.current?.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "+") setZoom((z) => Math.min(z + 0.25, 3));
      if (e.key === "-") setZoom((z) => Math.max(z - 0.25, 1));
      if (e.key === "f" || e.key === "F") toggleFullscreen();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, close, prev, next, toggleFullscreen]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Navigation />
      </div>

      {/* Masonry photo grid */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-2 p-2 bg-charity-neutral-50">
        {photos.map((src, index) => (
          <div
            key={src}
            className="break-inside-avoid mb-2 cursor-zoom-in overflow-hidden rounded-lg group relative"
            onClick={() => { setLightbox(index); setZoom(1); }}
          >
            <img
              src={src}
              alt={`Tabasamu charity photo ${index + 1}`}
              loading="lazy"
              className="w-full h-auto block group-hover:scale-110 transition-transform duration-500"
            />
            {/* Zoom icon overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-lg flex items-center justify-center">
              <ZoomIn className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          onClick={close}
        >
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/70 to-transparent z-10">
            <span className="text-white/70 text-sm font-medium">
              {lightbox + 1} / {photos.length}
            </span>
            <div className="flex items-center gap-2">
              {/* Zoom controls */}
              <button
                onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.max(z - 0.25, 1)); }}
                className="px-3 py-1 bg-white/10 hover:bg-white/25 rounded-lg text-white text-lg font-bold transition-colors"
                title="Zoom out ( - )"
              >
                −
              </button>
              <span className="text-white/70 text-sm w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button
                onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(z + 0.25, 3)); }}
                className="px-3 py-1 bg-white/10 hover:bg-white/25 rounded-lg text-white text-lg font-bold transition-colors"
                title="Zoom in ( + )"
              >
                +
              </button>
              {/* Fullscreen toggle */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                className="p-2 bg-white/10 hover:bg-white/25 rounded-full transition-colors ml-2"
                title="Toggle fullscreen ( F )"
              >
                {isFullscreen
                  ? <Minimize2 className="h-5 w-5 text-white" />
                  : <Maximize2 className="h-5 w-5 text-white" />}
              </button>
              {/* Close */}
              <button
                onClick={(e) => { e.stopPropagation(); close(); }}
                className="p-2 bg-white/10 hover:bg-white/25 rounded-full transition-colors"
                title="Close ( Esc )"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 p-3 bg-white/10 hover:bg-white/25 rounded-full transition-colors z-10"
          >
            <ChevronLeft className="h-7 w-7 text-white" />
          </button>

          {/* Image with zoom */}
          <div
            className="overflow-auto flex items-center justify-center w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightbox]}
              alt={`Tabasamu charity photo ${lightbox + 1}`}
              style={{ transform: `scale(${zoom})`, transition: "transform 0.2s ease", transformOrigin: "center center" }}
              className={`${zoom === 1 ? "max-h-[92vh] max-w-[92vw]" : ""} object-contain rounded-lg shadow-2xl select-none`}
              onClick={(e) => { e.stopPropagation(); setZoom((z) => z < 2 ? Math.min(z + 0.5, 3) : 1); }}
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 p-3 bg-white/10 hover:bg-white/25 rounded-full transition-colors z-10"
          >
            <ChevronRight className="h-7 w-7 text-white" />
          </button>

          {/* Bottom hint */}
          {zoom === 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs">
              Click photo to zoom · F for fullscreen · ← → to navigate
            </div>
          )}
        </div>
      )}

      <Footer />
    </>
  );
};

export default Gallery;
