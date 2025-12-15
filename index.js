/**
 * @format
 */

import { AppRegistry } from 'react-native';
//import App from './App';
import { name as appName } from './app.json';
import ExpenseApp from './ExpenseTrackerAPP/ExpenseEndpoint.jsx';


AppRegistry.registerComponent(appName, () => ExpenseApp);
