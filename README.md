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

3. Screen Snapshots
<ul>
<li>Landing Page:<br>https://drive.google.com/file/d/1-zvKv5BP7XasBejvp8_92Z9NyvaUCc9T/view?usp=sharing</li>
<li>Screen One - Getting Started:<br>https://drive.google.com/file/d/1yFY1RaCYRiLQMVlP1nOUU5JZ6aP3XaKi/view?usp=sharing<br>
https://drive.google.com/file/d/1Qgsjn7ESR4FgfUBVb8TFGzJvhjr960JH/view?usp=sharing</li>
<li>Screen Two - Getting Results:<br>https://drive.google.com/file/d/1uTs0GzzJ7LBLPXn5Gd_dckSWKjqtMTd2/view?usp=sharing</li>
<li>Screen Three - Getting Analytics:<br>https://drive.google.com/file/d/1t-RAGrrzPV2X2DySaHuC8hmUvtHEttXf/view?usp=sharing</li>
</ul>

4. Running Steps
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

5. Jest Steps
<ul>
<li>cd server</li>
<li>yarn jest</li>
<li>Reference: analytics.test.ts</li>
</ul>

6. Game Configuration Options for Players
<ul>
<li>Round Number</li>
<li>Betting Options (e.g. Big, Small)</li>
</ul>

7. Winning Rules
<ul>
<li>
Round Number Dependent.
<ul>
<li>Round Num < 500: Player needs to get at least three wins.</li>
<li>Round Num >= 500: Player needs to get at least twenty-five wins.</li>
</ul>
</li>
</ul>

8. Hints For Players (Also Refer to 1. & 2.)
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

