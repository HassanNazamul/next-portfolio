import React from "react";
import { Card } from "./ui/card";
import { useTranslations } from "next-intl";

const Project = () => {
  const t = useTranslations('Projects');

  const projects = [
    {
      name: t('list.project1.name'),
      video: "https://www.youtube.com/embed/ZXWdktDBi8Q?si=t_yiD3dKV5WmnKl1",
      description: t('list.project1.description'),
      tech: ["React", "Node.js", "Tailwind CSS"],
      github: "https://github.com/your-repo",
    },
    {
      name: t('list.project2.name'),
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ", // example link
      description: t('list.project2.description'),
      tech: ["Next.js", "TypeScript", "Shadcn UI"],
      github: "https://github.com/your-second-repo",
    },
  ];


  return (
    <section id="projects" className="py-10 px-4 sm:px-6 lg:px-8">

      <div className="md:p-30 sm:p-20 xs:p-10 text-center">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <div key={idx} className="p-4 space-y-4">
              {/* Project Title */}
              <h2 className="text-lg font-semibold text-center">{project.name}</h2>

              {/* Video */}
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <iframe
                  className="w-full h-full"
                  src={project.video}
                  title={`${project.name} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground">{project.description}</p>

              {/* Tech Stack */}
              <div>
                <h4 className="text-sm font-medium mb-1">{t('techStack')}</h4>
                <ul className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {project.tech.map((item, i) => (
                    <li key={i} className="px-2 py-1 bg-muted rounded-md">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* GitHub Button */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {t('viewGithub')}
              </a>
            </ div>
          ))}
        </div>

      </div>

    </section>
  );
};

export default Project;

