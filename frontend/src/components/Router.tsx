import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Landing from "routes/Landing"
import Home from "routes/Home"
import Recommend from "routes/Recommend"
import Random from "routes/Random"
import Category from "routes/Category"
import Analysis from "routes/Analysis"
import Search from "routes/Search"

const AppRouter = () => {
  return(
    <Router>
      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="/" element={<Home />}>
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/random" element={<Random />} />
          <Route path="/category" element={<Category />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter
