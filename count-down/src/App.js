import './App.css';
import CountDown from './components/CountDown.tsx';
import { useTranslation } from "react-i18next";


function App() {
const { t } = useTranslation();

  return (
    <div className="App">
      <h1>{t('STARTS IN')}</h1>
      <CountDown />
    </div>
  );
}

export default App;
