"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight } from "lucide-react"


type TrackOption = 'faang' | 'startup' | 'both';
type SkillLevelOption = 'beginner' | 'intermediate' | 'advanced';
type DsaInvolvementOption = 'none' | 'basic' | 'intermediate' | 'advanced';
type ExperienceOption = 'none' | 'internship' | '1-2' | '3+';
type TimeCommitmentOption = '5-10' | '10-20' | '20-30' | '30+';
type TimelineOption = '1month' | '3months' | '6months' | '1year' | 'flexible';

type FormData = {
  track?: TrackOption;
  skillLevel?: SkillLevelOption;
  technologies?: string[];
  dsaInvolvement?: DsaInvolvementOption;
  currentProjects?: string;
  experience?: ExperienceOption;
  timeCommitment?: TimeCommitmentOption;
  timeline?: TimelineOption;
  targetCompanies?: string[];
  integrations?: string[];
};

interface AssessmentFormProps {
  step: number;
  onNext: (data: FormData) => void;
  onPrevious: () => void;
  canGoBack: boolean;
}

const questions = [
  {
    id: "track",
    title: "What's your primary focus?",
    type: "radio",
    options: [
      { value: "faang", label: "DSA/FAANG Track - Algorithm-focused preparation" },
      { value: "startup", label: "Startup/Project Track - Building real-world applications" },
      { value: "both", label: "Both - Balanced approach" },
    ],
  },
  {
    id: "skillLevel",
    title: "What's your current skill level?",
    type: "radio",
    options: [
      { value: "beginner", label: "Beginner - Just starting out" },
      { value: "intermediate", label: "Intermediate - Some experience" },
      { value: "advanced", label: "Advanced - Experienced developer" },
    ],
  },
  {
    id: "technologies",
    title: "What technologies do you already know?",
    type: "checkbox",
    options: [
      "JavaScript",
      "Python",
      "Java",
      "C++",
      "React",
      "Node.js",
      "TypeScript",
      "Go",
      "Rust",
      "Swift",
      "Kotlin",
      "PHP",
    ],
  },
  {
    id: "dsaInvolvement",
    title: "What's your current involvement in DSA?",
    type: "radio",
    options: [
      { value: "none", label: "No experience with DSA" },
      { value: "basic", label: "Basic understanding of arrays and loops" },
      { value: "intermediate", label: "Comfortable with common patterns" },
      { value: "advanced", label: "Solving medium/hard problems regularly" },
    ],
  },
  {
    id: "currentProjects",
    title: "Tell us about your current projects",
    type: "textarea",
    placeholder: "Describe any projects you're working on or have completed...",
  },
  {
    id: "experience",
    title: "Do you have professional experience?",
    type: "radio",
    options: [
      { value: "none", label: "No professional experience" },
      { value: "internship", label: "Internship experience" },
      { value: "1-2", label: "1-2 years experience" },
      { value: "3+", label: "3+ years experience" },
    ],
  },
  {
    id: "timeCommitment",
    title: "How much time can you dedicate weekly?",
    type: "radio",
    options: [
      { value: "5-10", label: "5-10 hours per week" },
      { value: "10-20", label: "10-20 hours per week" },
      { value: "20-30", label: "20-30 hours per week" },
      { value: "30+", label: "30+ hours per week" },
    ],
  },
  {
    id: "timeline",
    title: "When do you want to complete your preparation?",
    type: "select",
    options: [
      { value: "1month", label: "1 month" },
      { value: "3months", label: "3 months" },
      { value: "6months", label: "6 months" },
      { value: "1year", label: "1 year" },
      { value: "flexible", label: "Flexible timeline" },
    ],
  },
  {
    id: "targetCompanies",
    title: "Which companies are you targeting?",
    type: "checkbox",
    options: [
      "FAANG (Meta, Apple, Amazon, Netflix, Google)",
      "Product-based companies",
      "Startups",
      "Open-source contribution",
      "Freelancing",
      "Remote companies",
    ],
  },
  {
    id: "integrations",
    title: "Would you like to integrate your profiles?",
    type: "checkbox",
    options: [
      "GitHub - For code analysis and contribution tracking",
      "LinkedIn - For job opportunities and networking",
      "YouTube - For personalized learning content",
    ],
  },
]

export function AssessmentForm({ step, onNext, onPrevious, canGoBack }: AssessmentFormProps) {
  const [formData, setFormData] = useState<FormData>({});
  const currentQuestion = questions[step];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === questions.length - 1) {
      // For now, just render the dashboard (simulate assessment complete)
      localStorage.setItem("assessmentData", JSON.stringify(formData));
      window.location.href = "/dashboard";

      // Uncomment below to send to backend:
      // try {
      //   const response = await fetch("http://localhost:3001/api/roadmap", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(formData),
      //   });
      //   const data = await response.json();
      //   // For now, just log what was sent and what was received
      //   console.log("Sent to server:", formData);
      //   console.log("Received from server:", data);
      // } catch (error) {
      //   console.error("Error sending data to server:", error);
      // }
    } else {
      onNext(formData);
    }
  };

  const handleInputChange = (value: unknown) => {
    setFormData((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "radio": {
        const options = currentQuestion.options as { value: string; label: string }[];
        const value = typeof formData[currentQuestion.id as keyof FormData] === 'string'
          ? (formData[currentQuestion.id as keyof FormData] as string)
          : "";
        return (
          <RadioGroup
            value={value}
            onValueChange={handleInputChange as (value: string) => void}
            className="space-y-3"
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      }
      case "checkbox": {
        const options = currentQuestion.options as string[];
        const checkedValues = (formData[currentQuestion.id as keyof FormData] as string[] | undefined) || [];
        return (
          <div className="space-y-3">
            {options.map((option) => {
              const checked = checkedValues.includes(option);
              return (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={checked}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleInputChange([...checkedValues, option]);
                      } else {
                        handleInputChange(checkedValues.filter((item) => item !== option));
                      }
                    }}
                  />
                  <Label htmlFor={option} className="cursor-pointer">
                    {option}
                  </Label>
                </div>
              );
            })}
          </div>
        );
      }
      case "textarea": {
        const value = typeof formData[currentQuestion.id as keyof FormData] === 'string'
          ? (formData[currentQuestion.id as keyof FormData] as string)
          : "";
        return (
          <Textarea
            placeholder={currentQuestion.placeholder}
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            className="min-h-[120px]"
          />
        );
      }
      case "select": {
        const options = currentQuestion.options as { value: string; label: string }[];
        const value = typeof formData[currentQuestion.id as keyof FormData] === 'string'
          ? (formData[currentQuestion.id as keyof FormData] as string)
          : "";
        return (
          <Select
            value={value}
            onValueChange={handleInputChange as (value: string) => void}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }
      default:
        return null;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{currentQuestion.title}</h2>
        {renderQuestion()}
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onPrevious} disabled={!canGoBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <Button type="submit">
          {step === questions.length - 1 ? "Complete Assessment" : "Next"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
