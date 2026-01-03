"use client";
import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import emailjs from '@emailjs/browser';
import { useTranslations } from "next-intl";

// Custom Textarea component inheriting the Input style logic
const TextArea = React.forwardRef(({ className, ...props }, ref) => {
    const radius = 100;
    const [visible, setVisible] = React.useState(false);
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            style={{
                background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          #3b82f6,
          transparent 80%
        )
      `,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="group/input rounded-lg p-[2px] transition duration-300"
        >
            <textarea
                className={cn(
                    `flex min-h-[120px] w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_#404040] group-hover/input:shadow-none transition duration-400`,
                    className
                )}
                ref={ref}
                {...props}
            />
        </motion.div>
    );
});
TextArea.displayName = "TextArea";

export default function ContactMe() {
    const t = useTranslations('Contact');
    const form = useRef();
    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            setStatus({ loading: false, success: false, error: "Missing EmailJS configuration." });
            return;
        }

        emailjs
            .sendForm(serviceId, templateId, form.current, {
                publicKey: publicKey,
            })
            .then(
                () => {
                    setStatus({ loading: false, success: true, error: null });
                    form.current.reset();
                },
                (error) => {
                    console.error("FAILED...", error.text);
                    setStatus({ loading: false, success: false, error: t('error') });
                },
            );
    };

    return (
        <section id="contact" className="py-24">
            <div
                className="shadow-input mx-auto w-full max-w-xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black border border-white/10 backdrop-blur-md bg-opacity-50">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 text-center font-serif">
                        {t('title')}
                    </h2>
                    <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-300">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <form className="my-8" ref={form} onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="from_name">{t('name')}</Label>
                        <Input id="from_name" name="from_name" placeholder={t('placeholders.name')} type="text" required />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="from_email">{t('email')}</Label>
                        <Input id="from_email" name="from_email" placeholder={t('placeholders.email')} type="email" required />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="message">{t('message')}</Label>
                        <TextArea
                            id="message"
                            name="message"
                            placeholder={t('placeholders.message')}
                            required
                        />
                    </LabelInputContainer>

                    <button
                        className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={status.loading}
                    >
                        {status.loading ? t('sending') : t('send')} &rarr;
                        <BottomGradient />
                    </button>

                    {status.success && <p className="mt-4 text-center text-green-500 text-sm">{t('success')}</p>}
                    {status.error && <p className="mt-4 text-center text-red-500 text-sm">{status.error}</p>}

                    <div
                        className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
                </form>
            </div>
        </section>
    );
}


const BottomGradient = () => {
    return (
        <>
            <span
                className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span
                className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};
