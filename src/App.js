import { Provider } from 'react-redux';
import './App.css';
import store from './app/store';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <div>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;
