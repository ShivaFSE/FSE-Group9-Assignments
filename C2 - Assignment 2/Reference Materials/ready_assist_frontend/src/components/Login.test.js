import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { Route, BrowserRouter } from "react-router-dom";
import Login from './Login.js';


test('if an email and pwd is entered login becomes enabled', async () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    expect(await screen.findByRole('button', { name: /login/i })).toBeDisabled();

    //userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
    //userEvent.type(screen.getByPlaceholderText(/add a note/i), "dinner");

    //expect(await screen.findByRole('button', { name: /pay/i })).toBeEnabled();
});