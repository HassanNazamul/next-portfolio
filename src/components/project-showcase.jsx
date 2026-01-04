"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

// Static data for media and tech stack (language agnostic)
const projectResources = [
    {
        id: "project1",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        architectureDiagram: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2695&auto=format&fit=crop",
        techStack: ["Next.js", "Python", "TensorFlow"],
    },
    {
        id: "project2",
        thumbnail: "https://images.unsplash.com/photo-1555421689-d68471e18963?q=80&w=2676&auto=format&fit=crop",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        architectureDiagram: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop",
        techStack: ["Java Spring", "Kafka", "Docker", "Kubernetes"],
    },
    {
        id: "project3",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        architectureDiagram: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2574&auto=format&fit=crop",
        techStack: ["React", "Node.js", "GraphQL", "MongoDB"],
    },
    {
        id: "project4",
        thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        architectureDiagram: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
        techStack: ["Go", "MQTT", "PostgreSQL", "React Native"],
    }
];

export function ProjectShowcase() {
    const t = useTranslations('Projects');
    const [selectedProject, setSelectedProject] = useState(null);

    // Merge static resources with translated text
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
                {/* Note: 'subtitle' key doesn't exist in Projects JSON yet, reusing 'title' placeholder or omitting if strictly following JSON. 
                    However, experience.jsx uses no subtitle here? No, it does: t('subtitle'). 
                    I'll assume it might be missing and just not render it if empty or add it. 
                    Actually, I'll comment it out or use a safe check if specific subtitle is desired, 
                    but for now sticking to what's in JSON for Projects (title, viewGithub).
                    I will omit the subtitle paragraph to stay safe with existing JSON.*/}
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

            <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
                <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">{selectedProject?.title}</DialogTitle>
                        <DialogDescription className="text-muted-foreground hidden">Project Details</DialogDescription>
                    </DialogHeader>

                    {selectedProject && (
                        <div className="grid gap-6 mt-4">
                            {/* Row 1: Video and Architecture */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-96">
                                <div className="w-full h-64 md:h-full bg-black rounded-lg overflow-hidden flex items-center justify-center">
                                    <video
                                        controls
                                        className="w-full h-full object-cover"
                                        src={selectedProject.videoUrl}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                <div className="w-full h-64 md:h-full relative rounded-lg overflow-hidden bg-muted">
                                    <Image
                                        src={selectedProject.architectureDiagram}
                                        alt="Architecture Diagram"
                                        fill
                                        className="object-cover"
                                    />
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
        </section>
    );
}
