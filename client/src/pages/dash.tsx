import Navigation from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, User, BookOpen, Calendar, DollarSign } from "lucide-react";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import Clock from "@/components/ui/clock";
import { motion } from "framer-motion";
import React, { useEffect } from 'react';

export default function DashPage() {
  useEffect(() => {
    // Redirect to dashboard.html
    window.location.href = '/dashboard.html';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecionando para o dashboard...</p>
      </div>
    </div>
  );
}