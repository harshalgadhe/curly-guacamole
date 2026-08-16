import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, Lock, ExternalLink } from 'lucide-react';
import { SiteSettings } from '../../types';

interface FooterProps {
  settings: SiteSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  return (
    <footer className="bg-industrial-dark text-white border-t border-industrial-slate">
      {/* Top Banner */}
      <div className="bg-industrial-slate py-8 px-4 border-b border-industrial-steel">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Need technical product selection or bulk procurement support?</h3>
            <p className="text-xs text-gray-400 mt-1">Our sales engineering team provides mill certificates, sample testing, and site delivery quotes.</p>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center px-4 py-2.5 rounded text-sm font-bold bg-white text-industrial-dark hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2 text-industrial-orange" />
              Call {settings.phone}
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center px-4 py-2.5 rounded text-sm font-bold bg-industrial-orange text-white hover:bg-industrial-orange-hover transition-colors"
            >
              Request Project Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Column 1: Company Profile */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-industrial-orange rounded flex items-center justify-center font-black text-white text-lg">
              A
            </div>
            <span className="text-lg font-black tracking-tight text-white">APEX INDUSTRIAL</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
            {settings.footerDescription}
          </p>
          <div className="pt-2 text-xs space-y-2 text-gray-300">
            <div className="flex items-start">
              <MapPin className="w-4 h-4 text-industrial-orange mr-2 shrink-0 mt-0.5" />
              <span>{settings.address}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 text-industrial-orange mr-2 shrink-0" />
              <span>{settings.phone} {settings.altPhone ? `/ ${settings.altPhone}` : ''}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-industrial-orange mr-2 shrink-0" />
              <span>{settings.email}</span>
            </div>
          </div>
        </div>

        {/* Column 2: Products & Catalog */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-industrial-orange mb-4">Product Families</h4>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li><Link to="/products?category=fasteners-bolting-systems" className="hover:text-white transition-colors">Fasteners & Bolting</Link></li>
            <li><Link to="/products?category=power-tools-machinery" className="hover:text-white transition-colors">Power Tools & Machinery</Link></li>
            <li><Link to="/products?category=structural-anchors-fixing" className="hover:text-white transition-colors">Structural Anchors & Resin</Link></li>
            <li><Link to="/products?category=precision-hand-tools" className="hover:text-white transition-colors">Precision Hand Tools</Link></li>
            <li><Link to="/products?category=safety-equipment-ppe" className="hover:text-white transition-colors">Safety Equipment & PPE</Link></li>
            <li><Link to="/products?category=cutting-grinding-abrasives" className="hover:text-white transition-colors">Cutting & Abrasive Wheels</Link></li>
            <li><Link to="/products" className="text-industrial-orange hover:underline font-semibold mt-1 inline-block">View Full Catalog →</Link></li>
          </ul>
        </div>

        {/* Column 3: Corporate & Sectors */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-industrial-orange mb-4">Corporate & Sectors</h4>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li><Link to="/about" className="hover:text-white transition-colors">About Apex Industrial</Link></li>
            <li><Link to="/industries" className="hover:text-white transition-colors">Industries Served</Link></li>
            <li><Link to="/capabilities" className="hover:text-white transition-colors">Bulk Procurement Services</Link></li>
            <li><Link to="/infrastructure" className="hover:text-white transition-colors">Warehouse & Facilities</Link></li>
            <li><Link to="/quality" className="hover:text-white transition-colors">Quality Assurance Policy</Link></li>
            <li><Link to="/projects" className="hover:text-white transition-colors">Case Studies & Projects</Link></li>
          </ul>
        </div>

        {/* Column 4: Resources & Compliance */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-industrial-orange mb-4">Resources & Approvals</h4>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li><Link to="/resources/documents" className="hover:text-white transition-colors">Document Center</Link></li>
            <li><Link to="/resources/documents" className="hover:text-white transition-colors">ISO 9001:2015 Certifications</Link></li>
            <li><Link to="/gallery" className="hover:text-white transition-colors">Warehouse Media Gallery</Link></li>
            <li><Link to="/insights" className="hover:text-white transition-colors">Technical Insights Blog</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Sales Engineering</Link></li>
          </ul>
          <div className="mt-6 pt-4 border-t border-industrial-slate">
            <Link
              to="/admin/login"
              className="text-[11px] text-gray-400 hover:text-industrial-orange transition-colors inline-flex items-center"
            >
              <Lock className="w-3 h-3 mr-1" /> Admin CMS Login
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-industrial-slate py-6 px-4 bg-black/40 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>{settings.copyrightText}</div>
          <div className="flex items-center space-x-6">
            <span className="inline-flex items-center text-[11px] text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mr-1" /> Verified B2B Hardware Supplier
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
