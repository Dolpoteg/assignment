How long did you spend on the coding test?
    Not 2 hours :) I lost track of time but it was spread across a couple of evenings.  

What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

    I would add mutation teststing. This is one topic that I'm trying to find an exuse to dig into deeper.
    In general I would have wanted to add more robust testing like making the existing test cases more thourough and adding end to end tests.

Describe your solution in plain english. Point out your design decisions and the reasoning behind them.

    I tried to create a proof of concept of a monorepo hexagonal javascript project. The main goal was creating a core package that contains business logic and is independent of the persistance and presentation layer. This setup allows us to run tests against our core logic without depending on the database.

Have you learned something new doing this test? If yes, describe it here.
    I haven't attempted implementing a hexagonal arhitecture approach in javascript before so this was definately a first for me.

Describe yourself using JSON.

{
    "name": "Ben",
    "age": 34,
    "height": 185,
    "languages": ['en', 'nl', 'si'],
    "favourites": {
        "movie": "Eternal Sunshine of the Spotless Mind"
        "series": "The Office",
        "book": "East of Eden",
        "sport": "cycling",
        "food": "chicken korma"
    }
}