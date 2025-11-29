import SideNavbar from "../components/SideNavbar/SideNavbar";
import { Outlet } from "react-router";
import { Container } from "react-bootstrap";

const Dashboard = () => {
  return (
    <div className="d-flex flex-row bg-gray">
      {/* Side Navbar */}
      <SideNavbar />
      <div className="w-20 mx-4 d-none d-lg-block"></div>
      <Container fluid>
        <main className="py-4 px-5">
          <Outlet />
        </main>
      </Container>
    </div>
  );
};

export default Dashboard;
