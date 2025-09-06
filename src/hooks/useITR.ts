import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/itr';

interface ITRSubmission {
  name: string;
  pan: string;
  financialYear: string;
  incomeType: "Salary" | "Business" | "Professional" | "Capital Gains" | "Other";
  grossIncome: number;
  documents?: string[];
}

export const useITR = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitITR = async (data: ITRSubmission) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API_BASE_URL}/submit`, data);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async (submissionId: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/status/${submissionId}`);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getRequirements = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/requirements`);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitITR,
    checkStatus,
    getRequirements,
    loading,
    error
  };
};