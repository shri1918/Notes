module.exports = {
  "NotesReact": [
    {
      "id": 1,
      "title": "What is React?",
      "content": "React is a JavaScript library created by Facebook. React is a User Interface (UI) library. React is a tool for building UI components.",
      "imp": "Imp"
    },
    {
      "id": 2,
      "title": "What is Babel?",
      "content": "Babel is a JavaScript compiler that can translate markup or programming languages into JavaScript. With Babel, you can use the newest features of JavaScript (ES6 - ECMAScript 2015). Babel is available for different conversions. React uses Babel to convert JSX into JavaScript.",
      "imp": "Imp"
    },
    {
      "id": 3,
      "title": "What is JSX?",
      "content": "JSX stands for JavaScript XML JSX is an XML/HTML like extension to JavaScript.",
      "imp": "Imp"
    },
    {
      "id": 4,
      "title": "What are components in React?",
      "content": "Components are the building blocks of a React application. They describe a part of the user interface and can be composed together to build complex UIs. Components can be either class-based or functional.",
      "example": "\n          // Functional Component\n          function Greeting(props) {\n            return <h1>Hello, {props.name}</h1>;\n          }\n  \n          // Class Component\n          class Greeting extends React.Component {\n            render() {\n              return <h1>Hello, {this.props.name}</h1>;\n            }\n          }\n        ",
      "imp": "Imp"
    },
    {
      "id": 5,
      "title": "What is a state in React?",
      "content": "State is an object that holds some information that may change over the lifetime of the component. It is managed within the component and can influence what gets rendered.",
      "example": "\n          function Counter() {\n            const [count, setCount] = React.useState(0);\n            \n            return (\n              <div>\n                <p>You clicked {count} times</p>\n                <button onClick={() => setCount(count + 1)}>Click me</button>\n              </div>\n            );\n          }\n        ",
      "imp": "Imp"
    },
    {
      "id": 6,
      "title": "What is a prop in React?",
      "content": "Props, short for properties, are read-only attributes that are passed from a parent component to a child component. They are used to pass data and event handlers down to child components.",
      "example": "\n          function Welcome(props) {\n            return <h1>Hello, {props.name}</h1>;\n          }\n  \n          function App() {\n            return <Welcome name=\"Sara\" />;\n          }\n        ",
      "imp": "Imp"
    },
    {
      "id": 7,
      "title": "What is a key in React?",
      "content": "A key is a special string attribute that needs to be included when creating lists of elements. Keys help React identify which items have changed, are added, or are removed, improving the efficiency of the update process.",
      "example": "\n          function ListItem(props) {\n            return <li>{props.value}</li>;\n          }\n  \n          function List() {\n            const items = ['Apple', 'Banana', 'Cherry'];\n            \n            return (\n              <ul>\n                {items.map((item, index) => (\n                  <ListItem key={index} value={item} />\n                ))}\n              </ul>\n            );\n          }\n        ",
      "imp": "Imp"
    },
    {
      "id": 8,
      "title": "What is the virtual DOM?",
      "content": "The virtual DOM is a lightweight copy of the actual DOM that React keeps in memory. It allows React to make updates efficiently by calculating the difference between the current and previous virtual DOM state and applying only the necessary changes to the actual DOM.",
      "example": "\n          // This is an internal process managed by React; you don't directly interact with the virtual DOM.\n          // React will handle diffing and updating the actual DOM for you.\n        ",
      "imp": "V-Imp"
    },
    {
      "id": 9,
      "title": "What are hooks in React?",
      "content": "Hooks are functions that let you use state and other React features in functional components. Some common hooks include useState, useEffect, and useContext.",
      "example": "\n          // useState Hook\n          function Example() {\n            const [count, setCount] = React.useState(0);\n            \n            return (\n              <div>\n                <p>You clicked {count} times</p>\n                <button onClick={() => setCount(count + 1)}>Click me</button>\n              </div>\n            );\n          }\n  \n          // useEffect Hook\n          function DataFetcher() {\n            const [data, setData] = React.useState(null);\n  \n            React.useEffect(() => {\n              fetch('https://api.example.com/data')\n                .then(response => response.json())\n                .then(data => setData(data));\n            }, []); // Empty dependency array means this effect runs once after the initial render\n            \n            return <div>{data ? `Data: ${data}` : 'Loading...'}</div>;\n          }\n        ",
      "imp": "Imp"
    },
    {
      "id": 10,
      "title": "What is the useEffect hook?",
      "content": "useEffect is a hook that lets you perform side effects in functional components. It takes a function as an argument, which can contain any side effect logic, such as data fetching, subscriptions, or manually changing the DOM.",
      "example": "\n          function Example() {\n            const [count, setCount] = React.useState(0);\n  \n            React.useEffect(() => {\n              document.title = `You clicked ${count} times`;\n            }, [count]); // This effect runs whenever 'count' changes\n            \n            return (\n              <div>\n                <p>You clicked {count} times</p>\n                <button onClick={() => setCount(count + 1)}>Click me</button>\n              </div>\n            );\n          }\n        ",
      "imp": "Imp"
    },
    {
      "id": 18,
      "title": "How to add navigate?",
      "content": "Install React Router: npm install react-router-dom.\n        In App.js file \n        Import React Router: import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';\n        ",
      "example": "\n        import React from 'react';\n        import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';\n        import 'bootstrap/dist/css/bootstrap.min.css';\n        import Dashboard from './Dashboard';\n        import ReactNotes from './component/ReactNotes';\n        import data from './data/data'\n        const App = () => {\n        return (\n            <Router>\n                <div>\n                    <Dashboard />\n                <Routes>\n                <Route path=\"/reactNotes\" element={<ReactNotes notes={data.NotesReact} />} />\n                </Routes>\n                </div>\n            </Router>\n            );\n        };\n\n        export default App;\n",
      "imp": "Imp"
    },
    {
      "id": 11,
      "title": "Create a search bar that shows a list of matching cities as you type in React.",
      "content": "To create a search bar that shows a list of matching cities, you can use the useState and useEffect hooks to manage the input state and filter the city list. Here's a basic example:\n          jsx",
      "example": "\n          import React, { useState } from 'react';\n          const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];\n          function CitySearch() {\n            const [searchTerm, setSearchTerm] = useState('');\n            const [filteredCities, setFilteredCities] = useState(cities);\n            const handleChange = (event) => {\n              setSearchTerm(event.target.value);\n              setFilteredCities(\n                cities.filter((city) =>\n                  city.toLowerCase().includes(event.target.value.toLowerCase())\n                )\n              );\n            };\n            return (\n              <div>\n                <input\n                  type=\"text\"\n                  value={searchTerm}\n                  onChange={handleChange}\n                  placeholder=\"Search for a city\"\n                />\n                <ul>\n                  {filteredCities.map((city, index) => (\n                    <li key={index}>{city}</li>\n                  ))}\n                </ul>\n              </div>\n            );\n          }\n      \n          export default CitySearch;\n          \n          ",
      "imp": "Imp"
    },
    {
      "id": 12,
      "title": "Call an API GET method using Axios and the fetch method in React.",
      "content": "To call an API GET method using Axios and the fetch method, you can use the useEffect hook to make the API call when the component mounts. Here's an example:",
      "example": "\n          import React, { useEffect, useState } from 'react';\n          import axios from 'axios';\n      \n          function FetchData() {\n            const [data, setData] = useState([]);\n      \n            // Using Axios\n            useEffect(() => {\n              axios.get('https://api.example.com/data')\n                .then(response => setData(response.data))\n                .catch(error => console.error('Error fetching data with Axios:', error));\n            }, []);\n      \n            // Using Fetch\n            useEffect(() => {\n              fetch('https://api.example.com/data')\n                .then(response => response.json())\n                .then(data => setData(data))\n                .catch(error => console.error('Error fetching data with Fetch:', error));\n            }, []);\n      \n            return (\n              <div>\n                <ul>\n                  {data.map((item, index) => (\n                    <li key={index}>{item.name}</li>\n                  ))}\n                </ul>\n              </div>\n            );\n          }\n      \n          export default FetchData;\n          ",
      "imp": "Imp"
    },
    {
      "id": 13,
      "title": "Update a count when a button is clicked in React.",
      "content": "To update a count when a button is clicked, you can use the useState hook to manage the count state. Here's an example:\n          ",
      "example": "\n          import React, { useState } from 'react';\n      \n          function Counter() {\n            const [count, setCount] = useState(0);\n      \n            return (\n              <div>\n                <p>Count: {count}</p>\n                <button onClick={() => setCount(count + 1)}>Increment</button>\n              </div>\n            );\n          }\n      \n          export default Counter;\n          \n          ",
      "imp": "Imp"
    },
    {
      "id": 14,
      "title": "Create a function that toggles between 'liked' and 'disliked' when a button is clicked in React.",
      "content": "To create a function that toggles between 'liked' and 'disliked', you can use the useState hook to manage the like state. Here's an example:\n          ",
      "example": "\n          import React, { useState } from 'react';\n      \n          function LikeButton() {\n            const [liked, setLiked] = useState(false);\n      \n            return (\n              <div>\n                <button onClick={() => setLiked(!liked)}>\n                  {liked ? 'Dislike' : 'Like'}\n                </button>\n              </div>\n            );\n          }\n      \n          export default LikeButton;\n          \n          ",
      "imp": "V-Imp"
    },
    {
      "id": 15,
      "title": "Create a form with input fields for name, email, and mobile, and console log the values after submission with validation in React.",
      "content": "To create a form with input fields and validation, you can use the useState hook to manage the form state and handle validation. Here's an example:\n        ",
      "example": "\n          import React, { useState } from 'react';\n      \n          function Form() {\n            const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });\n            const [errors, setErrors] = useState({});\n      \n            const handleChange = (event) => {\n              const { name, value } = event.target;\n              setFormData({ ...formData, [name]: value });\n            };\n      \n            const validate = () => {\n              const newErrors = {};\n              if (!formData.name) newErrors.name = 'Name is required';\n              if (!formData.email) newErrors.email = 'Email is required';\n              if (!/S+@S+.S+/.test(formData.email)) newErrors.email = 'Email is invalid';\n              if (!formData.mobile) newErrors.mobile = 'Mobile is required';\n              if (!/^d{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile is invalid';\n              return newErrors;\n            };\n      \n            const handleSubmit = (event) => {\n              event.preventDefault();\n              const newErrors = validate();\n              if (Object.keys(newErrors).length === 0) {\n                console.log(formData);\n              } else {\n                setErrors(newErrors);\n              }\n            };\n      \n            return (\n              <form onSubmit={handleSubmit}>\n                <div>\n                  <label>Name:</label>\n                  <input type=\"text\" name=\"name\" value={formData.name} onChange={handleChange} />\n                  {errors.name && <p>{errors.name}</p>}\n                </div>\n                <div>\n                  <label>Email:</label>\n                  <input type=\"email\" name=\"email\" value={formData.email} onChange={handleChange} />\n                  {errors.email && <p>{errors.email}</p>}\n                </div>\n                <div>\n                  <label>Mobile:</label>\n                  <input type=\"text\" name=\"mobile\" value={formData.mobile} onChange={handleChange} />\n                  {errors.mobile && <p>{errors.mobile}</p>}\n                </div>\n                <button type=\"submit\">Submit</button>\n              </form>\n            );\n          }\n      \n          export default Form;\n          ",
      "imp": "V-Imp"
    },
    {
      "id": 16,
      "title": "Call a POST method in React.",
      "content": "To call a POST method in React, you can use the useState hook to manage the form state and the axios library to make the POST request. Here's an example:\n          ",
      "example": "\n          import React, { useState } from 'react';\n          import axios from 'axios';\n      \n          function PostData() {\n            const [formData, setFormData] = useState({ name: '', email: '' });\n      \n            const handleChange = (event) => {\n              const { name, value } = event.target;\n              setFormData({ ...formData, [name]: value });\n            };\n      \n            const handleSubmit = (event) => {\n              event.preventDefault();\n              axios.post('https://api.example.com/data', formData)\n                .then(response => console.log('Data posted:', response.data))\n                .catch(error => console.error('Error posting data:', error));\n            };\n      \n            return (\n              <form onSubmit={handleSubmit}>\n                <div>\n                  <label>Name:</label>\n                  <input type=\"text\" name=\"name\" value={formData.name} onChange={handleChange} />\n                </div>\n                <div>\n                  <label>Email:</label>\n                  <input type=\"email\" name=\"email\" value={formData.email} onChange={handleChange} />\n                </div>\n                <button type=\"submit\">Submit</button>\n              </form>\n            );\n          }\n      \n          export default PostData;\n          ",
      "imp": "Imp"
    },
    {
      "id": 17,
      "title": "Call an API when the component is visible on the screen in React.",
      "content": "To call an API when the component is visible on the screen, you can use the Intersection Observer API along with the useEffect hook. Here's an example:\n          ",
      "example": "\n          import React, { useEffect, useRef, useState } from 'react';\n      \n          function LazyLoadComponent() {\n            const [data, setData] = useState(null);\n            const ref = useRef();\n      \n            useEffect(() => {\n              const observer = new IntersectionObserver(\n                ([entry]) => {\n                  if (entry.isIntersecting) {\n                    fetch('https://api.example.com/data')\n                      .then(response => response.json())\n                      .then(data => setData(data))\n                      .catch(error => console.error('Error fetching data:', error));\n                    observer.disconnect();\n                  }\n                },\n                { threshold: 0.1 }\n              );\n      \n              if (ref.current) {\n                observer.observe(ref.current);\n              }\n      \n              return () => observer.disconnect();\n            }, []);\n      \n            return (\n              <div ref={ref}>\n                {data ? <div>Data: {JSON.stringify(data)}</div> : <div>Loading...</div>}\n              </div>\n            );\n          }\n      \n          export default LazyLoadComponent;\n          ",
      "imp": "V-Imp"
    }
  ]
};