"use client"

export const dynamic = 'force-dynamic'

import * as React from "react"
import { motion } from "framer-motion"
import { Code2, Database, Wrench, Layers } from "lucide-react"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { skills } from "@/data/skills"
import { getSkillImage, hasSkillImage } from "@/lib/skill-images"
import { PageTransition } from "@/components/page-transition"

const categoryIcons = {
  language: Code2,
  framework: Layers,
  tool: Wrench,
  database: Database,
}

const categoryLabels = {
  language: "Languages",
  framework: "Frameworks & Libraries",
  tool: "Tools & Technologies",
  database: "Databases",
}

export default function SkillsPage() {
  const categorizedSkills = {
    language: skills.filter((s) => s.category === "language"),
    framework: skills.filter((s) => s.category === "framework"),
    tool: skills.filter((s) => s.category === "tool"),
    database: skills.filter((s) => s.category === "database"),
  }

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Skills</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            My technical expertise across various technologies and tools.
          </p>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(categorizedSkills).map(([category, categorySkills], categoryIndex) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons]
            return (
              <motion.section
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Icon className="h-6 w-6" />
                      <CardTitle className="text-2xl">
                        {categoryLabels[category as keyof typeof categoryLabels]}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {categorySkills.map((skill, index) => {
                        const imagePath = getSkillImage(skill.name)
                        const hasImage = hasSkillImage(skill.name)
                        
                        return (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="space-y-2"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                {hasImage && imagePath ? (
                                  <div className="relative w-8 h-8 shrink-0">
                                    <Image
                                      src={imagePath}
                                      alt={skill.name}
                                      fill
                                      className="object-contain"
                                      sizes="32px"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-8 h-8 shrink-0 flex items-center justify-center text-xs text-muted-foreground border rounded">
                                    ?
                                  </div>
                                )}
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="font-medium truncate">{skill.name}</span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{skill.level}% proficiency</p>
                                      {!hasImage && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                          Icon not available in brands folder
                                        </p>
                                      )}
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              <Badge variant="outline" className="shrink-0">{skill.level}%</Badge>
                            </div>
                            <Progress value={skill.level} className="h-2" />
                          </motion.div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
            )
          })}
        </div>
        </div>
      </div>
    </PageTransition>
  )
}

