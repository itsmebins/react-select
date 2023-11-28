import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomSelect from '../../components/CustomSelect'


describe('CustomSelect Component', () => {
    const options: string[] = ['Option 1', 'Employee', 'Businessman'];

    test('renders with provided options', () => {
        render(<CustomSelect options={options} onSelect={() => {}} />);
        options.forEach(option => {
            expect(screen.getByText(option)).toBeInTheDocument();
        });
    });

    test('opens dropdown when clicked', () => {
        render(<CustomSelect options={options} onSelect={() => {}} />);
        fireEvent.click(screen.getByText(options[0]));
        expect(screen.getByRole('listbox')).toBeVisible();
    });

    test('closes dropdown when an option is selected', () => {
        render(<CustomSelect options={options} onSelect={() => {}} />);
        fireEvent.click(screen.getByText(options[0]));
        fireEvent.click(screen.getByText(options[1]));
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    test('calls onSelect with correct value when an option is selected', () => {
        const onSelectMock = jest.fn();
        render(<CustomSelect options={options} onSelect={onSelectMock} />);
        fireEvent.click(screen.getByText(options[0]));
        fireEvent.click(screen.getByText(options[1]));
        expect(onSelectMock).toHaveBeenCalledWith('Employee');
    });
});
