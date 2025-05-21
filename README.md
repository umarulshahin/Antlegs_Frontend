
This is the **frontend** of the full-stack authentication system built with **React js**. It connects to a Django backend via REST API and handles user registration, login, logout, and user CRUD operations.

---

## 🚀 Tech Stack

- React (with Hooks)
- React Router DOM
- Axios (for API calls)
- Tailwind CSS (for styling)
- JWT-based Authentication (token stored in `js Cookies`)

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

    git clone : https://github.com/umarulshahin/Antlegs_Frontend.git
    cd Antlegs
    
2. Install Dependencies

       npm install
   
4. Run the App
 
       npm start

✅ Features

      Login and Registration forms
      
      JWT token handling (login/logout/refresh token)
      
      Protected Dashboard (via PrivateRoute)
      
      User update and delete
      
      Spinner fallback with React.Suspense + lazy

🔐 Authentication Flow

      On login: store JWT in js Cookies
      
      Axios attaches Authorization: Bearer <token> in headers
      
      Protected routes check token and redirect unauthenticated users

