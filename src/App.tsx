import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { NotFound } from './pages/NotFound';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Today = lazy(() => import('./pages/Today'));
const Roadmap = lazy(() => import('./pages/Roadmap'));
const WeekPage = lazy(() => import('./pages/WeekPage'));
const LessonPage = lazy(() => import('./pages/LessonPage'));
const ToolGuidePage = lazy(() => import('./pages/ToolGuidePage'));
const Toolkit = lazy(() => import('./pages/Toolkit'));
const ToolPage = lazy(() => import('./pages/ToolPage'));
const Templates = lazy(() => import('./pages/Templates'));
const Frameworks = lazy(() => import('./pages/Frameworks'));
const Interview = lazy(() => import('./pages/Interview'));
const Jobs = lazy(() => import('./pages/Jobs'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Glossary = lazy(() => import('./pages/Glossary'));
const WeeklyReviewPage = lazy(() => import('./pages/WeeklyReview'));
const Settings = lazy(() => import('./pages/Settings'));
const Styleguide = lazy(() => import('./pages/Styleguide'));
const SkipThis = lazy(() => import('./pages/SkipThis'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'today', element: <Today /> },
      { path: 'roadmap', element: <Roadmap /> },
      { path: 'week/:n', element: <WeekPage /> },
      { path: 'lesson/:id', element: <LessonPage /> },
      { path: 'guide/:id', element: <ToolGuidePage /> },
      { path: 'toolkit', element: <Toolkit /> },
      { path: 'toolkit/:tool', element: <ToolPage /> },
      { path: 'templates', element: <Templates /> },
      { path: 'templates/:id', element: <Templates /> },
      { path: 'frameworks', element: <Frameworks /> },
      { path: 'frameworks/:id', element: <Frameworks /> },
      { path: 'interview', element: <Interview /> },
      { path: 'interview/:tab', element: <Interview /> },
      { path: 'jobs', element: <Jobs /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'glossary', element: <Glossary /> },
      { path: 'review', element: <WeeklyReviewPage /> },
      { path: 'skip', element: <SkipThis /> },
      { path: 'settings', element: <Settings /> },
      { path: 'styleguide', element: <Styleguide /> },
      { path: '*', element: <NotFound /> },
    ],
  },
], { basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/' });

export function App() {
  return <RouterProvider router={router} />;
}
