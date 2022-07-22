import React, { useEffect, useRef, useState } from 'react';

export const useDropdown = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const onClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target as HTMLDivElement)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', (e) => onClickOutside(e), true);
    return () => {
      document.removeEventListener('click', onClickOutside, true);
    };
  }, []);

  return {
    ref,
    isDropdownOpen,
    setIsDropdownOpen,
  };
};
