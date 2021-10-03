import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default function AuthButton() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) return <div>loading ...</div>
  else return isAuthenticated ? <LogoutButton /> : <LoginButton />
}