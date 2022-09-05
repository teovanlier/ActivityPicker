import './App.css';
import Header from './components/Header';
import { AuthProvider } from './context/AuthProvider';
import PrivateRouter from './components/PrivateRouter';
import LoginRegisterPage from './page/LoginRegisterPage';
import OverviewModule from './page/Overview';
import ActivityContext from './context/ActivityContext';
import { Provider as ActivityProvider} from './context/ActivityContext';
import OverviewPage from './page/Overview';
import RandomActivityPage from './page/RandomActivityPage';



import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
 /* const [activities, setActivities] = useState(ACTIVITY_DATA);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);


  const createActivity = (activity, type, participants, location, price) => {
    const newActivities =[
      {
        activity, type, participants, location, price,
      },
      ...activities,
    ];
    setActivities(newActivities);
  };

  const getActivity = async () => {
    try{
        setError('');
        setLoading(true);
        const response = await axios.get('http://www.boredapi.com/api/activity/');
        setActivities(response.data.data);
      } catch(err) {
        console.log(err);
        setError(err);
    }
  }  
  useEffect(() => {
    getActivity();
  }, []);*/

  //if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  return (
    <AuthProvider>
      <ActivityProvider>
        <Router>
            <div className="w-full h-full sm:bg-gray-200 bg-blue-300">
              <Header/>
                <Switch>
                  <Route exact path="/login">
                      <LoginRegisterPage/>
                  </Route>

                  <PrivateRouter path="/overview">
                        <OverviewPage/>
                    </PrivateRouter>

                    <PrivateRouter path="/randomactivity">
                        <RandomActivityPage/>
                    </PrivateRouter>  

                  <PrivateRouter path="*">
                    <OverviewModule/>
                  </PrivateRouter>

                </Switch>
              </div>
            </Router>
        </ActivityProvider>
		  </AuthProvider>
    );
}

export default App;
