import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Edit3, Save, Check, Upload, FileText, Image as ImageIcon } from 'lucide-react';
import { getProducts, saveProduct, deleteProduct } from '../services/products.service';
import { getCategories, saveCategory, deleteCategory } from '../services/categories.service';
import { getBrands, saveBrand, deleteBrand } from '../services/brands.service';
import { getProjects, saveProject, deleteProject } from '../services/projects.service';
import { getDocuments, saveDocument, deleteDocument } from '../services/documents.service';
import { uploadFile } from '../services/storage.service';
import { Product, Category, Brand, Project, DocumentItem } from '../types';

export const AdminCRUD: React.FC = () => {
  const { entity } = useParams<{ entity: string }>();
  const navigate = useNavigate();

  const [items, setItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    loadEntityData();
  }, [entity]);

  const loadEntityData = async () => {
    setEditingItem(null);
    if (entity === 'products') {
      setItems(await getProducts(false));
    } else if (entity === 'categories') {
      setItems(await getCategories(false));
    } else if (entity === 'brands') {
      setItems(await getBrands(false));
    } else if (entity === 'projects') {
      setItems(await getProjects(false));
    } else if (entity === 'documents') {
      setItems(await getDocuments(false));
    }
  };

  const handleSlugGen = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleCreateNew = () => {
    setIsNew(true);
    if (entity === 'products') {
      setEditingItem({ name: '', slug: '', categoryName: 'Fasteners & Bolting Systems', shortDescription: '', description: '', featuredImage: '', specifications: [{ key: 'Material', value: 'High Tensile Steel' }], published: true, featured: false, sortOrder: 1 });
    } else if (entity === 'categories') {
      setEditingItem({ name: '', slug: '', description: '', image: '', published: true, sortOrder: 1 });
    } else if (entity === 'brands') {
      setEditingItem({ name: '', logo: '', description: '', published: true, sortOrder: 1 });
    } else if (entity === 'projects') {
      setEditingItem({ title: '', slug: '', industry: 'Infrastructure', location: '', year: '2026', shortResult: '', challenge: '', solution: '', outcome: '', heroImage: '', published: true });
    } else if (entity === 'documents') {
      setEditingItem({ title: '', category: 'Technical Documents', fileUrl: '', fileType: 'PDF', size: '1.2 MB', published: true });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (entity === 'products') {
      await saveProduct(editingItem);
    } else if (entity === 'categories') {
      await saveCategory(editingItem);
    } else if (entity === 'brands') {
      await saveBrand(editingItem);
    } else if (entity === 'projects') {
      await saveProject(editingItem);
    } else if (entity === 'documents') {
      await saveDocument(editingItem);
    }

    setEditingItem(null);
    loadEntityData();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    if (entity === 'products') await deleteProduct(id);
    else if (entity === 'categories') await deleteCategory(id);
    else if (entity === 'brands') await deleteBrand(id);
    else if (entity === 'projects') await deleteProject(id);
    else if (entity === 'documents') await deleteDocument(id);
    loadEntityData();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string, folder: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadFile(file, folder, (progress) => setUploadProgress(progress));
      setEditingItem((prev: any) => ({ ...prev, [field]: url }));
      setUploading(false);
    } catch (err: any) {
      alert(err.message || 'File upload failed');
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-industrial-light p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-6 rounded-lg border border-industrial-border shadow-subtle">
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="p-2 rounded hover:bg-gray-100 text-industrial-dark">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold uppercase tracking-tight text-industrial-dark">Manage {entity}</h1>
              <p className="text-xs text-industrial-muted">Create, edit, or delete items in this Firestore collection</p>
            </div>
          </div>

          <button
            onClick={handleCreateNew}
            className="px-4 py-2 bg-industrial-orange hover:bg-industrial-orange-hover text-white text-xs font-bold rounded flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add New {entity?.slice(0, -1)}</span>
          </button>
        </div>

        {/* Edit / Create Form Modal */}
        {editingItem && (
          <div className="bg-white p-6 rounded-lg border border-industrial-orange shadow-elevated">
            <h2 className="text-base font-bold text-industrial-dark mb-4 border-b border-industrial-border pb-2">
              {isNew ? 'Create New Record' : 'Edit Record'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-industrial-dark uppercase tracking-wider mb-1">Title / Name *</label>
                <input
                  type="text"
                  required
                  value={editingItem.name || editingItem.title || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    const slug = handleSlugGen(val);
                    setEditingItem({ ...editingItem, name: val, title: val, slug });
                  }}
                  className="w-full px-3 py-2 border border-industrial-border rounded focus:outline-none"
                />
              </div>

              {editingItem.slug !== undefined && (
                <div>
                  <label className="block font-bold text-industrial-dark uppercase tracking-wider mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={editingItem.slug}
                    onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-industrial-border rounded focus:outline-none font-mono"
                  />
                </div>
              )}

              {/* Upload Image / Document */}
              <div>
                <label className="block font-bold text-industrial-dark uppercase tracking-wider mb-1">Image / File URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingItem.featuredImage || editingItem.image || editingItem.heroImage || editingItem.fileUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, featuredImage: e.target.value, image: e.target.value, heroImage: e.target.value, fileUrl: e.target.value })}
                    className="flex-1 px-3 py-2 border border-industrial-border rounded focus:outline-none"
                  />
                  <label className="px-3 py-2 bg-industrial-dark text-white rounded font-bold cursor-pointer hover:bg-industrial-slate flex items-center">
                    <Upload className="w-3.5 h-3.5 mr-1" />
                    <span>Upload File</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, entity === 'documents' ? 'fileUrl' : 'featuredImage', entity as any)}
                    />
                  </label>
                </div>
                {uploading && <div className="text-[11px] text-industrial-orange mt-1">Uploading... {uploadProgress.toFixed(0)}%</div>}
              </div>

              {editingItem.shortDescription !== undefined && (
                <div>
                  <label className="block font-bold text-industrial-dark uppercase tracking-wider mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    value={editingItem.shortDescription}
                    onChange={(e) => setEditingItem({ ...editingItem, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-industrial-border rounded focus:outline-none"
                  ></textarea>
                </div>
              )}

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer font-bold text-industrial-dark">
                  <input
                    type="checkbox"
                    checked={editingItem.published}
                    onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                    className="rounded text-industrial-orange"
                  />
                  <span>Published on Public Website</span>
                </label>
              </div>

              <div className="flex space-x-2 pt-4 border-t border-industrial-border">
                <button type="submit" className="px-5 py-2 bg-industrial-orange text-white font-bold rounded hover:bg-industrial-orange-hover">
                  Save Changes
                </button>
                <button type="button" onClick={() => setEditingItem(null)} className="px-4 py-2 bg-gray-200 text-industrial-dark font-bold rounded">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Existing Items Table */}
        <div className="bg-white rounded-lg border border-industrial-border shadow-subtle p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-industrial-light text-industrial-dark uppercase font-bold border-b border-industrial-border">
                <tr>
                  <th className="p-3">Title / Name</th>
                  <th className="p-3">Slug</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-industrial-border">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-3 font-bold text-industrial-dark">{item.name || item.title}</td>
                    <td className="p-3 font-mono text-gray-500">{item.slug || item.id}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.published ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}>
                        {item.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => { setIsNew(false); setEditingItem(item); }}
                        className="p-1.5 text-industrial-dark hover:text-industrial-orange"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.name || item.title)}
                        className="p-1.5 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
