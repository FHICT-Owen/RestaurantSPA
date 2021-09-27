import { useAuth0 } from "@auth0/auth0-react";

export default function Auth() {
  const { loginWithRedirect, logout, isLoading, isAuthenticated } = useAuth0();

  if (isLoading) return <div>loading ...</div>
  else {
	  if (isAuthenticated) {
		return (
			<button onClick={() => logout({ returnTo: window.location.origin })}>
				Log Out
			</button>
			)
	  }
	  else {
		return <button onClick={() => loginWithRedirect()}>Log In</button>;
	}
  }
};