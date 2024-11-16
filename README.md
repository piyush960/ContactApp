<h2 align="center">Contact Management App</h2>


### 📕 About <a name = "about"></a>
The Contact Management System (CMS) is a mini feature of a CRM designed to streamline the management of client or customer contact information.

### Technical Decisions
- **MySQL Database**: MySQL ensures efficient CRUD operations for structured data.
- **Material UI (MUI)**: Provides ready-to-use, customizable components for a professional frontend design.

### How It Works
1. **Frontend**:
   - Users interact with forms and tables styled with MUI to manage contacts.
   - Axios handles API calls for backend communication.

2. **Backend**:
   - NodeJS processes API requests, validates data, and communicates with the MySQL database.
   - Error handling ensures robust operations, including duplicate entry prevention.

3. **Database**:
   - MySQL stores all contact information with schema-enforced data integrity.


### 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine. <br/><br/>
OR <br/><br/>
see the **deployed project** [here](https://contact-app-reactnode.vercel.app/).

#### Prerequisites
The following TechStack is required to be install on your machine.
1. npm or yarn
2. Node
3. MySQL

#### Steps
1. Clone the repository.
```shell
git clone https://github.com/piyush960/ContactApp.git
```

2. Set up the backend first.<br/>
   - go to [backend](./backend) directory.
```shell
cd backend
```
```shell
npm install
```
   - create a .env file in the [backend](./backend) directory and configure it with following fields.
```shell
PORT = 8080
DB_USER = your_user_name
DB_NAME = your_db_name
DB_PASSWORD = your_password
DB_HOST = your_host_name
DB_PORT = your_db_port_number
NODE_ENV = development
```
   - run the following command to fire up the backend.
```shell
npm run dev
```

3. Set up the MySQL Database. <br/>
   - Copy and Paste the [db.sql](./backend/db.sql) file in MySQL Workbench or any suitable software capable of running the script.
   - If you see the entries in contacts table, then you are all good to proceed.

4. Setting up the React App in [frontend](./frontend) directory. <br/>
   - go to frontend directory and run the following command.
``` shell
npm install 
```
   - after successfull installation start the app using the following command.
```shell
npm run dev
```
   - Go to [http://localhost:5173/](http://localhost:5173/) to see the app.


### Challenges Faced

1. Integrating Material-UI Components <br/>
Challenge: Using Material-UI (MUI) components for forms and tables initially felt overwhelming due to unfamiliarity with their props and styling methods. <br/>
Solution: Referred to MUI documentation and examples to understand the API and applied consistent theming for a polished look.

2. There was a slight learning curve for MUI's Table component.

3. API Error Handling and Form Validation <br/>
Challenge: Ensuring the form captures all required fields with proper validation (e.g., email format, phone number length). Properly validating inputs to prevent invalid data (e.g., duplicate email entries or missing fields). <br/>
Solution: Used MUI's validation attributes and custom validators to ensure proper input formats. Added middleware in Express to validate request bodies and return descriptive error messages.  <br/>


### Why MySQL ?
1. Contact management inherently involves structured data with defined relationships (e.g., first name, last name, email, phone number, etc.).

2. Familiarity and Community Support.

3. A fixed schema ensures that every contact record adheres to the same structure, which simplifies backend and frontend integration.

4. MySQL handles vertical scaling (e.g., more resources to the server) effectively for structured data.

