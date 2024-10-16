import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function MainPhotoSessionForm() {
  const navigate = useNavigate();

  const onLogin = () => {
    console.log("hey");
    // navigate("http://denys.localhost:3000");
    window.location.href = "http://denys.localhost:3000";
  };
  return (
    <>
      <div>SIGN IN</div>;
      <input type="text" />
      <input type="text" />
      <button onClick={onLogin}>LOGIN</button>
      <Link to="/signUp">SIGN UP</Link>
    </>
  );
}
