"use client"

export const dynamic = 'force-dynamic'

import * as React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import * as z from "zod"
import { Mail, Linkedin, Github, Send, Phone, Instagram, MessageCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { personalInfo } from "@/data/personal"
import { PageTransition } from "@/components/page-transition"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { executeRecaptcha } = useGoogleReCaptcha()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormValues) => {
    if (!executeRecaptcha) {
      toast({
        title: "Error",
        description: "reCAPTCHA not loaded. Please refresh the page.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha("contact_form")

      // Send to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message")
      }

      toast({
        title: "Message sent!",
        description: result.message || "Thank you for reaching out. I'll get back to you soon.",
      })

      reset()
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again later."

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Your name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="What's this about?"
          {...register("subject")}
        />
        {errors.subject && (
          <p className="text-sm text-destructive">{errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Your message..."
          rows={6}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          "Sending..."
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}

export default function ContactPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            I&apos;d love to hear from you. Send me a message and I&apos;ll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Reach out through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                {personalInfo.phone && (
                  <div className="flex items-center space-x-4">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a
                        href={`tel:${personalInfo.phone}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-4">
                  <Linkedin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Connect with me
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Github className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">GitHub</p>
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      View my work
                    </a>
                  </div>
                </div>
                {personalInfo.instagram && (
                  <div className="flex items-center space-x-4">
                    <Instagram className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Instagram</p>
                      <a
                        href={personalInfo.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Follow me
                      </a>
                    </div>
                  </div>
                )}
                {personalInfo.whatsapp && (
                  <div className="flex items-center space-x-4">
                    <MessageCircle className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <a
                        href={`https://wa.me/${personalInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {personalInfo.whatsapp}
                      </a>
                    </div>
                  </div>
                )}
                {personalInfo.telegram && (
                  <div className="flex items-center space-x-4">
                    <MessageCircle className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Telegram</p>
                      <a
                        href={`https://t.me/${personalInfo.telegram.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {personalInfo.telegram}
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Fill out the form below to send me a message</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </motion.div>
        </div>
        </div>
      </div>
    </PageTransition>
  )
}
