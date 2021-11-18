import { useEffect, useState } from 'react';

interface useReadFileURLProps {
  file: File | null;
}

const useReadFileURL = ({ file }: useReadFileURLProps) => {
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setImageURL(e.target?.result as string);
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  return imageURL;
};

export default useReadFileURL;
