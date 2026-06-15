
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TrackerView } from './features/tracker/TrackerView';
import { SuppView } from './features/tracker/SuppView';
import { RoutineView, MenuView, VariantsView, CheatView } from './features/tracker/StaticViews';
import { ShoppingListView } from './features/tracker/ShoppingListView';
import { toggleTheme } from './features/tracker/trackerSlice';
import type { RootState } from './app/store';
import { Sun, Moon } from 'lucide-react';
import './App.css';

type Tab = 'tracker' | 'rutina' | 'supps' | 'compras' | 'menu' | 'variantes' | 'cheat';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('tracker');
  const theme = useSelector((state: RootState) => state.tracker.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`app-wrapper ${theme}`}>
      <div className="container">
        <div className="tabs">
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
            <button 
              className={`tab ${activeTab === 'tracker' ? 'active' : ''}`} 
              onClick={() => setActiveTab('tracker')}
            >
              📊 Tracker
            </button>
            <button 
              className={`tab ${activeTab === 'rutina' ? 'active' : ''}`} 
              onClick={() => setActiveTab('rutina')}
            >
              📅 Rutina
            </button>
            <button 
              className={`tab ${activeTab === 'supps' ? 'active' : ''}`} 
              onClick={() => setActiveTab('supps')}
            >
              💊 Supps
            </button>
            <button 
              className={`tab ${activeTab === 'compras' ? 'active' : ''}`} 
              onClick={() => setActiveTab('compras')}
            >
              🛒 Compras
            </button>
            <button 
              className={`tab ${activeTab === 'menu' ? 'active' : ''}`} 
              onClick={() => setActiveTab('menu')}
            >
              🍽 Menú
            </button>
            <button 
              className={`tab ${activeTab === 'variantes' ? 'active' : ''}`} 
              onClick={() => setActiveTab('variantes')}
            >
              🔄 Var
            </button>
            <button 
              className={`tab ${activeTab === 'cheat' ? 'active' : ''}`} 
              onClick={() => setActiveTab('cheat')}
            >
              🍕 Cheat
            </button>
          </div>
          <button 
            className="tab" 
            onClick={() => dispatch(toggleTheme())}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '7px' }}
            title={theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="content">
          {activeTab === 'tracker' && <TrackerView />}
          {activeTab === 'rutina' && <RoutineView />}
          {activeTab === 'supps' && <SuppView />}
          {activeTab === 'compras' && <ShoppingListView />}
          {activeTab === 'menu' && <MenuView />}
          {activeTab === 'variantes' && <VariantsView />}
          {activeTab === 'cheat' && <CheatView />}
        </div>
      </div>
    </div>
  );
}

export default App;
