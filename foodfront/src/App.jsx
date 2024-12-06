import SignIn from './SignIn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  const allroutes=[
    {
      path: '/',
      element: <h1>Welcome to My App</h1>,
     
    },
    {
      path: '/Signin',
      element: <SignIn/>
    }
  ]

  return (
    
    <Router>
    <Routes>
      {allroutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={route.element}
        />
      ))}
    </Routes>
  </Router>
      
  )
}

export default App
