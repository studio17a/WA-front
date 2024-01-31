import { Button } from "@chakra-ui/button";
import LoginModal from "./LoginModal";
const Login = () => {
  return (
    <div>
      <LoginModal>
        <Button display="flex" fontSize={{ base: "17px" }}>
          login...
        </Button>
      </LoginModal>
    </div>
  );
};

export default Login;
