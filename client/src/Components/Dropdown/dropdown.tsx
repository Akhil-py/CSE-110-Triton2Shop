import React, { useState, useRef, useEffect } from 'react';
import './dropdown.css';

type DropdownProps<T> = {
    label: string;
    items: T[];
    selectedItem: T | null;
    onSelect: (item: T) => void;
};

export const Dropdown = <T extends string | number>({
    label,
    items,
    selectedItem,
    onSelect,
}: DropdownProps<T>): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="dropdown-toggle">
                {selectedItem || label}
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                onSelect(item);
                                setIsOpen(false); // Close dropdown after selection
                            }}
                            className="dropdown-item"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
