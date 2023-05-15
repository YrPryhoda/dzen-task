import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import CommentDetails from '../pages/CommentDetails';
import Home from '../pages/Home';

import { routes } from './routes';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.commentDetails} element={<CommentDetails />} />
      <Route path={routes.others} element={<Home />} />
    </Route>,
  ),
);
