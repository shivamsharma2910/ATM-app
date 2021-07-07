## Assumptions while making this app:-
1. Denomination are kept as 1000, 500, 200, 100, 50, 20, 10 for now.
2. Amount to be deducted from ATM has to be a multiple of 10, otherwise ATM can never disburse. Step value for input field is also kept as 10.
3. If no preference for denominations then ATM will try to disburse total amount with minimum number of notes.
4. If there is a preference for denominations then ATM will first try to disburse only with those denominations. If it is not possible then other denomination notes will be disbursed.


*I am from an angular background so the react part might not be optimal, but it does the job :-)*