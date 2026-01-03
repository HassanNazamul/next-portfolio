import { FaReact, FaServer, FaMobileAlt, FaDatabase, FaToolbox, FaCode } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AboutMe({ maxTilt, perspective }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <section id="about" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
            <div className="container mx-auto max-w-4xl text-center">

                {/* Heading & Intro */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6 mb-16"
                >
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground">
                        About Me
                    </h2>
                    <div className="h-1 w-24 bg-primary/20 rounded-full mx-auto"></div>
                </motion.div>

                {/* Detailed Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
                >
                    <p>
                        I build scalable, high-performance digital products with a strong focus on{" "}
                        <span className="text-foreground font-medium">Next.js, Java, and Microservices</span>.
                        My work blends clean architecture, thoughtful UI, and production-ready engineering to deliver systems that perform reliably at scale.
                    </p>
                    <p>
                        I design and implement solutions across{" "}
                        <span className="text-foreground font-medium">web, Node.js backends, Android, and iOS platforms</span>,
                        ensuring consistent performance, and user experience on every device.
                    </p>

                    <p>
                        I thrive on simplifying complex problems, optimizing performance, and creating maintainable systems. My goal is to deliver products that are not just functional, but elegant, reliable, and impactful.
                    </p>
                </motion.div>

                {/* Tech Stack Section */}
                <div className="mt-24 space-y-10">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest"
                    >
                        Technologies & Skills
                    </motion.p>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {/* Frontend */}
                        <motion.div variants={itemVariants} className="p-6 rounded-xl bg-background/40 border border-white/5 backdrop-blur-md space-y-4 hover:border-blue-500/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <h3 className="font-medium text-lg text-foreground flex items-center justify-center gap-3">
                                <span className="p-2 rounded-lg bg-blue-500/10 text-blue-500"><FaReact size={20} /></span> Frontend
                            </h3>
                            <div className="flex flex-wrap justify-center gap-2">
                                {["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"].map((skill) => (
                                    <span key={skill} className="px-2.5 py-1 rounded-md bg-secondary/40 text-xs text-muted-foreground font-medium border border-white/5 hover:text-foreground hover:bg-secondary/60 transition-colors">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Backend */}
                        <motion.div variants={itemVariants} className="p-6 rounded-xl bg-background/40 border border-white/5 backdrop-blur-md space-y-4 hover:border-green-500/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <h3 className="font-medium text-lg text-foreground flex items-center justify-center gap-3">
                                <span className="p-2 rounded-lg bg-green-500/10 text-green-500"><FaServer size={20} /></span> Backend
                            </h3>
                            <div className="flex flex-wrap justify-center gap-2">
                                {["Java", "Spring Boot", "Node.js", "Socket API", "Redis", "REST APIs", "Microservices"].map((skill) => (
                                    <span key={skill} className="px-2.5 py-1 rounded-md bg-secondary/40 text-xs text-muted-foreground font-medium border border-white/5 hover:text-foreground hover:bg-secondary/60 transition-colors">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Mobile */}
                        <motion.div variants={itemVariants} className="p-6 rounded-xl bg-background/40 border border-white/5 backdrop-blur-md space-y-4 hover:border-purple-500/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <h3 className="font-medium text-lg text-foreground flex items-center justify-center gap-3">
                                <span className="p-2 rounded-lg bg-purple-500/10 text-purple-500"><FaMobileAlt size={20} /></span> Mobile
                            </h3>
                            <div className="flex flex-wrap justify-center gap-2">
                                {["Android", "iOS"].map((skill) => (
                                    <span key={skill} className="px-2.5 py-1 rounded-md bg-secondary/40 text-xs text-muted-foreground font-medium border border-white/5 hover:text-foreground hover:bg-secondary/60 transition-colors">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Databases */}
                        <motion.div variants={itemVariants} className="p-6 rounded-xl bg-background/40 border border-white/5 backdrop-blur-md space-y-4 hover:border-yellow-500/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <h3 className="font-medium text-lg text-foreground flex items-center justify-center gap-3">
                                <span className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500"><FaDatabase size={20} /></span> Databases
                            </h3>
                            <div className="flex flex-wrap justify-center gap-2">
                                {["PostgreSQL", "MySQL", "MongoDB"].map((skill) => (
                                    <span key={skill} className="px-2.5 py-1 rounded-md bg-secondary/40 text-xs text-muted-foreground font-medium border border-white/5 hover:text-foreground hover:bg-secondary/60 transition-colors">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* DevOps & Tools */}
                        <motion.div variants={itemVariants} className="p-6 rounded-xl bg-background/40 border border-white/5 backdrop-blur-md space-y-4 hover:border-orange-500/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <h3 className="font-medium text-lg text-foreground flex items-center justify-center gap-3">
                                <span className="p-2 rounded-lg bg-orange-500/10 text-orange-500"><FaToolbox size={20} /></span> DevOps & Tools
                            </h3>
                            <div className="flex flex-wrap justify-center gap-2">
                                {["Docker", "Git", "CI/CD", "Linux", "Vercel", "AWS", "GCP"].map((skill) => (
                                    <span key={skill} className="px-2.5 py-1 rounded-md bg-secondary/40 text-xs text-muted-foreground font-medium border border-white/5 hover:text-foreground hover:bg-secondary/60 transition-colors">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Practices */}
                        <motion.div variants={itemVariants} className="p-6 rounded-xl bg-background/40 border border-white/5 backdrop-blur-md space-y-4 hover:border-red-500/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <h3 className="font-medium text-lg text-foreground flex items-center justify-center gap-3">
                                <span className="p-2 rounded-lg bg-red-500/10 text-red-500"><FaCode size={20} /></span> Practices
                            </h3>
                            <div className="flex flex-wrap justify-center gap-2">
                                {["Clean Arch", "Performance", "Scalable Systems", "Agile"].map((skill) => (
                                    <span key={skill} className="px-2.5 py-1 rounded-md bg-secondary/40 text-xs text-muted-foreground font-medium border border-white/5 hover:text-foreground hover:bg-secondary/60 transition-colors">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}