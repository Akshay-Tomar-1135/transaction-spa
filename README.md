# Transaction Dashboard

It is a single page application which reads products data from a third party URL and manipulates it to give analytics in form of tables, statistics and charts.

## Features

- **Table analysis:** Fetched JSON content from 3rd party URL converted into tabular format which is facilitated with **pagination**.

- **Statistics:** Provides information about Total Sales, Number of Sold items and Number of unsold items

- **Bar Chart:**  Provides a chart analysis about product counts in different price ranges.
## Tech Stack

- **Express.js:** Express.js is used as the backend server framework to handle API requests and routing, which works as an interface and filter between 3rd party's content and frontend.

- **React:** The frontend is built using React for a dynamic and interactive user interface.

- **Node.js:** Node.js is used as the runtime environment for the server.

- **BootStrap:** BootStrap is used for providing styling to frontend.
## Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Akshay-Tomar-1135/transaction-spa.git
   ```

2. Install dependencies:

    ```bash
    cd transaction-spa/server
    npm install
    npm start
    ```
    Open another terminal (start with previous directory)
    ```
    cd ../transaction
    npm install
    npm start
    ```



## Screenshots

### Tabular Data
![image](https://github.com/Akshay-Tomar-1135/transaction-spa/assets/75598614/58bc37b2-a74c-4b28-82aa-cde63ffe1d29)

### Pagination
![image](https://github.com/Akshay-Tomar-1135/transaction-spa/assets/75598614/1959b9ac-3c0a-44b0-b5c7-b1356d084846)

### Statistics
![image](https://github.com/Akshay-Tomar-1135/transaction-spa/assets/75598614/86dd0067-5e76-4042-8fde-2c59ec4ed69d)

### Bar Chart
![image](https://github.com/Akshay-Tomar-1135/transaction-spa/assets/75598614/707b69f9-f21b-4f61-a022-bb1560e6df6d)
## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.


## Authors

[@Akshay Tomar](https://www.github.com/Akshay-Tomar-1135)

