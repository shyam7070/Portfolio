export interface Certification {
  id: string
  title: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  description: string
  category?: "hackathon" | "course" | "certification" | "achievement" | "internship"
  imageUrl?: string
}

export const certifications: Certification[] = [
  {
    id: "1",
    title: "STEPCONE 2024 Web-O-Tsav Winner",
    issuer: "GMR Institute of Technology",
    issueDate: "2024-02-16",
    description: "Winner in the senior category at STEPCONE 2024 Web-O-Tsav hackathon. Demonstrated excellence in web development and problem-solving skills.",
    category: "hackathon",
    imageUrl: "/certificates/stepcone-certificate.jpeg",
  },
  {
    id: "2",
    title: "Web Hackathon Winner",
    issuer: "Dr. B. R. Ambedkar University, Srikakulam",
    issueDate: "2024-02-28",
    description: "Winner at Web hackathon organized by Dr. B. R. Ambedkar University, Srikakulam. Showcased technical expertise and innovation in web development.",
    category: "hackathon",
  },
  {
    id: "3",
    title: "Summer Internship Certificate",
    issuer: "RGUKT Srikakulam",
    issueDate: "2025-06-30",
    description: "Successfully completed summer internship at RGUKT Srikakulam. Worked on web development tasks including feature enhancements, bug fixes, and performance improvements for academic and administrative portals.",
    category: "internship",
    imageUrl: "/certificates/intern-certificate.jpeg",
  }
]
