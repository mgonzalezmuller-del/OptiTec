/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LeadSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  industry: string;
  companySize: string;
  challenge: string;
  score?: number;
  maturityLevel?: string;
  submittedAt: string;
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    score: number;
    description: string;
  }[];
}

export interface ReportItem {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  longDesc: string;
  benefits: string[];
  estimatedTime: string;
  roiContribution: string;
}

export interface ProjectMilestone {
  number: number;
  title: string;
  description: string;
  details: string[];
}
