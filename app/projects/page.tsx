"use client"

export const dynamic = 'force-dynamic'

import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Search, ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { projects, type Project } from "@/data/projects"
import { PageTransition } from "@/components/page-transition"

function ProjectImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imagesPerView, setImagesPerView] = useState(3)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [lightboxLoaded, setLightboxLoaded] = useState(false)

  useEffect(() => {
    const updateImagesPerView = () => {
      setImagesPerView(window.innerWidth >= 768 ? 3 : 2)
    }
    
    updateImagesPerView()
    window.addEventListener("resize", updateImagesPerView)
    return () => window.removeEventListener("resize", updateImagesPerView)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + imagesPerView
        if (next >= images.length) {
          return 0
        }
        return next
      })
    }, 3000) // Auto-scroll every 3 seconds

    return () => clearInterval(interval)
  }, [images.length, imagesPerView])

  const visibleImages: Array<{ image: string; index: number }> = []
  for (let i = 0; i < imagesPerView && i < images.length; i++) {
    const index = (currentIndex + i) % images.length
    visibleImages.push({ image: images[index], index })
  }

  // Preload next set of images for smooth scrolling
  useEffect(() => {
    const preloadIndices = new Set<number>()
    visibleImages.forEach(item => preloadIndices.add(item.index))
    
    // Preload next batch for smooth transitions
    const nextBatchStart = (currentIndex + imagesPerView) % images.length
    for (let i = 0; i < imagesPerView && i < images.length; i++) {
      const preloadIndex = (nextBatchStart + i) % images.length
      preloadIndices.add(preloadIndex)
    }

    preloadIndices.forEach((index: number) => {
      if (!loadedImages.has(index)) {
        const img = new window.Image()
        img.src = images[index]
        img.onload = () => {
          setLoadedImages(prev => new Set(prev).add(index))
        }
        img.onerror = () => {
          // Handle error silently
          setLoadedImages(prev => new Set(prev).add(index))
        }
      }
    })
  }, [currentIndex, imagesPerView, images, loadedImages])

  // Preload lightbox images when opened and when navigating
  useEffect(() => {
    if (lightboxOpen) {
      // Preload current, previous, and next images for smooth navigation
      const nextIndex = (lightboxIndex + 1) % images.length
      const prevIndex = (lightboxIndex - 1 + images.length) % images.length
      const indicesToPreload = [lightboxIndex, prevIndex, nextIndex]
      
      indicesToPreload.forEach((index: number) => {
        if (!loadedImages.has(index)) {
          const img = new window.Image()
          img.src = images[index]
          img.onload = () => {
            setLoadedImages(prev => new Set(prev).add(index))
          }
          img.onerror = () => {
            setLoadedImages(prev => new Set(prev).add(index))
          }
        }
      })
    }
  }, [lightboxOpen, lightboxIndex, images, loadedImages])

  const totalPages = Math.ceil(images.length / imagesPerView)

  const openLightbox = (imageIndex: number) => {
    setLightboxIndex(imageIndex)
    setLightboxOpen(true)
  }

  const navigateLightbox = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    } else {
      setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }
  }

  useEffect(() => {
    if (!lightboxOpen) return
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
      }
      if (e.key === "Escape") {
        setLightboxOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [lightboxOpen, images.length])

  return (
    <>
      <div className="relative w-full overflow-hidden rounded-lg bg-muted/30">
        <div className="flex gap-2 p-2">
          {visibleImages.map((item, idx) => (
            <motion.div
              key={`${currentIndex}-${idx}-${item.index}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 cursor-pointer group"
              style={{ width: `calc(${100 / imagesPerView}% - ${(imagesPerView - 1) * 0.5}rem)` }}
              onClick={() => openLightbox(item.index)}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted transition-transform group-hover:scale-105">
                {!loadedImages.has(item.index) && (
                  <Skeleton className="absolute inset-0 w-full h-full" />
                )}
                <Image
                  src={item.image}
                  alt={`Project screenshot ${idx + 1}`}
                  fill
                  className={`object-contain transition-opacity duration-300 ${
                    loadedImages.has(item.index) ? "opacity-100" : "opacity-0"
                  }`}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  loading={idx === 0 ? "eager" : "lazy"}
                  quality={85}
                  onLoad={() => setLoadedImages(prev => new Set(prev).add(item.index))}
                />
              </div>
            </motion.div>
          ))}
        </div>
        {/* Dots indicator */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-1 mt-2 pb-1">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageIndex = idx * imagesPerView
              const isActive = currentIndex >= pageIndex && currentIndex < pageIndex + imagesPerView
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(pageIndex)}
                  className={`h-1.5 rounded-full transition-all ${
                    isActive ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              )
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-7xl max-h-[95vh] p-0 bg-black/95 border-none">
          <div className="relative w-full h-[95vh] flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Previous button */}
            {images.length > 1 && (
              <button
                onClick={() => navigateLightbox("prev")}
                className="absolute left-4 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Image */}
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full max-w-7xl"
                >
                  {!loadedImages.has(lightboxIndex) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Skeleton className="w-full h-full" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white/50 text-sm">Loading image...</div>
                      </div>
                    </div>
                  )}
                  <Image
                    src={images[lightboxIndex]}
                    alt={`Project screenshot ${lightboxIndex + 1}`}
                    fill
                    className={`object-contain transition-opacity duration-300 ${
                      loadedImages.has(lightboxIndex) ? "opacity-100" : "opacity-0"
                    }`}
                    sizes="100vw"
                    quality={90}
                    priority={lightboxIndex < 3}
                    onLoad={() => {
                      setLoadedImages(prev => new Set(prev).add(lightboxIndex))
                      setLightboxLoaded(true)
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next button */}
            {images.length > 1 && (
              <button
                onClick={() => navigateLightbox("next")}
                className="absolute right-4 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-black/50 text-white text-sm">
                {lightboxIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState<string>("all")

  const categories = Array.from(new Set(projects.map((p) => p.category)))
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter((p) => p.category === filter)

  return (
    <PageTransition>
      <div className="container px-4 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A collection of projects I&apos;ve worked on, showcasing my skills and experience.
          </p>
        </motion.div>

        <Tabs value={filter} onValueChange={setFilter} className="space-y-8">
          <div className="w-full border-b overflow-x-auto scrollbar-hide">
            <TabsList className="flex items-center gap-1 justify-start bg-transparent p-0 h-auto w-max min-w-full">
              <TabsTrigger value="all" className="shrink-0 rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                All
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="shrink-0 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={filter} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card 
                      className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-xl">{project.title}</CardTitle>
                          {project.featured && (
                            <Badge variant="default">Featured</Badge>
                          )}
                        </div>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 4 && (
                            <Badge variant="outline">
                              +{project.technologies.length - 4}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation()
                            setSelectedProject(project)
                          }}
                          className="flex-1"
                        >
                          <Search className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                        {project.liveUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                          >
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                          >
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          {selectedProject && (
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                <DialogDescription>{selectedProject.description}</DialogDescription>
              </DialogHeader>
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="mt-4">
                  <ProjectImageCarousel images={selectedProject.images} />
                </div>
              )}
              <div className="space-y-4">
                <p className="text-muted-foreground">{selectedProject.longDescription}</p>
                <div>
                  <h4 className="font-semibold mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  {selectedProject.liveUrl && (
                    <Button asChild>
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {selectedProject.githubUrl && (
                    <Button variant="outline" asChild>
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </PageTransition>
  )
}
