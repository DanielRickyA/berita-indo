"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Input } from "./ui/input";

interface UploadImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading?: boolean;
  articleId: string;
  onUploadImage: (file: File, articleId: string) => Promise<void>;
}

function UploadImageDialog({
  open,
  onOpenChange,
  isLoading = false,
  articleId,
  onUploadImage,
}: UploadImageDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  }, [open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      await onUploadImage(selectedFile, articleId);
      setSelectedFile(null);
      setPreviewUrl(null);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 my-4">
          {previewUrl ? (
            <div className="relative w-full max-w-[250px] aspect-video rounded-lg border overflow-hidden">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-full max-w-[250px] aspect-video border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
              No Image Selected
            </div>
          )}

          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isLoading || !articleId}
          >
            {isLoading && <Loader2 className="animate-spin mr-2" />} Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadImageDialog;
