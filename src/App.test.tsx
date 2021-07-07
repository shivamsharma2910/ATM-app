import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';
import UserEvent from '@testing-library/user-event';

describe('ATM app', () => {
  let checkboxes: Array<HTMLInputElement>;
  let crunchButton: HTMLButtonElement;
  let amountField: HTMLAllCollection;
  let table: HTMLTableElement;

  beforeEach(() => {
    render(<App />);
    checkboxes = screen.getAllByRole('checkbox');
    crunchButton = screen.getByRole('button');
    amountField = screen.queryByPlaceholderText('Amount in multiples of 10');
    table = screen.getByRole("table");
  });

  test('verify that app is rendering correctly', () => {
    expect(checkboxes.length).toBeGreaterThan(0);
    expect(crunchButton).toBeInTheDocument();
    expect(amountField).toBeInTheDocument();
  });

  test('validation is working for amount', () => {
    UserEvent.type(amountField, '15');
    const errorMessage = screen.getByText('Kindly enter positive amount in multiples of 10.');
    expect(crunchButton).toBeDisabled();
    expect(errorMessage).toBeInTheDocument();

    UserEvent.type(amountField, '150');
    expect(crunchButton).not.toBeDisabled();
    expect(errorMessage).not.toBeInTheDocument();
  });

  test('notes are dispensed correctly with no denomination selection', () => {
    UserEvent.type(amountField, '900');
    UserEvent.click(crunchButton);
    const [columnNames, ...rows] = within(table).getAllByRole("rowgroup");
    expect(within(rows[0]).getByText(500)).toBeInTheDocument();
    expect(within(rows[0]).getByText(1)).toBeInTheDocument();
    expect(within(rows[0]).getByText(200)).toBeInTheDocument();
    expect(within(rows[0]).getByText(2)).toBeInTheDocument();

  });

  test('notes are dispensed correctly with no denomination selection', () => {
    UserEvent.click(checkboxes[2]);
    UserEvent.type(amountField, '900');
    UserEvent.click(crunchButton);
    const [columnNames, ...rows] = within(table).getAllByRole("rowgroup");
    expect(within(rows[0]).getByText(200)).toBeInTheDocument();
    expect(within(rows[0]).getByText(4)).toBeInTheDocument();
    expect(within(rows[0]).getByText(100)).toBeInTheDocument();
    expect(within(rows[0]).getByText(1)).toBeInTheDocument();

  });

  test('notes are dispensed correctly with no denomination selection', () => {
    UserEvent.click(checkboxes[2]);
    UserEvent.click(checkboxes[4]);
    UserEvent.type(amountField, '900');
    UserEvent.click(crunchButton);
    const [columnNames, ...rows] = within(table).getAllByRole("rowgroup");
    expect(within(rows[0]).getByText(200)).toBeInTheDocument();
    expect(within(rows[0]).getByText(4)).toBeInTheDocument();
    expect(within(rows[0]).getByText(50)).toBeInTheDocument();
    expect(within(rows[0]).getByText(2)).toBeInTheDocument();

  });
});
