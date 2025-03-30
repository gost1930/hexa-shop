import { useState } from 'react'
const useDisCloser = () => {
    const [isOpen, setIsOpen] = useState(false);
    const open = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    return {
        isOpen,
        setIsOpen,
        open,
        onClose
    }
}

export default useDisCloser;
