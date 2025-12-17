"use client"

export const dynamic = 'force-dynamic'

import * as React from "react"
import { motion } from "framer-motion"
import { GraduationCap, Code } from "lucide-react"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { personalInfo } from "@/data/personal"
import { education } from "@/data/education"
import { skills } from "@/data/skills"
import { PageTransition } from "@/components/page-transition"

export default function AboutPage() {
  const topSkills = skills.slice(0, 8)

  return (
    <PageTransition>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 glitter-bg opacity-30"></div>
        <div className="container px-4 py-12 md:py-24 space-y-16 relative z-10">
        {/* Professional Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold">About Me</h1>
          <p className="text-xl text-muted-foreground leading-relaxed text-justify">
            {personalInfo.bio}
          </p>
        </motion.section>

        {/* Education Timeline */}
        <section className="space-y-6">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6" />
            <h2 className="text-3xl font-bold">Education</h2>
          </div>
          <div className="grid gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <CardTitle>{edu.degree} in {edu.field}</CardTitle>
                        <CardDescription className="text-lg font-semibold text-foreground mt-1">
                          {edu.institution}
                        </CardDescription>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {edu.duration}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{edu.description}</p>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {edu.location}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Overview */}
        <section className="space-y-6">
          <div className="flex items-center space-x-2">
            <Code className="h-6 w-6" />
            <h2 className="text-3xl font-bold">Key Skills</h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {topSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Badge variant="secondary" className="text-sm py-1.5 px-3">
                  {skill.name}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button variant="outline" asChild>
              <Link href="/skills">View All Skills</Link>
            </Button>
          </motion.div>
        </section>
        </div>
      </div>
    </PageTransition>
  )
}

