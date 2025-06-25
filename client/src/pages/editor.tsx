import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { pageBuilder, EditorComponent } from "@/lib/drag-drop-editor";
import { updateSEO } from "@/lib/seo";
import EditorToolbar from "@/components/page-editor/EditorToolbar";
import DraggableComponent from "@/components/page-editor/DraggableComponent";
import PropertyPanel from "@/components/page-editor/PropertyPanel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Smartphone, Tablet, Monitor } from "lucide-react";

}
