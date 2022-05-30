# Prioritize access to local variables
JavaScript first searches to see if a variable exists locally, then searches progressively in higher levels of scope until global variables. Saving variables in a local scope allows JavaScript to access them much faster.

# Avoid using global variables
Because the scripting engine needs to look through the scope when referencing global variables from within function or another scope, the variable will be destroyed when the local scope is lost.

# Implement the optimizations that you would apply in any other programming language
Always use the algorithms with the least computational complexity to solve the task with the optimal data structures
Rewrite the algorithm to get the same result with fewer calculations
Avoid recursive calls
Put in variables, the calculations and calls to functions that are repeated
Factor and simplify mathematical formulas
Use search arrays: they are used to obtain a value based on another instead of using a switch/case statement
Make conditions always more likely to be true to take better advantage of the speculative execution of the processor
Use bit-level operators when you can to replace certain operations, because these operators use fewer processor cycles