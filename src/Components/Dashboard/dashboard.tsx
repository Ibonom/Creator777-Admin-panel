import NavigationBar from "./navigation/Navigation";
import { UpperBar } from "./upper-bar/UpperBar";
import "./dashboard.scss";
import { Route, Routes } from "react-router-dom";
import DataEditor from "./dataEditor/dataEditor";
import DataDisplayer from "./dataDisplayer/dataDisplayer";
import HomePage from "./homePage/homePage";

const Dashboard = () => {
  
  return (
    <>
      <UpperBar></UpperBar>
      <main>
        <NavigationBar></NavigationBar>
          <section className="container">
            <Routes>
              <Route path="" element={<HomePage />} />
              <Route path="/subsites" element={<DataDisplayer type="subpages" />} />
              <Route path="/blog" element={<DataDisplayer type="blog" />} />
              <Route path="/users" element={<DataDisplayer type="users" />} />
              <Route path="/config" element={<DataDisplayer type="config" />} />
              <Route path="/blog/:id/edit" element={<DataEditor type="blog" mode="edit"/>} />
              <Route path="/podcast" element={<DataDisplayer type="podcast"/>} />
              <Route path="/podcast/edit/:id" element={<DataEditor mode="edit" type="podcast"/>} />
              <Route path="/config/:app/edit" element={<DataEditor type="config" mode="edit"/>} />
              <Route path="/blog/new" element={<DataEditor type="blog" mode="new"/>} />
             
            </Routes>
          </section>
      </main>
    </>
  );
};

export default Dashboard;

