import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";

const Dashboard = () => {
  const { isLoggedIn } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div>Dashboard</div>
    </>
  );
};

export default Dashboard;
