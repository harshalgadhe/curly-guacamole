import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Package,
  Briefcase,
  FileText,
  Mail,
  LogOut,
  LayoutDashboard,
  FolderTree,
  Tag,
  Wrench,
  Building2,
  Image as ImageIcon,
  Award,
  BookOpen,
  Settings,
  Plus,
  Trash2,
  CheckCircle,
} from 'lucide-react';
import { subscribeAuth, logoutAdmin } from '../services/auth.service';
import { getProducts } from '../services/products.service';
import { getProjects } from '../services/projects.service';
import { getDocuments } from '../services/documents.service';
import { getEnquiries, updateEnquiryStatus } from '../services/enquiries.service';
import { Product, Project, DocumentItem, Enquiry, EnquiryStatus } from '../types';

export const AdminDashboard: React.FC = () => {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'enquiries'>('dashboard');

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = subscribeAuth((user) => {
      if (!user) {
        setAuthed(false);
        navigate('/admin/login');
      } else {
        setAuthed(true);
        loadData();
      }
    });
    return () => unsub();
  }, [navigate]);

  const loadData = () => {
    Promise.all([getProducts(false), getProjects(false), getDocuments(false), getEnquiries()]).then(
      ([prods, projs, docs, enqs]) => {
        setProducts(prods);
        setProjects(projs);
        setDocuments(docs);
        setEnquiries(enqs);
      }
    );
  };

  const handleStatusChange = async (id: string, status: EnquiryStatus) => {
    await updateEnquiryStatus(id, status);
    loadData();
  };

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/admin/login');
  };

  if (authed === null) return <div className="p-8 text-center text-xs">Verifying Admin Access...</div>;
  if (!authed) return null;

  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;

  return (
    <div className="min-h-screen bg-industrial-light flex flex-col md:flex-row font-sans">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-industrial-dark text-white p-6 shrink-0 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-8 border-b border-industrial-slate pb-4">
            <div className="w-8 h-8 bg-industrial-orange rounded flex items-center justify-center font-black text-white text-base">
              A
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-none">Apex Admin CMS</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Content Manager</div>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-3 py-2.5 rounded flex items-center space-x-2 transition-colors ${activeTab === 'dashboard' ? 'bg-industrial-orange text-white' : 'text-gray-300 hover:bg-industrial-slate'}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <Link to="/admin/crud/products" className="block px-3 py-2.5 rounded text-gray-300 hover:bg-industrial-slate flex items-center space-x-2">
              <Package className="w-4 h-4" /> <span>Products</span>
            </Link>
            <Link to="/admin/crud/categories" className="block px-3 py-2.5 rounded text-gray-300 hover:bg-industrial-slate flex items-center space-x-2">
              <FolderTree className="w-4 h-4" /> <span>Categories</span>
            </Link>
            <Link to="/admin/crud/brands" className="block px-3 py-2.5 rounded text-gray-300 hover:bg-industrial-slate flex items-center space-x-2">
              <Tag className="w-4 h-4" /> <span>Brands</span>
            </Link>
            <Link to="/admin/crud/projects" className="block px-3 py-2.5 rounded text-gray-300 hover:bg-industrial-slate flex items-center space-x-2">
              <Briefcase className="w-4 h-4" /> <span>Projects</span>
            </Link>
            <Link to="/admin/crud/documents" className="block px-3 py-2.5 rounded text-gray-300 hover:bg-industrial-slate flex items-center space-x-2">
              <FileText className="w-4 h-4" /> <span>Documents</span>
            </Link>
            <Link to="/admin/crud/certifications" className="block px-3 py-2.5 rounded text-gray-300 hover:bg-industrial-slate flex items-center space-x-2">
              <Award className="w-4 h-4" /> <span>Certifications</span>
            </Link>
            <Link to="/admin/crud/gallery" className="block px-3 py-2.5 rounded text-gray-300 hover:bg-industrial-slate flex items-center space-x-2">
              <ImageIcon className="w-4 h-4" /> <span>Gallery</span>
            </Link>
            <Link to="/admin/crud/posts" className="block px-3 py-2.5 rounded text-gray-300 hover:bg-industrial-slate flex items-center space-x-2">
              <BookOpen className="w-4 h-4" /> <span>Insights Blog</span>
            </Link>
            <button
              onClick={() => setActiveTab('enquiries')}
              className={`w-full text-left px-3 py-2.5 rounded flex items-center justify-between transition-colors ${activeTab === 'enquiries' ? 'bg-industrial-orange text-white' : 'text-gray-300 hover:bg-industrial-slate'}`}
            >
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" /> <span>Enquiries</span>
              </div>
              {newEnquiriesCount > 0 && (
                <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded font-bold">{newEnquiriesCount}</span>
              )}
            </button>
            <Link to="/admin/crud/settings" className="block px-3 py-2.5 rounded text-gray-300 hover:bg-industrial-slate flex items-center space-x-2">
              <Settings className="w-4 h-4" /> <span>Site Settings</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-industrial-slate">
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 rounded bg-red-950 text-red-300 hover:bg-red-900 text-xs font-bold flex items-center justify-center space-x-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10">
        
        {/* Metric Cards (No charts per instruction #13) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-lg border border-industrial-border shadow-subtle">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase text-industrial-muted">Total Products</div>
              <Package className="w-5 h-5 text-industrial-orange" />
            </div>
            <div className="text-3xl font-black text-industrial-dark mt-2">{products.length}</div>
            <div className="text-[11px] text-industrial-muted mt-1">{products.filter(p => p.published).length} published</div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-industrial-border shadow-subtle">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase text-industrial-muted">Projects</div>
              <Briefcase className="w-5 h-5 text-industrial-orange" />
            </div>
            <div className="text-3xl font-black text-industrial-dark mt-2">{projects.length}</div>
            <div className="text-[11px] text-industrial-muted mt-1">Case studies online</div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-industrial-border shadow-subtle">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase text-industrial-muted">Documents</div>
              <FileText className="w-5 h-5 text-industrial-orange" />
            </div>
            <div className="text-3xl font-black text-industrial-dark mt-2">{documents.length}</div>
            <div className="text-[11px] text-industrial-muted mt-1">PDFs in Document Center</div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-industrial-border shadow-subtle">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase text-industrial-muted">New Enquiries</div>
              <Mail className="w-5 h-5 text-industrial-orange" />
            </div>
            <div className="text-3xl font-black text-industrial-dark mt-2">{newEnquiriesCount}</div>
            <div className="text-[11px] text-industrial-muted mt-1">{enquiries.length} total received</div>
          </div>
        </div>

        {/* Recent Enquiries Table */}
        <div className="bg-white rounded-lg border border-industrial-border shadow-subtle p-6">
          <div className="flex items-center justify-between border-b border-industrial-border pb-4 mb-4">
            <h2 className="text-lg font-bold text-industrial-dark flex items-center">
              <Mail className="w-5 h-5 mr-2 text-industrial-orange" /> Recent B2B Quote Enquiries
            </h2>
            <span className="text-xs text-industrial-muted">Manage incoming quote requests</span>
          </div>

          {enquiries.length === 0 ? (
            <div className="text-center py-8 text-xs text-industrial-muted">No sales enquiries received yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-industrial-light text-industrial-dark uppercase font-bold text-[11px] border-b border-industrial-border">
                  <tr>
                    <th className="p-3">Customer Name</th>
                    <th className="p-3">Company</th>
                    <th className="p-3">Phone / Email</th>
                    <th className="p-3">Product Context</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-industrial-border">
                  {enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-gray-50">
                      <td className="p-3 font-bold text-industrial-dark">{enq.name}</td>
                      <td className="p-3 font-medium text-industrial-dark">{enq.company || 'N/A'}</td>
                      <td className="p-3 text-industrial-muted">
                        <div>{enq.phone}</div>
                        <div className="text-[11px] text-gray-500">{enq.email}</div>
                      </td>
                      <td className="p-3 text-industrial-muted max-w-xs truncate">
                        {enq.productName ? (
                          <span className="font-semibold text-industrial-orange">{enq.productName}</span>
                        ) : (
                          enq.subject
                        )}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${enq.status === 'New' ? 'bg-red-100 text-red-800' : enq.status === 'Contacted' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                          {enq.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1">
                        {enq.status !== 'Contacted' && (
                          <button
                            onClick={() => handleStatusChange(enq.id!, 'Contacted')}
                            className="px-2 py-1 bg-amber-600 text-white rounded text-[10px] font-semibold hover:bg-amber-700"
                          >
                            Mark Contacted
                          </button>
                        )}
                        {enq.status !== 'Closed' && (
                          <button
                            onClick={() => handleStatusChange(enq.id!, 'Closed')}
                            className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px] font-semibold hover:bg-emerald-700"
                          >
                            Close
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};
