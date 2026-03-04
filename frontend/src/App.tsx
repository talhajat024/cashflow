import AppRoutes from "./routes/AppRoutes"
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/auth";

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
       <AppRoutes/>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
