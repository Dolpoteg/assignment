# Lepaya Full Stack Assignment

Welcome to the fullstack assignment for engineering positions at Lepaya.

We hope you have a good time working on this assignment. We are looking forward to seeing your solution.

Feel free to ask for clarification if something is unclear.

## 1. The task

Let's imagine a scaleup in the candy-space called Chocolate Inc.

Due to providing what the people want most, quality chocolate, it has grown from a small kitchen to having offices in several locations across Europe and the UK.

Like any other thriving organization, it tries to keep its personnel happy and healthy, and away from the tasty chocolate, by providing fresh fruit in all of its offices.

Your task will be to build an application that will help the office managers at Chocolate Inc. track the fruit purchasing and consumption.

## 2. Deliverables

1. A frontend (React) application
2. An API server to support the frontend
3. Answers to some technical questions

### 2.1. The Frontend

The frontend must implement the following 2 features.

#### 2.1.1. Reporting fruit consumption statistics

> As an office manager <br>
> I want to be able to specify an office and a year <br>
> So that I can see which fruit has the most pieces eaten in that office that year

> As an office manager <br>
> I want to be able to specify an office and a year <br>
> So that I can see how much fruit was consumed per person on average in that office that year

#### 2.1.2. Update fruit stock

> As an office manager <br>
> I want to be able to specify an office and a list of fruit including quantity for each fruit <br>
> So that I can update the stock of fruit in that office in one go

> As an office manager <br>
> I want my stock update to be rejected if the total calories of all combined fruit of this update exceeds 250kcal <br>
> So that the system prevents me from buying too many high-calorie fruits

### 2.2. The API

We envision you will probably need two endpoints to satisfy the Frontend requirements ( maybe ```/purchase``` and  ```/report``` ).

Having said that, you do have the full freedom to organize how many endpoints you need and however you want to organize them, as long as the frontend requirements are satisfied.

You are free to use any out of the box server or any libraries you want; we'd suggest `express` or `koa`.

You **DO NOT** need to provide endpoints to get a list of office locations or available fruits. If you don't have the time or energy feel free to hardcode these lists, this will not be taken into consideration. The way you do hardcode them, will.

### 2.3. Automated Tests
Ensure you provide enough automated tests to cover the key functionalities.

### 2.4. The technical questions

Please answer the following questions in a markdown file called **"ANSWERS.md"**.

1. How long did you spend on the coding test?

2. What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

3. Describe your solution in plain english. Point out your design decisions and the reasoning behind them.

4. Have you learned something new doing this test? If yes, describe it here.

5. Describe yourself using JSON.

## 3. The Resources

The database that they use to keep track of fruit is provided to you as a PostgreSQL database defined in the `docker-compose.yml`

To run the database, you can use the following command:

```shell
docker-compose up -d
```

It should start on port 5432 by default, but feel free to modify the `docker-compose.yml` as it suits you.

The default connection data would be (unless otherwise specified in the `docker-compose.yml`):

```yml
POSTGRES_DB: fruity
POSTGRES_USER: candidate
POSTGRES_PASSWORD: candidate
```

It holds 3 tables

- **location** - Which holds all the locations where there are offices, along with the count of people in that office
- **fruit** - Fruits available for purchase, along with their name and caloric (kcal) value per unit.
- **ledger** - This table holds records of all the fruits that were purchased for an office or were eaten at the office.

Records with a **negative integer** in the **amount** column would represent the number of certain fruits that were eaten at an office, while the ones with the positive amounts would represent the purchase of those fruits at the office.

Example:

| fruit_id | location_id | amount| time                          |
|----------|-------------|-------|-------------------------------|
| 3        | 2           | 4     | 2018-06-09 20:00:03.629 +0200 |
| 3        | 1           |-2     | 2017-05-09 23:33:15.233 +0200 |

Where the first row represents the purchase of apples (fruit #3), at the Berlin office by purchasing 4 pieces.

And the second row would represent an eating of 2 pieces of apples at the Amsterdam office.

> ℹ️ Parts of the database records are generated randomly, don't expect consistancy if you recreate the container volumes.

## 4. Constraints

1. Build the app using **TypeScript**
2. Preferably use **React** for the frontend
3. The API should be a standalone server (not something like Next.js)
4. Feel free to use **any publicly available libraries** that you are comfortable with.
5. [OPTIONAL] Configure Docker to run the **entire project**, including both the API server and the frontend application, using a Dockerfile or docker-compose. Ensure that the setup instructions are included in the HOWTO.md file.

## 5. Delivery

When you are finished, add your project to **Github** and invite `lepaya-code-reviewer` as a **collaborator**.

> Make sure there is a consise one or two-line command to start your project. If any explanation is necessary, please create a `HOWTO.md` file and explain how to run your solution.

Email to your Lepaya HR contact informing them that you have completed your assessment.

## 6. Evaluation

We will evaluate your solution based on the following criteria.

### 3.1. Real world project

We will treat this as a real project, so we will evaluate how easy it is to maintain and scale your solution. Apply patterns where it makes sense, but be careful not to over-engineer.

### 3.2. Reflects job description

Try to create something that reflects your abilities and the job you are applying for. Consider checking the job description again.