import AddDishButton from "./components/AddDishButton";
import AuthButton from "./components/auth/AuthButton";
import Dialog from "./components/Dialog";
import DishList from "./components/DishList";
import { AppProvider } from "./context";

export default function App() {

  return (
    <AppProvider>
      <AuthButton />
      <AddDishButton />
      <Dialog />
      <DishList />
    </AppProvider>
  )
}
