"use client"

export const dynamic = 'force-dynamic'

import * as React from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Briefcase } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { experiences } from "@/data/experience"
import { PageTransition } from "@/components/page-transition"

export default function ExperiencePage() {
  return (
    <PageTransition>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 glitter-bg opacity-30"></div>
        <div className="container px-4 py-12 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Briefcase className="h-8 w-8" />
            <h1 className="text-4xl md:text-5xl font-bold">Experience</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            My professional journey and the roles I&apos;ve held throughout my career.
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl">{experience.role}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-foreground">
                        {experience.company}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {experience.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {experience.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{experience.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Key Achievements:</h4>
                    <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                      {experience.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {experience.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </PageTransition>
  )
}

