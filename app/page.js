import Loader from '../components/Loader';
import Sky from '../components/Sky';
import Nav from '../components/Nav';
import Main from '../components/Main';
import Footer from '../components/Footer';

export default function Page() {
  return (
    <>
      <Loader />
      <Sky />
      <Nav />
      <Main />
      <Footer />
    </>
  );
}
