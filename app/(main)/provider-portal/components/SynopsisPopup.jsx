"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"



const synopses= {
  "John Smith": `
    <h3>Patient Synopsis:</h3>
    <p>John Smith is a 42-year-old patient returning for his routine cleaning. A long-time patient, John previously reported gum sensitivity but noted some improvement at his last visit. He has a history of diabetes and is currently taking Lisinopril for blood pressure management. Outside of his dental health, John has mentioned struggling with poor sleep and frequent snoring, which may indicate an underlying airway concern. On a personal note, during his last visit, he shared that his cat, Jerry, had escaped, causing him a lot of stress—checking in on Jerry could be a great way to start the appointment on a positive note.</p>

    <p>Today, John is here for a routine cleaning. His last X-rays were taken two years ago, and he has existing fillings on teeth 19, 30, and 14. While he reported some improvement in gum sensitivity, his inconsistent flossing habits may still be contributing to inflammation. Given his history of diabetes, ensuring stable gum health is important, as systemic conditions like diabetes can impact periodontal health. Additionally, his reports of snoring and poor sleep may warrant further screening for potential sleep apnea or airway issues.</p>

    <h4>Moving forward, today's visit should include:</h4>
    <ul>
      <li>A thorough periodontal assessment to evaluate any lingering gum sensitivity or inflammation.</li>
      <li>An updated set of X-rays to assess any new concerns, as his last set was taken two years ago.</li>
      <li>A discussion on oral hygiene habits, particularly reinforcing the importance of daily flossing.</li>
      <li>A brief conversation about his sleep patterns, with a potential referral if sleep apnea is suspected.</li>
      <li>Routine cleaning and examination, ensuring no new cavities or dental concerns.</li>
    </ul>

    <h4>Recommendations:</h4>
    <p>Encourage John to maintain regular flossing habits and monitor any worsening gum sensitivity. If sleep issues persist, consider a referral for further evaluation.</p>
  `,
  "Emily Johnson": `
    <h3>Patient Synopsis:</h3>
    <p>Emily Johnson is a 35-year-old patient returning for a follow-up appointment. She recently had a cavity filled on her lower right molar. Emily has a history of dental anxiety, which has improved with our patient-centered approach. She is currently pregnant (second trimester) and has reported increased gum sensitivity.</p>

    <p>Today's follow-up is to check on the recent filling and address her concerns about gum sensitivity during pregnancy. Emily's last full set of X-rays was taken 18 months ago, before her pregnancy. She has been diligent with her oral hygiene routine but has mentioned difficulty flossing due to her gum sensitivity.</p>

    <h4>Today's visit should focus on:</h4>
    <ul>
      <li>Evaluating the recent filling and ensuring proper healing.</li>
      <li>Assessing gum health and providing guidance on managing pregnancy-related gum sensitivity.</li>
      <li>Discussing safe dental practices during pregnancy, including the importance of maintaining good oral health.</li>
      <li>Demonstrating gentle flossing techniques to help with her current sensitivity.</li>
      <li>Scheduling her next routine cleaning, taking into account her due date.</li>
    </ul>

    <h4>Recommendations:</h4>
    <p>Provide Emily with pregnancy-safe oral care products and consider recommending a prenatal dental health plan. Reassure her about the safety of necessary dental procedures during pregnancy and emphasize the importance of maintaining good oral health for both her and her baby's well-being.</p>
  `,
  "Michael Brown": `
    <h3>Patient Synopsis:</h3>
    <p>Michael Brown is a 28-year-old new patient coming in for his first comprehensive exam. He recently moved to the area and has not had a dental check-up in over two years due to lack of insurance. Michael reports no current pain or discomfort but mentions a history of grinding his teeth at night. He uses an albuterol inhaler for mild asthma.</p>

    <p>As a new patient, today's visit will involve a thorough examination and establishment of a baseline for Michael's oral health. Given his history of teeth grinding and lack of recent dental care, special attention should be paid to signs of wear or decay.</p>

    <h4>Today's visit should include:</h4>
    <ul>
      <li>A comprehensive oral examination, including a full set of X-rays.</li>
      <li>Evaluation of signs of bruxism (teeth grinding) and discussion of potential night guard options.</li>
      <li>Assessment of overall oral hygiene and provision of personalized care instructions.</li>
      <li>Discussion about the potential oral health impacts of his asthma medication (dry mouth).</li>
      <li>Creation of a tailored treatment plan based on the exam findings.</li>
    </ul>

    <h4>Recommendations:</h4>
    <p>Educate Michael on the importance of regular dental check-ups and the potential long-term effects of teeth grinding. Consider recommending a custom night guard if signs of significant wear are present. Advise on strategies to combat potential dry mouth from his asthma medication.</p>
  `,
}

export default function SynopsisPopup({ appointment }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">See Synopsis</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{appointment.patientName} - Patient Synopsis</DialogTitle>
          <DialogDescription>AI-generated summary and recommendations for today's appointment</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] overflow-auto mt-4">
          <div
            className="prose prose-slate max-w-none prose-headings:mb-2 prose-h3:text-lg prose-h4:text-base prose-p:mb-3 prose-ul:mt-2 prose-li:my-0 prose-li:marker:text-slate-500"
            dangerouslySetInnerHTML={{ __html: synopses[appointment.patientName] || "Synopsis not available." }}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

