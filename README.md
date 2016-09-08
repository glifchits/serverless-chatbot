# serverless-chatbot

###Installation

1) Clone this repo
```
cd ~
git clone git@github.com:Saasli/saasli-backend.git
```

2) Get yourself the latest serverless from npm

```
npm install -g https://github.com/serverless/serverless
```

3) Set your AWS credentials

```
vim ~/.bashrc
```
add
```
# AWS Credentials
export AWS_ACCESS_KEY_ID=<KEY_ID>
export AWS_SECRET_ACCESS_KEY=<ACCESS_KEY>
```
run
```
source ~/.bashrc
```

4) `cd` into any service and run
```
sls deploy
```

###Nomenclature 

- *service* : Each of the sub directories beneath `/serverless-chatbot` are separate serverless services. 
- *function* : Within each service are functions. The `serverless.yml` will define the `.js` file that handles them. eg.

```
functions:
  functionA:
    handler: handlerA.function
    events:
      - http:
          path: a
          method: get
  functionB:
    handler: handlerB.function
    events:
      - http:
          path: b
          method: get
```
