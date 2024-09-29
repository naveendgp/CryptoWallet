import { Navbar, Welcome, Footer, Services, Transactions } from "../components";
import Mission from "../components/Mission";
const Home = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
    </div>
    <Services />
    <Transactions/>
    <Mission/>
    <Footer />
  </div>
);

export default Home;
