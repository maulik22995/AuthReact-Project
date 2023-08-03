import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { loginUser } from "../utils/auth";
import { useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isLoading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setLoading(true);
    try {
      const token = await loginUser(email, password);
      authContext.authenticate(token);
    } catch (error) {
      console.log(error)
      Alert.alert("Authentication failed!", "Please check your credentials");
    }
    setLoading(false);
  }

  if (isLoading) {
    return <LoadingOverlay message="Logging you in ..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
