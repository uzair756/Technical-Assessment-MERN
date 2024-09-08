Instructions to Run the Project
1. Download the Project Files from GitHub
Go to the GitHub repository where the project is hosted.
Click on the "Code" button and select "Download ZIP."
Extract the downloaded ZIP file to your preferred directory.
2. Open the Project in Your Code Editor
Open your terminal or file explorer.
Navigate to the extracted folder, then to the Technical-Assessment-MERN directory, and then to the backend-auth-app folder.
Open the backend-auth-app folder in your preferred code editor (e.g., Visual Studio Code).
3. Install the Necessary Dependencies
In your code editor, open a new terminal window.

Run the following command to install all the required dependencies:

sh
Copy code
npm install express mongoose cors bcrypt jsonwebtoken
4. Start the Server
In the terminal, run the following command to start the server:

sh
Copy code
node ./index.js
5. Verify the Server is Running
Ensure that the server has started correctly; you should see a message indicating that the server is running (e.g., "MongoDB connected").
You can now access the server API at http://localhost:3000 (or the port your server is configured to use).
