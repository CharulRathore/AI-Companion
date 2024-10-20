"use client";


interface ImageUploadProps {
    value: string;
    onChange: (src: string) => void;
    disabled?: boolean;
}

export const ImageUpload = ({
    value,
    onChange,
    disabled
}: ImageUploadProps) => {
    // Hydration Errors.
}
