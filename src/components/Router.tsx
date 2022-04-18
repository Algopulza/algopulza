import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import Landing from "routes/Landing";

const AppRouter = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
            </Routes>
        </Router>

)
}

export default AppRouter;