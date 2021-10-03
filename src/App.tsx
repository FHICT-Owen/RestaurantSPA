import AddDishButton from "./components/AddDishButton";
import AuthButton from "./components/auth/AuthButton";
import Dialog from "./components/Dialog";
import DishList from "./components/DishList";
import { ToggleProvider } from "./components/Provider";

export default function App() {
  return (
    <>
      <ToggleProvider>
        <AddDishButton />
        <Dialog />
        <DishList />
      </ToggleProvider>
      <AuthButton />
    </>
  )
}
