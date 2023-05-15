import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import CommentDetails from '../pages/CommentDetails';
import PageLayout from '../components/PageLayout';
import { routes } from './routes';
import Home from '../pages/Home';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageLayout />}>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.commentDetails} element={<CommentDetails />} />
      <Route path={routes.others} element={<Home />} />
    </Route>,
  ),
);
