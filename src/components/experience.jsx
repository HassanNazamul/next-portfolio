import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import { useTranslations } from "next-intl";

/**
 * Experience Component
 * Displays professional experience timeline with role, company, and description.
 */
const Experience = () => {
  const t = useTranslations('Experience');

  // Static structure for experience data, populated with translations
  const experiences = [
    {
      role: t('jobs.job1.role'),
      company: t('jobs.job1.company'),
      period: (
        <span className="flex flex-col">
          <span>{t('jobs.job1.period')}</span>
          <span className="text-xs opacity-70">{t('jobs.job1.period2')}</span>
        </span>
      ),
      location: t('jobs.job1.location'),
      description: [
        t('jobs.job1.description.0'),
        t('jobs.job1.description.1'),
        t('jobs.job1.description.2'),
        t('jobs.job1.description.3'),
      ],
    },
    {
      role: t('jobs.job2.role'),
      company: t('jobs.job2.company'),
      period: t('jobs.job2.period'),
      location: t('jobs.job2.location'),
      description: [
        t('jobs.job2.description.0'),
        t('jobs.job2.description.1'),
        t('jobs.job2.description.2'),
        t('jobs.job2.description.3'),
      ],
    },
  ];

  // Animation variants for the container (stagger effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for individual experience cards
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
            {t('title')}
          </h2>
          <div className="h-1 w-24 bg-primary/20 rounded-full mx-auto"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('subtitle')}
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

