import { OuterWrapper } from './styles/common'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import SplashPage from './SplashPage'


function App() {


  return (
    <OuterWrapper>
      <SplashPage />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
     />
    </OuterWrapper>
  );
}

export default App;
