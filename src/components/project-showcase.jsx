"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

// Helper component for zoomable image
function ZoomableImage({ src, alt }) {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleZoomIn = () => setScale((s) => Math.min(s + 0.5, 5));
    const handleZoomOut = () => setScale((s) => Math.max(s - 0.5, 0.5));
    const handleReset = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    return (
        <div className="relative w-full h-full overflow-hidden bg-muted/20 rounded-lg border border-border group/zoom">
            {/* Controls */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover/zoom:opacity-100 transition-opacity">
                <Button variant="secondary" size="icon" onClick={handleZoomIn} className="h-8 w-8 bg-background/80 backdrop-blur-sm shadow-sm" title="Zoom In">
                    +
                </Button>
                <Button variant="secondary" size="icon" onClick={handleZoomOut} className="h-8 w-8 bg-background/80 backdrop-blur-sm shadow-sm" title="Zoom Out">
                    -
                </Button>
                <Button variant="secondary" size="icon" onClick={handleReset} className="h-8 w-8 bg-background/80 backdrop-blur-sm shadow-sm" title="Reset View">
                    ↺
                </Button>
            </div>

            {/* Hint overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-0 group-hover/zoom:opacity-100 transition-opacity">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs shadow-sm">
                    Scroll to zoom • Drag to pan
                </Badge>
            </div>

            <motion.div
                className="w-full h-full cursor-grab active:cursor-grabbing"
                drag
                dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
                animate={{ scale, x: position.x, y: position.y }}
                onDragEnd={(e, { offset }) => setPosition({ x: position.x + offset.x, y: position.y + offset.y })}
                onWheel={(e) => {
                    e.ctrlKey ? null : e.stopPropagation(); // prevent page scroll if wanted, or just standard behavior
                    if (e.deltaY < 0) handleZoomIn();
                    else handleZoomOut();
                }}
            >
                <div className="relative w-full h-full min-h-[500px]">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-contain pointer-events-none"
                    />
                </div>
            </motion.div>
        </div>
    );
}

// Helper component for simple tabs
function SequenceViewer({ diagrams }) {
    const [activeTab, setActiveTab] = useState(diagrams[0].value);
    const activeDiagram = diagrams.find(d => d.value === activeTab) || diagrams[0];

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex space-x-2 mb-4 overflow-x-auto pb-2 no-visible-scrollbar">
                {diagrams.map((seq) => (
                    <button
                        key={seq.value}
                        onClick={() => setActiveTab(seq.value)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap border",
                            activeTab === seq.value
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80"
                        )}
                    >
                        {seq.title}
                    </button>
                ))}
            </div>

            <div className="flex-1 w-full h-full min-h-[500px]">
                {activeDiagram && (
                    <ZoomableImage src={activeDiagram.url} alt={activeDiagram.title} />
                )}
            </div>
        </div>
    );
}

// Static data for media and tech stack (language agnostic)
const projectResources = [
    {
        id: "project1",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        architecture: {
            // classDiagram: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2695&auto=format&fit=crop",
            erd: "/project/p1/ERD.svg",
            highLevelDesign: "/project/p1/HLD.svg",
            sequencePreview: "/project/p1/Login-OTPRequest.svg",
            sequenceDiagrams: [
                {
                    title: "Auth Flow",
                    value: "auth-flow",
                    url: "/project/p1/Login-OTPRequest.svg"
                },
                {
                    title: "Otp Verification & JWT Creation",
                    value: "otp-verification-jwt-creation",
                    url: "/project/p1/OTP-Verification-JWT-Creation.svg"
                },
                {
                    title: "Accessing Chat",
                    value: "accessing-chat",
                    url: "/project/p1/Accessing-Protected-APIs.svg"
                },
                {
                    title: "Real Time Message Flow",
                    value: "Real-Time Message",
                    url: "/project/p1/Real-Time-Message-Flow.svg"
                }
            ]
        },
        techStack: ["Next.js", "Python", "TensorFlow"],
    },
    {
        id: "project2",
        thumbnail: "https://images.unsplash.com/photo-1555421689-d68471e18963?q=80&w=2676&auto=format&fit=crop",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        architecture: {
            classDiagram: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2695&auto=format&fit=crop",
            erd: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2670&auto=format&fit=crop",
            highLevelDesign: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop",
            sequenceDiagrams: [
                {
                    title: "User Onboarding",
                    value: "user-onboarding",
                    url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop"
                }
            ]
        },
        techStack: ["Java Spring", "Kafka", "Docker", "Kubernetes"],
    },
    {
        id: "project3",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        architecture: {
            classDiagram: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2695&auto=format&fit=crop",
            erd: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2670&auto=format&fit=crop",
            highLevelDesign: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop",
            sequenceDiagrams: [
                { title: "API Request", value: "api-request", url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop" }
            ]
        },
        techStack: ["React", "Node.js", "GraphQL", "MongoDB"],
    },
    {
        id: "project4",
        thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        architecture: {
            classDiagram: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2695&auto=format&fit=crop",
            erd: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2670&auto=format&fit=crop",
            highLevelDesign: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop",
            sequenceDiagrams: [
                { title: "Sync Process", value: "sync-process", url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop" }
            ]
        },
        techStack: ["Go", "MQTT", "PostgreSQL", "React Native"],
    }
];

export function ProjectShowcase() {
    const t = useTranslations('Projects');
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeDetail, setActiveDetail] = useState(null);

    const projects = projectResources.map((res) => ({
        ...res,
        title: t(`list.${res.id}.title`),
        briefDescription: t(`list.${res.id}.briefDescription`),
        fullDescription: t(`list.${res.id}.fullDescription`),
    }));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <section id="projects" className="container mx-auto p-4 py-24 md:py-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16 space-y-4"
            >
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground">
                    {t('title')}
                </h2>
                <div className="h-1 w-24 bg-primary/20 rounded-full mx-auto"></div>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {projects.map((project) => (
                    <motion.div key={project.id} variants={itemVariants}>
                        <Card
                            className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden group h-full"
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="relative h-48 w-full">
                                <Image
                                    src={project.thumbnail}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <CardContent className="p-4">
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-muted-foreground">{project.briefDescription}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            {/* Main Project Modal */}
            <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
                <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">{selectedProject?.title}</DialogTitle>
                        <DialogDescription className="text-muted-foreground hidden">Project Details</DialogDescription>
                    </DialogHeader>

                    {selectedProject && (
                        <div className="grid gap-6 mt-4">
                            {/* Row 1: Video and Architecture Grid Side-by-Side */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-96">
                                {/* Video Section */}
                                <div className="w-full h-64 md:h-full bg-black rounded-lg overflow-hidden flex items-center justify-center">
                                    <video
                                        controls
                                        className="w-full h-full object-cover"
                                        src={selectedProject.videoUrl}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                </div>

                                {/* Architecture Grid (2x2) */}
                                <div className="grid grid-cols-2 grid-rows-2 gap-4 h-64 md:h-full">
                                    {/* 1. Class Diagram */}
                                    {selectedProject.architecture.classDiagram && (
                                        <div
                                            className="relative rounded-lg overflow-hidden border border-border cursor-pointer group hover:ring-2 hover:ring-primary transition-all"
                                            onClick={() => setActiveDetail({ type: 'image', title: 'Class Diagram', content: selectedProject.architecture.classDiagram })}
                                        >
                                            <Image
                                                src={selectedProject.architecture.classDiagram}
                                                alt="Class Diagram"
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-white text-xs font-medium text-center backdrop-blur-sm">
                                                Class Diagram
                                            </div>
                                        </div>
                                    )}

                                    {/* 2. ERD */}
                                    {selectedProject.architecture.erd && (
                                        <div
                                            className="relative rounded-lg overflow-hidden border border-border cursor-pointer group hover:ring-2 hover:ring-primary transition-all"
                                            onClick={() => setActiveDetail({ type: 'image', title: 'Entity Relationship Diagram', content: selectedProject.architecture.erd })}
                                        >
                                            <Image
                                                src={selectedProject.architecture.erd}
                                                alt="ERD"
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-white text-xs font-medium text-center backdrop-blur-sm">
                                                ERD
                                            </div>
                                        </div>
                                    )}

                                    {/* 3. HLD */}
                                    {selectedProject.architecture.highLevelDesign && (
                                        <div
                                            className="relative rounded-lg overflow-hidden border border-border cursor-pointer group hover:ring-2 hover:ring-primary transition-all"
                                            onClick={() => setActiveDetail({ type: 'image', title: 'High Level Design', content: selectedProject.architecture.highLevelDesign })}
                                        >
                                            <Image
                                                src={selectedProject.architecture.highLevelDesign}
                                                alt="High Level Design"
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-white text-xs font-medium text-center backdrop-blur-sm">
                                                High Level Design
                                            </div>
                                        </div>
                                    )}

                                    {/* 4. Sequence Diagrams */}
                                    {selectedProject.architecture.sequenceDiagrams && (
                                        <div
                                            className="relative rounded-lg overflow-hidden border border-border bg-muted cursor-pointer group hover:ring-2 hover:ring-primary transition-all flex items-center justify-center"
                                            onClick={() => setActiveDetail({ type: 'sequence', title: 'Sequence Diagrams', content: selectedProject.architecture.sequenceDiagrams })}
                                        >
                                            <Image
                                                src={selectedProject.architecture.sequencePreview || selectedProject.architecture.sequenceDiagrams[0].url}
                                                alt="Sequence Diagrams"
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-50"
                                            />
                                            <div className="z-10 bg-background/80 px-3 py-1 rounded-full text-foreground text-sm font-semibold shadow-sm">
                                                View Sequence
                                            </div>
                                            <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-white text-xs font-medium text-center backdrop-blur-sm">
                                                Sequence Diagrams
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Row 2: Tech Stack, Description, Read More */}
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-2">{t('techStack')}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.techStack.map((tech) => (
                                            <Badge key={tech} variant="secondary">{tech}</Badge>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2">Description</h4>
                                    <p className="leading-relaxed text-muted-foreground">
                                        {selectedProject.fullDescription}
                                    </p>
                                </div>

                                <div className="pt-2 flex gap-4">
                                    <Button onClick={() => window.open('#', '_blank')}>
                                        {t('viewGithub')}
                                    </Button>
                                    {selectedProject.youtubeUrl && (
                                        <Button variant="outline" onClick={() => window.open(selectedProject.youtubeUrl, '_blank')}>
                                            Watch on YouTube
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Nested Detail Modal */}
            <Dialog open={!!activeDetail} onOpenChange={(open) => !open && setActiveDetail(null)}>
                <DialogContent className="max-w-6xl max-h-[95vh] w-full overflow-hidden flex flex-col">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">{activeDetail?.title}</DialogTitle>
                        <DialogDescription className="hidden">Detailed View</DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 min-h-[50vh] mt-4 relative">
                        {activeDetail?.type === 'image' && (
                            <div className="w-full h-full min-h-[60vh]">
                                <ZoomableImage src={activeDetail.content} alt={activeDetail.title} />
                            </div>
                        )}

                        {activeDetail?.type === 'sequence' && (
                            <div className="w-full h-full min-h-[60vh]">
                                <SequenceViewer diagrams={activeDetail.content} />
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

        </section>
    );
}
