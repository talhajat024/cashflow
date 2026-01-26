import { Routes,Route } from "react-router-dom";

const AppRoutes = ()=>
{
    return(
        <Routes>
            <Route path="/" element={<h2>Dashboard</h2>}/>
            <Route path="/wallet" element={<h2>Wallet</h2>}/>
            <Route path="/invoices" element={<h2>Invoice</h2>}/>
        </Routes>
    )
}

export default AppRoutes;