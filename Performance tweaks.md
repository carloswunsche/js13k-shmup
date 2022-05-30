# Short-circuits conditionals

# Prioritize access to local variables
JavaScript first searches to see if a variable exists locally, then searches progressively in higher levels of scope until global variables. Saving variables in a local scope allows JavaScript to access them much faster.

# Don't use parseInt to remove decimals from a number, use Math.floor (much faster and accurate, since parseInt expects a string!)

# Object pools
Instead of creating and destroying many objects, create a pool of them to re-use the same instances. With a pool, you can pre-allocate objects into the pool to be used on-demand. Objects should be returned to the pool when they are "destroyed". You only need to create new objects if you run out of free objects in your pool.
https://www.html5rocks.com/en/tutorials/speed/static-mem-pools/

# Use classes instead of regular constructor functions

# Re-use arrays and objects
It's easy to accidentally create many new objects and arrays in your game loop. Try to re-use the same object by or array by clearing it first, instead of creating a new one each time.
An object can be cleared by deleting all keys.
An array can be cleared by setting it's length to 0.

# Avoid using global variables
Because the scripting engine needs to look through the scope when referencing global variables from within function or another scope, the variable will be destroyed when the local scope is lost.

# While loop is faster than a for loop

# For vs For of vs array methods
https://leanylabs.com/blog/js-forEach-map-reduce-vs-for-for_of/

# === is faster than ==

# Don't make calculations inside the for loop condition part

# Duplicating an Array

While this sounds like a less interesting scenario, this is the pillar of immutable functions, which doesn’t modify the input when generating an output.

Performance testing findings here again show the same interesting trend — when duplicating 10k arrays of 10k random items, it is faster to use the old school solutions. Again the trendiest ES6 spread operation `[…arr]` and Array from `Array.from(arr)` plus the ES5 map `arr.map(x => x)` are inferior to the veteran slice `arr.slice()` and concatenate `[].concat(arr)`.

# Iterating Objects

Another frequent scenario is iterating over objects, this is mainly necessary when we try to traverse JSON’s and objects, and while not looking for a specific key value. Again there are the veteran solutions like the for-in `for(let key in obj)`, and not the later `Object.keys(obj)` (presented in es6) and `Object.entries(obj)` (from ES8) which returns both key and value.

# Implement the optimizations that you would apply in any other programming language
Always use the algorithms with the least computational complexity to solve the task with the optimal data structures
Rewrite the algorithm to get the same result with fewer calculations
Avoid recursive calls
Put in variables, the calculations and calls to functions that are repeated
Factor and simplify mathematical formulas
Use search arrays: they are used to obtain a value based on another instead of using a switch/case statement
Make conditions always more likely to be true to take better advantage of the speculative execution of the processor
Use bit-level operators when you can to replace certain operations, because these operators use fewer processor cycles
