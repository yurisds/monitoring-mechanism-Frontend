import HomePage from "../Pages/HomePage";
import {Routes , BrowserRouter, Route } from "react-router-dom";
import DbListPage from "../Pages/DbList";
import HistogramaDbListPage from "../Pages/HistogramaDbList";
import BoxplotPage from "../Pages/Boxplot";
import UserDbDetailsPage from "../Pages/UserDbDetails";
import Correlation from "../Pages/Correlation";


function Router() {
  
    return (

       <BrowserRouter>

            <Routes>
                <Route path='/' element={<DbListPage/>} />
                <Route path='/statistics' element={<DbListPage/>} />
                <Route path='/histograms' element={<HistogramaDbListPage/>} />
                <Route path='/correlations' element={<Correlation/>} />
                <Route path='/boxplots' element={<BoxplotPage/>} />
                <Route path='/statistics/:userdb' element={<UserDbDetailsPage/>} />

            </Routes>

        </BrowserRouter>

        )
}


export default Router;