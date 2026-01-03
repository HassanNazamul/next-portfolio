import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

const Experience = () => {
  const experiences = [
    {
      role: "Software Developer",
      company: "Kyrotics – AI Solution Startup",
      period: (
        <span className="flex flex-col">
          <span>Oct 2024 - Dec 2024</span>
          <span className="text-xs opacity-70">& Jul 2025 - Sep 2025</span>
        </span>
      ),
      location: "Remote",
      description: [
        "Contributed to a comparison tool that improved AI content review efficiency.",
        "Optimized performance via Redis Caching, reducing response time by 55% and backend load by 30%.",
        "Refactored API endpoints, reducing system load and backend stress resulting speedy performance.",
        "Collaborated to identify issues, and offer actionable feedback, enabling better decision making.",
      ],
    },
    {
      role: "Jr. Software Developer",
      company: "Skill Squirrel",
      period: "Jan 2024 - Apr 2024",
      location: "Mississauga, ON",
      description: [
        "Developed interactive user interface using React, ensuring seamless and modern user experience.",
        "Refactored redundant CSS into a fully responsive design, ensuring 100% cross device compatibility.",
        "Implemented WCAG accessibility standards, enhancing the platform for user with disabilities.",
        "Collaborated in an Agile team to deliver high-quality components through rigorous peer reviews.",
      ],
    },
  ];

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
    <section id="experience" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground">
            Experience
          </h2>
          <div className="h-1 w-24 bg-primary/20 rounded-full mx-auto"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional journey in software development.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative p-8 rounded-2xl bg-background/60 border border-white/10 backdrop-blur-md hover:border-primary/30 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">

                {/* Left Side: Role & Meta Info */}
                <div className="md:w-1/3 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-lg font-semibold text-muted-foreground mt-1">
                      {exp.company}
                    </p>
                  </div>

                  <div className="space-y-3 text-sm text-foreground/80 font-medium">
                    <div className="flex items-start gap-3">
                      <FaCalendarAlt className="text-primary mt-1" />
                      <div className="leading-tight">{exp.period}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-primary" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Description */}
                <div className="md:w-2/3">
                  <ul className="space-y-4">
                    {exp.description.map((point, i) => (
                      <li key={i} className="flex gap-3 text-foreground/90 text-base leading-relaxed">
                        <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(var(--primary),0.8)]"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
