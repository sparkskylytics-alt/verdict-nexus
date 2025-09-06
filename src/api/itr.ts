import express from 'express';
import { z } from 'zod';

const router = express.Router();

// Validation schemas
const ITRSubmissionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN format"),
  financialYear: z.string().regex(/^\d{4}-\d{2}$/, "Invalid financial year format"),
  incomeType: z.enum(["Salary", "Business", "Professional", "Capital Gains", "Other"]),
  grossIncome: z.number().min(0, "Gross income must be non-negative"),
  documents: z.array(z.string()).optional(),
});

type ITRSubmission = z.infer<typeof ITRSubmissionSchema>;

// Mock database
let submissions: ITRSubmission[] = [];

// Submit ITR application
router.post('/submit', async (req, res) => {
  try {
    const submission = ITRSubmissionSchema.parse(req.body);
    submissions.push(submission);
    
    res.status(201).json({
      message: "ITR submission received successfully",
      submissionId: submissions.length
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Get submission status
router.get('/status/:submissionId', (req, res) => {
  const submissionId = parseInt(req.params.submissionId);
  const submission = submissions[submissionId - 1];
  
  if (!submission) {
    return res.status(404).json({ error: "Submission not found" });
  }
  
  res.json({
    status: "Processing",
    submission
  });
});

// Get ITR filing requirements
router.get('/requirements', (req, res) => {
  res.json({
    documents: [
      "PAN Card",
      "Aadhaar Card",
      "Form 16 (for salaried individuals)",
      "Bank Statements",
      "Investment Proofs",
      "Rent Receipts (if applicable)"
    ],
    eligibility: {
      individual: "Any individual with taxable income",
      business: "All businesses with annual turnover above ₹1 Cr",
      professional: "Professionals with gross receipts above ₹50L"
    },
    deadlines: {
      regular: "July 31st",
      audit_cases: "October 31st"
    }
  });
});

export default router;