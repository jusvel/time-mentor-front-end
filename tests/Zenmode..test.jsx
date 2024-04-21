import React from 'react';
import {it, expect, describe } from 'vitest';
import {render, screen, waitFor, fireEvent, cleanup} from '@testing-library/react';
import ZenMode from "../src/views/zen-mode/Zen-mode.jsx";


describe('ZenMode', () => {

    it('should render the component', () => {
        cleanup();
        render(<ZenMode/>);
        screen.debug();
    })

    it('should render Zen Mode configuration', () => {
        cleanup();
        render(<ZenMode />);
        const titleElements = screen.getAllByText('Zen Mode configuration');
        expect(titleElements.length).toBeGreaterThan(0, 'Expected title to be rendered');
    });

    it('should start focus mode when Start Focus button is clicked', async () => {
        cleanup();
        render(<ZenMode/>);
        const startFocusButtons = screen.getAllByText('Start Focus');
        expect(startFocusButtons.length).toBeGreaterThan(0, 'Start Focus button not found on the screen');

        // Click the first Start Focus button found
        startFocusButtons[0].click();
        await waitFor(() => screen.getByText('Focus Enabled'));

        const enabledText = screen.getByText('Focus Enabled');
        expect(enabledText).toBeDefined('Focus Enabled text not found after clicking Start Focus button');
    });

    it('should start break mode when Start Break button is clicked', async () => {
        cleanup();
        render(<ZenMode/>);
        const startBreakButtons = screen.getAllByText('Start Break');
        expect(startBreakButtons.length).toBeGreaterThan(0, 'Expected title to be rendered');

        startBreakButtons[0].click();
        await waitFor(() => screen.getByText('Break Enabled'));

        const enabledText = screen.getByText('Break Enabled');
        expect(enabledText).toBeDefined('Break Enabled text not found after clicking Start Focus button');
    });

   // it('should correctly display the focus time when provided time in hours and minutes', async () => {
        // Find input fields by their data-testid attributes
   //     const workingHoursInput = await screen.findByTestId('working-hours-input');
   //     const workingMinutesInput = await screen.findByTestId('working-minutes-input');
   //     const startFocusButton = await screen.findByText('Start Focus');

        // Change input values
   //     fireEvent.change(workingHoursInput, { target: { value: '2' } });
   //     fireEvent.change(workingMinutesInput, { target: { value: '30' } });

        // Start focus
  //      fireEvent.click(startFocusButton);

        // Wait for the focus time element to be updated
  //      await waitFor(() => {
  //          const focusTimeElement = screen.getByTestId('working-time-output');
  //          // Assert the expected focus time
  //          expect(focusTimeElement.textContent).toBe('02:29:59');
  //      });
  //  });
})