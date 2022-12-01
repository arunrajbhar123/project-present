import { Routes, Route } from "react-router-dom";
import Favorites from "./../Pages/Favorites";
import Buy from "./../Pages/Buy";
import NotFoundPage from "./../Pages/NotFoundPage";
import Login from "./../Pages/Login";
import Signup from "./../Pages/Signup";
import Preview from "./../Pages/Preview";
const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Buy />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/preview" element={<Preview />} />
    </Routes>
  );
};
export default MainRoute;
