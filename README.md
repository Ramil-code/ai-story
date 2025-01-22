# AI Story-Based Time Filler

AI Story-Based Time Filler is a web application that generates audio files based on user-provided text prompts. It leverages AWS services such as Lambda, S3, Polly, and Bedrock to create and store audio files.

<p align="center">
  <img src="https://github.com/user-attachments/assets/1f941e16-abfc-48e0-93db-bf925c50439e" alt="Screenshot 2025-01-21 at 3 51 21 PM">
</p>

## Features

- **React Frontend:** Built with Vite and Tailwind CSS.
- **Serverless Backend:** AWS Lambda, S3, Polly, Bedrock, and HTTP API Gateway.
- **Infrastructure-as-Code:** Managed with AWS SAM.
- **CORS Enabled:** Open access to the API from any frontend.

## Prerequisites

Ensure you have the following installed and configured:

1. **AWS CLI** (configured with access keys):  
   [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
   ```bash
   aws configure
   ```

2. **AWS SAM CLI:**  
   [Install SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
   ```bash
   sam --version
   ```

3. **Node.js and npm:**  
   [Install Node.js](https://nodejs.org/)
   ```bash
   node -v
   npm -v
   ```

---

## Deployment Steps

### Step 1: Deploy the Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/Ramil-code/ai-story
   ```
3. Upload the Lambda ZIP file to an S3 bucket:
   ```bash
   aws s3 cp app.py.zip s3://your-bucket-name/app.py.zip
   ```
4. Update the `CodeUri` line in `template.yaml` to reflect the new S3 location:
   ```yaml
   CodeUri: s3://your-bucket-name/app.py.zip
   ```

2. Build and deploy the backend:
   ```bash
   sam build
   sam deploy --guided
   ```

3. After deployment, note the generated API Gateway URL:
   ```
   Outputs:
   ApiUrl - https://xyz123.execute-api.us-east-1.amazonaws.com/Prod/generate
   ```

4. Test the API:
   ```bash
   curl -X POST https://xyz123.execute-api.us-east-1.amazonaws.com/Prod/generate \
        -H "Content-Type: application/json" \
        -d '{"prompt": "Tell me a story", "desiredDuration": 60}'
   ```

---

### Step 2: Deploy the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update the `REPLACE BY YOUR API` line in `AudioGenerator.txs` with endpoint link (Step 1.3)

4. Run the frontend locally:
   ```bash
   npm run dev
   ```
5. AWS SAM creates an S3 bucket named `{AWS::StackName}-audio-files`. Update the deployed Lambda code to reference this bucket.
   
7. Go to the S3 console, open the created bucket, enable static website hosting, and configure access policies to allow public access.
   
9. After Step 2.4, a folder named District will appear in the project directory. Upload its contents to the S3 bucket and retrieve the public URL of the project from the properties.

---

## Future Improvements

- Add authentication using AWS Cognito.
- Implement better UI/UX with Tailwind and React Query.
- Automate deployment using GitHub Actions.

---

## License

This project is licensed under the MIT License.


