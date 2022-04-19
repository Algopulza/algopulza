import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
  import Home from "routes/Home";
import Landing from "routes/Landing";
import Recommand from "routes/Recommand";
import Random from "routes/Random";
import Category from "routes/Category";
import Analysis from "routes/Analysis";
import Search from "routes/Search";

const AppRouter = () => {
    return(
        <Router>
            <Routes>
                <Route path="" element={<Landing />} />
                <Route path="/" element={<Home />}>
                <Route path="/recommand" element={<Recommand />} />
                <Route path="/random" element={<Random />} />
                <Route path="/category" element={<Category />} />
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/search" element={<Search />} />
                </Route>
            </Routes>
        </Router>

)
}

export default AppRouter;