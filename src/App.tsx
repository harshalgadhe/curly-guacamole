import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/common/Layout';
import { ScrollToTop } from './components/common/ScrollToTop';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Industries } from './pages/Industries';
import { Capabilities } from './pages/Capabilities';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { About } from './pages/About';
import { Infrastructure } from './pages/Infrastructure';
import { Quality } from './pages/Quality';
import { DocumentCenter } from './pages/DocumentCenter';
import { GalleryPage } from './pages/GalleryPage';
import { InsightsPage } from './pages/InsightsPage';
import { InsightDetail } from './pages/InsightDetail';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminCRUD } from './pages/AdminCRUD';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Website Shell */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:slug" element={<ProductDetail />} />
          <Route path="industries" element={<Industries />} />
          <Route path="capabilities" element={<Capabilities />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="about" element={<About />} />
          <Route path="infrastructure" element={<Infrastructure />} />
          <Route path="quality" element={<Quality />} />
          <Route path="resources/documents" element={<DocumentCenter />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="insights/:slug" element={<InsightDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin CMS Authentication & Portal */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/crud/:entity" element={<AdminCRUD />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
