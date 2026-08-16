import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Package,
  Award,
  FileText,
  Truck,
  ChevronRight,
} from 'lucide-react';
import { getHomepageConfig } from '../services/homepage.service';
import { getCategories } from '../services/categories.service';
import { getProducts } from '../services/products.service';
import { getIndustries } from '../services/industries.service';
import { getCapabilities } from '../services/capabilities.service';
import { getProjects } from '../services/projects.service';
import { getCertifications } from '../services/certifications.service';
import { getPosts } from '../services/posts.service';
import {
  HomepageConfig,
  Category,
  Product,
  Industry,
  Capability,
  Project,
  Certification,
  BlogPost,
} from '../types';
import {
  initialHomepageConfig,
  initialCategories,
  initialProducts,
  initialIndustries,
  initialCapabilities,
  initialProjects,
  initialCertifications,
  initialBlogPosts,
} from '../data/seedData';

export const Home: React.FC = () => {
  const [config, setConfig] = useState<HomepageConfig>(initialHomepageConfig);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>(initialProducts.filter(p => p.featured));
  const [industries, setIndustries] = useState<Industry[]>(initialIndustries);
  const [capabilities, setCapabilities] = useState<Capability[]>(initialCapabilities);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [certifications, setCertifications] = useState<Certification[]>(initialCertifications);
  const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getHomepageConfig(),
      getCategories(),
      getProducts(),
      getIndustries(),
      getCapabilities(),
      getProjects(),
      getCertifications(),
      getPosts(),
    ])
      .then(([cfg, cats, prods, inds, caps, projs, certs, pstList]) => {
        setConfig(cfg);
        setCategories(cats.slice(0, 8));
        setFeaturedProducts(prods.filter((p) => p.featured).slice(0, 6));
        setIndustries(inds.slice(0, 6));
        setCapabilities(caps.slice(0, 4));
        setProjects(projs.slice(0, 3));
        setCertifications(certs.slice(0, 3));
        setPosts(pstList.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Using default fallback data:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white text-industrial-dark font-sans">
      {/* Hero */}
      <section className="relative bg-industrial-dark text-white overflow-hidden border-b border-industrial-slate">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={config.heroImage}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-industrial-dark via-industrial-dark/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-industrial-slate border border-industrial-steel text-industrial-orange text-xs font-bold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4 text-industrial-orange" />
              <span>{config.heroEyebrow}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none mb-6">
              {config.heroHeading}
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed mb-8 max-w-2xl">
              {config.heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to={config.primaryCtaLink}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded text-base font-bold text-white bg-industrial-orange hover:bg-industrial-orange-hover transition-all shadow-md group"
              >
                <span>{config.primaryCtaText}</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={config.secondaryCtaLink}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded text-base font-bold text-white bg-industrial-slate hover:bg-industrial-steel border border-industrial-steel transition-all"
              >
                <span>{config.secondaryCtaText}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="bg-industrial-slate border-b border-industrial-steel text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-industrial-steel">
            {config.trustMetrics.map((metric, idx) => (
              <div key={idx} className={idx !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}>
                <div className="text-3xl sm:text-4xl font-black text-industrial-orange tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold uppercase text-gray-300 tracking-wider mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 sm:py-24 bg-industrial-light border-b border-industrial-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-industrial-orange mb-2">
                Catalog Categories
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-industrial-dark tracking-tight">
                Product Categories
              </h2>
            </div>
            <Link
              to="/products"
              className="mt-4 md:mt-0 text-sm font-bold text-industrial-orange hover:text-industrial-orange-hover inline-flex items-center"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="group bg-white rounded-lg border border-industrial-border overflow-hidden hover:border-industrial-orange transition-all hover:shadow-industrial flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {cat.productCount && (
                    <span className="absolute top-3 right-3 bg-industrial-dark/90 text-white text-[11px] font-bold px-2.5 py-1 rounded">
                      {cat.productCount}+ Items
                    </span>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-industrial-dark group-hover:text-industrial-orange transition-colors mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-industrial-muted leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-industrial-border flex items-center text-xs font-bold text-industrial-dark group-hover:text-industrial-orange transition-colors">
                    <span>Explore Products</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Company Section */}
      <section className="py-16 sm:py-24 bg-white border-b border-industrial-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-bold uppercase tracking-wider text-industrial-orange">
                About The Company
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-industrial-dark tracking-tight leading-tight">
                {config.companyHeading}
              </h2>
              <p className="text-base text-industrial-muted leading-relaxed">
                {config.companyBody}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-industrial-orange mr-3 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-industrial-dark">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-industrial-orange mr-3 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-industrial-dark">
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-industrial-orange mr-3 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-industrial-dark">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center px-5 py-3 rounded text-sm font-bold text-white bg-industrial-dark hover:bg-industrial-slate transition-colors"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-lg overflow-hidden border border-industrial-border shadow-elevated">
                <img
                  src={config.companyImage}
                  alt="Company Facility"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 sm:py-24 bg-industrial-light border-b border-industrial-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-bold uppercase tracking-wider text-industrial-orange mb-2">
              Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-industrial-dark tracking-tight">
              Services & Capabilities
            </h2>
            <p className="text-sm text-industrial-muted mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <div
                key={cap.id}
                className="bg-white p-6 rounded-lg border border-industrial-border flex flex-col justify-between hover:shadow-subtle transition-shadow"
              >
                <div>
                  <div className="w-12 h-12 rounded bg-industrial-orange-light text-industrial-orange flex items-center justify-center font-bold mb-4">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-industrial-dark mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-industrial-muted leading-relaxed">
                    {cap.shortDescription}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-industrial-border">
                  <Link
                    to="/capabilities"
                    className="text-xs font-bold text-industrial-orange hover:underline inline-flex items-center"
                  >
                    Learn More <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 sm:py-24 bg-white border-b border-industrial-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-industrial-orange mb-2">
                Sectors
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-industrial-dark tracking-tight">
                Industries Served
              </h2>
            </div>
            <Link
              to="/industries"
              className="mt-4 md:mt-0 text-sm font-bold text-industrial-orange hover:underline inline-flex items-center"
            >
              All Industries <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind) => (
              <div
                key={ind.id}
                className="group relative rounded-lg overflow-hidden border border-industrial-border h-64 flex items-end"
              >
                <img
                  src={ind.image}
                  alt={ind.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark via-industrial-dark/60 to-transparent" />
                <div className="relative z-10 p-6 text-white">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-industrial-orange transition-colors">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-2">
                    {ind.shortDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-24 bg-industrial-light border-b border-industrial-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-industrial-orange mb-2">
                Products
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-industrial-dark tracking-tight">
                Featured Products
              </h2>
            </div>
            <Link
              to="/products"
              className="mt-4 md:mt-0 text-sm font-bold text-industrial-orange hover:underline inline-flex items-center"
            >
              Browse Products <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-lg border border-industrial-border overflow-hidden hover:border-industrial-orange transition-all hover:shadow-industrial flex flex-col justify-between"
              >
                <div className="p-4 bg-gray-50 border-b border-industrial-border relative h-56 flex items-center justify-center">
                  <img
                    src={prod.featuredImage}
                    alt={prod.name}
                    className="max-h-full max-w-full object-contain"
                  />
                  {prod.brandName && (
                    <span className="absolute top-3 left-3 bg-industrial-dark text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {prod.brandName}
                    </span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-industrial-orange uppercase tracking-wider mb-1">
                      {prod.categoryName}
                    </div>
                    <h3 className="text-base font-bold text-industrial-dark line-clamp-2 mb-2">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-industrial-muted line-clamp-2 leading-relaxed mb-4">
                      {prod.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-industrial-border flex items-center justify-between gap-3">
                    <Link
                      to={`/products/${prod.slug}`}
                      className="flex-1 text-center py-2 px-3 rounded border border-industrial-dark text-industrial-dark font-bold text-xs hover:bg-industrial-dark hover:text-white transition-colors"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/contact?product=${encodeURIComponent(prod.name)}`}
                      className="flex-1 text-center py-2 px-3 rounded bg-industrial-orange text-white font-bold text-xs hover:bg-industrial-orange-hover transition-colors"
                    >
                      Enquire Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 sm:py-24 bg-white border-b border-industrial-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-industrial-orange mb-2">
                Projects
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-industrial-dark tracking-tight">
                Case Studies
              </h2>
            </div>
            <Link
              to="/projects"
              className="mt-4 md:mt-0 text-sm font-bold text-industrial-orange hover:underline inline-flex items-center"
            >
              All Projects <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-industrial-light rounded-lg border border-industrial-border overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={proj.heroImage}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-industrial-dark text-white text-[11px] font-bold px-2.5 py-1 rounded">
                      {proj.year}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-bold text-industrial-orange uppercase tracking-wider mb-1">
                      {proj.industry} • {proj.location}
                    </div>
                    <h3 className="text-lg font-bold text-industrial-dark mb-3 line-clamp-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-industrial-muted leading-relaxed line-clamp-3 mb-4">
                      {proj.shortResult}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    to={`/projects/${proj.slug}`}
                    className="w-full inline-flex items-center justify-center py-2.5 border border-industrial-border rounded bg-white text-xs font-bold text-industrial-dark hover:bg-industrial-dark hover:text-white transition-colors"
                  >
                    View Details <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 sm:py-24 bg-industrial-slate text-white border-b border-industrial-steel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-bold uppercase tracking-wider text-industrial-orange">
                Certifications
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Quality & Compliance
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="pt-2">
                <Link
                  to="/resources/documents"
                  className="inline-flex items-center px-5 py-3 rounded text-sm font-bold text-white bg-industrial-orange hover:bg-industrial-orange-hover transition-colors"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  <span>Document Center</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-industrial-dark p-5 rounded border border-industrial-steel flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded bg-industrial-slate flex items-center justify-center mb-3">
                      <Award className="w-5 h-5 text-industrial-orange" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1 line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      {cert.issuingAuthority}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-industrial-steel text-[11px] text-gray-400">
                    {cert.validUntil ? `Valid until ${cert.validUntil}` : 'Active'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="py-16 sm:py-24 bg-white border-b border-industrial-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-industrial-orange mb-2">
                Blog & Insights
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-industrial-dark tracking-tight">
                Latest Articles
              </h2>
            </div>
            <Link
              to="/insights"
              className="mt-4 md:mt-0 text-sm font-bold text-industrial-orange hover:underline inline-flex items-center"
            >
              All Articles <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/insights/${post.slug}`}
                className="group bg-white rounded-lg border border-industrial-border overflow-hidden hover:border-industrial-orange transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-industrial-orange uppercase tracking-wider mb-2">
                    {post.category} • {post.publishDate}
                  </div>
                  <h3 className="text-lg font-bold text-industrial-dark group-hover:text-industrial-orange transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-industrial-muted line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-industrial-dark text-white text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
            {config.finalCtaHeading}
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            {config.finalCtaDescription}
          </p>
          <Link
            to={config.finalCtaButtonLink}
            className="inline-flex items-center px-8 py-4 rounded text-base font-bold text-white bg-industrial-orange hover:bg-industrial-orange-hover transition-colors shadow-lg"
          >
            <span>{config.finalCtaButtonText}</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};
