1. Architectural Design (1) - Data Flow
<ul>
<li>https://drive.google.com/file/d/1pF5bQJr8Cq5PpaRkj6bCUF70Jc17xokA/view?usp=sharing</li>
<li>
Tech Stack applied:
<ul>
<li>React</li>
<li>React Context</li>
<li>Material-UI</li>
<li>Redux</li>
<li>Node.js</li>
<li>Express</li>
<li>Typescript</li>
<li>Javascript</li>
<li>MongoDB</li>
</ul>
</li>
</ul>

2. Architectural Design (2) - UX Flow
<ul>
<li>https://drive.google.com/file/d/1tMoNpsdBnR4G7YZSZIN6wBMwSQZwkBYQ/view?usp=sharing</li>
</ul>

3. Running Steps
<ul>
<li>
React/my-app
<ul>
<li>yarn install</li>
<li>yarn start</li>
</ul>
</li>
<li>
Server
<ul>
<li>yarn install</li>
<li>yarn ts-node main.ts</li>
</ul>
</li>
</ul>

4. Jest Steps
<ul>
<li>cd server</li>
<li>yarn jest</li>
<li>Reference: analytics.test.ts</li>
</ul>

5. Game Configuration Options for Players
<ul>
<li>Round Number</li>
<li>Betting Options (e.g. Big, Small)</li>
</ul>

6. Winning Rules
<ul>
<li>
Round Number Dependent.
<ul>
<li>Round Num < 500: Player needs to get at least three wins.</li>
<li>Round Num >= 500: Player needs to get at least twenty-five wins.</li>
</ul>
</li>
</ul>

7. Hints For Players (Also Refer to 1. & 2.)
<ul>
<li>
Game Results
<ul>
<li>Player can study the immediate results of their single bet.</li>
</ul>
</li>
<li>
Game Analytics
<ul>
<li>Player can study over 10, 000 gaming data accumulated through many game rounds stored in mongoDB.</li>
</ul>
</li>
</ul>

