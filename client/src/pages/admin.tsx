
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, Image as ImageIcon, Trash2, Eye } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
interface InstagramPost {
  id: string;
  imageUrl: string;
  uploadedAt: Date;
}
