import { Routes, Route, BrowserRouter, matchRoutes } from "react-router-dom";
import './App.css';
import Home from "./pages/admin/Home";
import AddMember from "./pages/admin/AddMember";
import EditMember from "./pages/admin/backoffice/EditMember";

 import PackageForm from "./pages/admin/backoffice/PackageForm";
import AllPackages from "./pages/admin/backoffice/AllPackages";
import EditPackage from "./pages/admin/backoffice/EditPackage";
import AllMembers from "./pages/admin/backoffice/AllMembers";
import AllRenewals from "./pages/admin/backoffice/AllRenewals";
import AllStats from "./pages/admin/backoffice/AllStats";
import InvoiceGenerator from "./pages/admin/backoffice/InvoiceGenerator";
import MasterHome from "./pages/MasterHome";
 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MasterHome />}/>
        <Route exact path="/dashboard" element={<Home />} /> 
        <Route exact path="/admin/addmember" element={<AddMember />} /> 
        <Route exact path="/admin/allmembers" element={<AllMembers />} /> 
        <Route path="/admin/editmembers/:id" element={<EditMember />} />
        <Route path="/admin/renewals" element={<AllRenewals />} />
        <Route path="/admin/stats" element={<AllStats />} />
        <Route path="/admin/generate-invoice" element={<InvoiceGenerator />} />
        <Route exact path="/admin/backoffice/packages" element={<AllPackages />} /> 
        <Route exact path="/admin/backoffice/packageform" element={<PackageForm />} /> 
        <Route exact path="/admin/backoffice/packageform/:id" element={<EditPackage />} /> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;