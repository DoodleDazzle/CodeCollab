"use client";

import { useEffect } from "react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Code2, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/authProvider";
import { useRouter } from "next/navigation"; // Correct import

// Define a simple fade-in variant for animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function Home() {
  const { user, loading } = useAuth(); // Ensure we check loading state
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStartCoding = () => {
    if (loading) return; // Prevent redirect while loading user state
    if (user) {
      router.push("/editor"); // Redirect to editor if user is logged in
    } else {
      router.push("/signup"); // Redirect to sign-up page if not logged in
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="flex-1 flex flex-col items-center justify-center space-y-10 px-4 pt-24 pb-16 text-center relative"
      >
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold ">
          Euphoric Coding Through Intelligent Teamwork
          </h1>
          <p className="text-xl text-muted-foreground">
          The future of coding: AI assistance, real-time teamwork, and deep analytics.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            className="bg-[#FF073A] font-semibold text-white hover:bg-[#d2042d] h-11 rounded-full px-8 text-lg flex items-center"
            onClick={handleStartCoding}
            disabled={loading} // Disable button while user state is loading
          >
            <Code2 className="mr-2 h-5 w-5" /> Start Coding
          </Button>
          <Link href="/join" passHref>
            <Button size="lg" variant="outline" className="text-lg font-semibold rounded-full">
              <Users className="mr-2 h-5 w-5" /> Join Session
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* Code Editor Demo */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="container py-20 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Try It Yourself</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Experience real-time collaboration and AI assistance in action.
        </p>
        <div className="w-full max-w-2xl mx-auto bg-card p-4 rounded-lg border">
          <iframe
            src="https://codesandbox.io/embed/new?codemirror=1"
            className="w-full h-96 rounded-lg border"
            title="Live Code Editor"
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
          ></iframe>
        </div>
      </motion.section>

      {/* Video Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="container py-20 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">See It in Action</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Watch how CodeCollab AI enhances your coding experience.
        </p>
        <div className="flex justify-center">
          <video className="rounded-lg border shadow-lg w-full max-w-2xl" controls>
            <source src="/demo-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="container py-20 text-center"
      >
        <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border bg-card">
            <p className="text-lg italic">
              "This platform has revolutionized how our team codes together!"
            </p>
            <h4 className="font-semibold mt-4">- Alex Doe</h4>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <p className="text-lg italic">
              "The AI suggestions are incredibly helpful and save us tons of time."
            </p>
            <h4 className="font-semibold mt-4">- Jamie Lee</h4>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <p className="text-lg italic">
              "Real-time collaboration is seamless. Love it!"
            </p>
            <h4 className="font-semibold mt-4">- Chris Brown</h4>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-6 text-center text-muted-foreground"
      >
        © 2025 CodeCollab AI. All rights reserved.
      </motion.footer>
    </div>
  );
}
