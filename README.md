**Overview
Purpose: A platform where users can rate stores, owners can track ratings, and admins manage everything.

Roles:

Admin → manage users, stores, view dashboards.

Normal User → sign up, log in, search stores, submit/modify ratings.

Store Owner → view ratings & average score of their store.

Validations: Strong password rules, email format, name & address length checks.

Tech Stack:

Backend: Node.js + Express + Sequelize + SQLite (APIs, auth, DB).

Frontend: React + Axios + Tailwind (UI, forms, dashboards).

Database: Users, Stores, Ratings tables linked by IDs.

Flow: Admin adds store → User rates → Owner views ratings → Admin sees dashboard stats.


