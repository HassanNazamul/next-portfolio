
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/shadcn-io/gradient-text/index";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

/**
 * Hero Component
 * Displays the main introduction, availability status, and call-to-action buttons.
 */
const Hero = () => {
  const t = useTranslations('Hero');

  const title = "Mohammed Nazamul Hassan"; // Keeping name hardcoded or could be t('name') if localized name needed.
  // Using t('greeting') for "Hi, I'm"

  return (
    <section id="hero" className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">

        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center rounded-full border bg-background/50 px-3 py-1 text-sm font-medium backdrop-blur-sm mb-6"
        >
          <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
          {t('available')}
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          // Staggered delay for the heading
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="space-y-4 max-w-4xl"
        >
          <div className="text-xl md:text-2xl text-muted-foreground font-medium">
            {t('greeting')}
          </div>

          <GradientText
            text={title}
            gradient="linear-gradient(90deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight"
          />

          <h2 className="text-2xl md:text-3xl font-semibold text-foreground pt-2">
            {t('role')}
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          {t('description')}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button size="lg" className="rounded-full px-8 h-12 text-base transition-transform hover:scale-105" asChild>
            <a href="https://shadcnblocks.com" target="_blank" rel="noopener noreferrer">
              {t('primaryButton')}
            </a>
          </Button>

          <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base backdrop-blur-sm transition-transform hover:scale-105 hover:bg-secondary/60" asChild>
            <a href="mailto:example@example.com" target="_blank" rel="noopener noreferrer">
              {t('secondaryButton')}
            </a>
          </Button>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;

