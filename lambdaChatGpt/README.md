# Chat GPT lambda
Serverless function

### Stack and CI/CD
The functionality is handled by a serverless function.
Its stack is made up of:
- API Gateway
- IAM Role
- Lambda function
- Log group
- S3 bucket

### CloudWatch log query
```
fields @timestamp, @message
| filter level in ["info","error"]
| sort @timestamp desc
| limit 5
```

### Local usage
###### Install dependencies
```
yarn
```
###### Run tests with coverage report
```
yarn test --coverage
```
###### Run linter
```
yarn lint
```

###### Execute local lambda service
```
yarn run offline
```

### API usage

cURL Request
```
curl --location 'http://localhost:3000/openai/chatgpt' \
--header 'model: gpt-3.5-turbo' \
--header 'Content-Type: text/plain' \
--data 'cuantos carbos hay en 3 bananas y un pote de helado de dulce de leche?'
```

Available models
- text-davinci-003
- gpt-3.5-turbo
- code-davinci-002

Path
```
POST /openai/chatgpt
```
Host
* Local
http://localhost:3000
* Develop
https://3mwa4xvyi2.execute-api.us-east-1.amazonaws.com

Success response - status 200
```
En 3 bananas y un pote de helado de dulce de leche hay aproximadamente 100 gramos de carbohidratos.
```

### Deployment
Run `yarn deploy:{environment}` to create/update the infrastructure and deploy the lambda code

### Resources
* [Open AI API reference](https://platform.openai.com/docs/api-reference)
