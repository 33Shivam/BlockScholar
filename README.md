# Project Block Scholar

### Inspiration
The early inspiration of the project is from the recent Russia Ukraine War. During the war the economy of the country crashes. The indian students who were studying in the country were made to return back to India
with no support for their countinued education back home. This combined with non-trasparency in current scholarship distribution process made us to believe that a decentralized solution was needed in this sector.

### What is this project 
BlockScholar is a project made for a trasparent automatic distribution web application.

## Prerequisites

1. Gancahe Blockchain:- https://trufflesuite.com/ganache/ 
2. Git Bash
3. Node :- v18.17.0
4. Moralis API key
5. MongoDB URI
6. Alcamey Account

## Installation

### Cloning the repo 
```bash
git clone https://github.com/33Shivam/BlockScholar.git
```
### Installing Hardhat Dependencies 
```bash
cd BlockScholar
```
```bash
npm install
```
### Installing Frontend Dependencies 
```bash
cd client
```
```bash
npm install
```

### Setting Up .env for local deployment
The project has two .env files that needed to be set up. <br>
1. The local blockchain envirnoment variable
2. Local Variables FrontEnd and Backend

#### Setting up Blockchain .env
Navigate to root of the project <br>
```bash
cd BlockScholar
```
Create an .env file with the following variables:-
1. GOERLI_URL :- Get it from Alcamey  
2. PRIVATE_KEY :- Get it from Alcamey
3. GOERLI_API_KEY :- Get it from Alcamey
4. PRIVATE_KEY_GANACHE :- Get it by importing a sample account from Ganche and exporting the private key

#### Setting up Blockchain .env
Navigate to client folder of the project <br>
```bash
cd client
```
Create an .env.local file with the following variables:-
1. MORALIS_API_KEY :- Get it from Alcamey  
2. APP_DOMAIN :- Get it from Alcamey
3. NEXTAUTH_URL :- Get it from Alcamey
4. NEXTAUTH_SECRET :- Get it by importing a sample account from Ganche and exporting the private key
5. MONGO_DB_URI




## Usage

Explain how to run the code. Include any command-line arguments or configurations that need to be set.

Example:

```bash
python main.py --input data/input.txt --output results/output.txt
