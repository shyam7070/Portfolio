"use client"

export const dynamic = 'force-dynamic'

import * as React from "react"
import { motion } from "framer-motion"
import { Award, ExternalLink, Calendar, Eye } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { certifications } from "@/data/certifications"
import { PageTransition } from "@/components/page-transition"

export default function CertificationsPage() {
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
            <Award className="h-8 w-8" />
            <h1 className="text-4xl md:text-5xl font-bold">Certifications & Achievements</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Professional certifications and achievements that validate my expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-xl">{cert.title}</CardTitle>
                    <Award className="h-5 w-5 text-primary shrink-0 mt-1" />
                  </div>
                  <CardDescription className="text-base font-semibold text-foreground">
                    {cert.issuer}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2 items-center">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {format(new Date(cert.issueDate), "MMM yyyy")}
                      </span>
                    </div>
                    {cert.category && (
                      <Badge variant="secondary">{cert.category}</Badge>
                    )}
                    {cert.expiryDate && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Expires: {format(new Date(cert.expiryDate), "MMM yyyy")}
                        </span>
                      </div>
                    )}
                  </div>
                  {cert.credentialId && (
                    <div>
                      <Badge variant="outline">ID: {cert.credentialId}</Badge>
                    </div>
                  )}
                  <p className="text-muted-foreground">{cert.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.imageUrl && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="default" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Certificate
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[85vh] overflow-auto p-6">
                          <DialogHeader>
                            <DialogTitle>{cert.title}</DialogTitle>
                            <DialogDescription>
                              Issued by {cert.issuer} on {format(new Date(cert.issueDate), "MMMM dd, yyyy")}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="relative w-full h-auto mt-4 flex justify-center">
                            <div className="relative w-full max-w-4xl">
                              <Image
                                src={cert.imageUrl}
                                alt={cert.title}
                                width={1200}
                                height={800}
                                className="w-full h-auto rounded-lg shadow-lg"
                                priority
                              />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                    {cert.credentialUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Verify Credential
                        </a>
                      </Button>
                    )}
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

