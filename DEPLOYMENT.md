# Deployment Guide for RAA-BP

This guide provides instructions for deploying the RAA-BP application to production environments.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git
- Vercel account (for frontend deployment)
- Render account (for backend deployment)

## Frontend Deployment (Vercel)

1. **Prepare the frontend for production**

   Update the `.env` file in the `raa-bp-frontend` directory to point to your production backend URL:

   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

2. **Deploy to Vercel**

   a. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

   b. Navigate to the frontend directory:
   ```
   cd raa-bp-frontend
   ```

   c. Run the Vercel deployment command:
   ```
   vercel
   ```

   d. Follow the prompts to log in and configure your project.

   e. Once deployed, Vercel will provide you with a URL for your frontend application.

## Backend Deployment (Render)

1. **Prepare the backend for production**

   Create a new `.env` file in the `raa-bp-backend` directory with your production settings:

   ```
   PORT=10000
   # Add your Alchemy API key if you're using it
   # ALCHEMY_API_KEY=your_api_key_here
   ```

2. **Deploy to Render**

   a. Push your code to a GitHub repository.

   b. Log in to your Render account and create a new Web Service.

   c. Connect your GitHub repository.

   d. Configure the deployment settings:
      - Name: `raa-bp-backend`
      - Environment: `Node`
      - Build Command: `npm install`
      - Start Command: `node index.js`
      - Add environment variables from your `.env` file

   e. Click "Create Web Service" to deploy.

   f. Render will provide you with a URL for your backend API.

3. **Update CORS settings**

   If needed, update the CORS settings in your backend `index.js` file to allow requests from your Vercel frontend domain:

   ```javascript
   app.use(cors({
     origin: 'https://your-frontend-url.vercel.app'
   }));
   ```

## Testing the Deployment

1. Open your frontend URL in a browser.
2. Try evaluating a sample project to ensure the frontend can communicate with the backend.
3. Check the browser console and server logs for any errors.

## Monitoring and Maintenance

- Set up monitoring for your backend service on Render.
- Regularly check for security updates and dependencies that need updating.
- Consider setting up a CI/CD pipeline for automated deployments.

## Troubleshooting

- **CORS Issues**: Ensure your backend CORS settings allow requests from your frontend domain.
- **API Connection Errors**: Verify that your frontend is using the correct backend URL.
- **Deployment Failures**: Check the build logs on Vercel or Render for specific error messages.

## Scaling Considerations

For a production environment with higher traffic:

1. Consider using a database instead of hardcoded project data.
2. Implement caching for API responses.
3. Set up proper error logging and monitoring.
4. Consider containerizing the application with Docker for easier scaling. 