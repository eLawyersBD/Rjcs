import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  Building2,
  Phone,
  ShieldCheck,
  Search,
  CheckCircle2,
  Navigation,
  Globe,
  Award,
  Layers,
  ArrowRight,
  Filter
} from 'lucide-react';

export interface ServiceHub {
  id: string;
  district: string;
  division: string;
  hubName: string;
  chamberType: 'Headquarters' | 'Regional Hub' | 'Industrial Desk';
  lat: number;
  lng: number;
  activeClients: number;
  address: string;
  phone: string;
  leadAdvocate: string;
  specialties: string[];
  rjscOfficeProximity: string;
}

export const BANGLADESH_HUBS: ServiceHub[] = [
  {
    id: 'dhaka-hq',
    district: 'Dhaka',
    division: 'Dhaka Division',
    hubName: 'Principal Chamber & RJSC HQ Desk',
    chamberType: 'Headquarters',
    lat: 23.8103,
    lng: 90.4125,
    activeClients: 185,
    address: '68/A Panthapath, Green Road, Dhaka-1205',
    phone: '+880 1711-223344',
    leadAdvocate: 'Adv. M. A. Rahman (Supreme Court of BD)',
    specialties: ['RJSC Company Incorporation', 'Form XV Capital Expansion', 'BIDA FDI Clearance', 'Trademark & IP'],
    rjscOfficeProximity: 'Direct Walk-in to RJSC Head Office (Kawran Bazar)'
  },
  {
    id: 'gazipur-hub',
    district: 'Gazipur',
    division: 'Dhaka Division',
    hubName: 'RMG & Industrial Zone Compliance Desk',
    chamberType: 'Industrial Desk',
    lat: 24.0023,
    lng: 90.4221,
    activeClients: 42,
    address: 'Chow रास्ते, Board Bazar, Gazipur Sadar',
    phone: '+880 1822-334455',
    leadAdvocate: 'Adv. S. H. Chowdhury',
    specialties: ['Factory Statutory Compliance', 'Labour Law & Safety', 'Company Annual Returns', 'Trade License'],
    rjscOfficeProximity: 'Serviced by Dhaka HQ Division'
  },
  {
    id: 'narayanganj-hub',
    district: 'Narayanganj',
    division: 'Dhaka Division',
    hubName: 'River Port & Logistics Enterprise Hub',
    chamberType: 'Industrial Desk',
    lat: 23.6238,
    lng: 90.5000,
    activeClients: 28,
    address: 'BB Road, Chashara, Narayanganj',
    phone: '+880 1933-445566',
    leadAdvocate: 'Adv. K. Z. Hasan',
    specialties: ['Inland Logistics Corporate Setup', 'Shareholder Disputes', 'RJSC Form XII Filings'],
    rjscOfficeProximity: 'Serviced by Dhaka HQ Division'
  },
  {
    id: 'chattogram-hub',
    district: 'Chattogram',
    division: 'Chattogram Division',
    hubName: 'Port City Regional Chamber & Maritime Desk',
    chamberType: 'Regional Hub',
    lat: 22.3569,
    lng: 91.7832,
    activeClients: 64,
    address: 'Agrabad Commercial Area, Chattogram-4100',
    phone: '+880 1744-556677',
    leadAdvocate: 'Adv. Tariqul Islam (Chittagong Bar)',
    specialties: ['Customs & Import/Export Licensing', 'Foreign Joint Ventures', 'Customs Bonded Warehouse'],
    rjscOfficeProximity: 'Direct Liaison with RJSC Chattogram Regional Office'
  },
  {
    id: 'sylhet-hub',
    district: 'Sylhet',
    division: 'Sylhet Division',
    hubName: 'NRI & Foreign Investment Legal Desk',
    chamberType: 'Regional Hub',
    lat: 24.8949,
    lng: 91.8687,
    activeClients: 35,
    address: 'Zindabazar, Sylhet Sadar, Sylhet',
    phone: '+880 1855-667788',
    leadAdvocate: 'Adv. Farhana Ahmed',
    specialties: ['Non-Resident Bangladeshi (NRB) Corporate Setup', 'Foreign Currency Inward Remittance', 'Property & Power of Attorney'],
    rjscOfficeProximity: 'Serviced by RJSC Sylhet Liaison Point'
  },
  {
    id: 'rajshahi-hub',
    district: 'Rajshahi',
    division: 'Rajshahi Division',
    hubName: 'North Bengal Agro & Tech Corporate Hub',
    chamberType: 'Regional Hub',
    lat: 24.3745,
    lng: 88.6042,
    activeClients: 19,
    address: 'Saheb Bazar, Rajshahi-6000',
    phone: '+880 1966-778899',
    leadAdvocate: 'Adv. Dr. N. U. Mahmud',
    specialties: ['Agro-Processing Corporate Structure', 'OPC Registration', 'Partnership to Private Limited Conversion'],
    rjscOfficeProximity: 'Direct Liaison with RJSC Rajshahi Regional Office'
  },
  {
    id: 'khulna-hub',
    district: 'Khulna',
    division: 'Khulna Division',
    hubName: 'South-West EPZ & Export Compliance Desk',
    chamberType: 'Regional Hub',
    lat: 22.8456,
    lng: 89.5403,
    activeClients: 22,
    address: 'KDA Avenue, Royal Moor, Khulna',
    phone: '+880 1777-889900',
    leadAdvocate: 'Adv. B. C. Roy',
    specialties: ['EPZ Unit Incorporation', 'Mongla Port Legal Filings', 'Environmental Compliance Approval'],
    rjscOfficeProximity: 'Direct Liaison with RJSC Khulna Regional Office'
  },
  {
    id: 'barishal-hub',
    district: 'Barishal',
    division: 'Barishal Division',
    hubName: 'Southern Maritime & Business Desk',
    chamberType: 'Industrial Desk',
    lat: 22.7010,
    lng: 90.3535,
    activeClients: 14,
    address: 'Sadat Alley, Sadar Road, Barishal',
    phone: '+880 1888-990011',
    leadAdvocate: 'Adv. S. K. Sarkar',
    specialties: ['Shipbuilding & Launch Corporate Setup', 'Local Business Incorporation', 'Annual Return Compliance'],
    rjscOfficeProximity: 'Serviced by Khulna/Dhaka Regional Desk'
  },
  {
    id: 'rangpur-hub',
    district: 'Rangpur',
    division: 'Rangpur Division',
    hubName: 'Northern Industrial & Textile Desk',
    chamberType: 'Industrial Desk',
    lat: 25.7439,
    lng: 89.2752,
    activeClients: 12,
    address: 'Station Road, Rangpur Sadar',
    phone: '+880 1999-001122',
    leadAdvocate: 'Adv. M. H. Kabir',
    specialties: ['Cold Storage & Seed Business Setup', 'Private Limited Registration', 'Taxation & VAT'],
    rjscOfficeProximity: 'Serviced by Rajshahi Regional Liaison'
  },
  {
    id: 'mymensingh-hub',
    district: 'Mymensingh',
    division: 'Mymensingh Division',
    hubName: 'Central Agro-Tech & Edu Enterprise Desk',
    chamberType: 'Industrial Desk',
    lat: 24.7471,
    lng: 90.4203,
    activeClients: 16,
    address: 'Town Hall Road, Mymensingh Sadar',
    phone: '+880 1700-112233',
    leadAdvocate: 'Adv. R. K. Dutta',
    specialties: ['Fisheries & Dairy Enterprise Setup', 'Social Enterprise & Foundation Registration', 'RJSC Amendments'],
    rjscOfficeProximity: 'Serviced by Dhaka Head Chamber'
  },
  {
    id: 'coxsbazar-hub',
    district: 'Cox\'s Bazar',
    division: 'Chattogram Division',
    hubName: 'Hospitality & Tourism Corporate Desk',
    chamberType: 'Industrial Desk',
    lat: 21.4272,
    lng: 92.0058,
    activeClients: 18,
    address: 'Main Road, Hotel Motel Zone, Cox\'s Bazar',
    phone: '+880 1811-223344',
    leadAdvocate: 'Adv. A. B. Siddique',
    specialties: ['Hotel & Resort Corporate Incorporation', 'Tourism Board Licensing', 'Foreign Investment in Hospitality'],
    rjscOfficeProximity: 'Serviced by Chattogram Regional Hub'
  }
];

// Helper component to re-center Leaflet Map smoothly when selected hub changes
const MapController: React.FC<{ targetLat: number; targetLng: number; zoom?: number }> = ({
  targetLat,
  targetLng,
  zoom = 8
}) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([targetLat, targetLng], zoom, { duration: 1.2 });
  }, [targetLat, targetLng, zoom, map]);
  return null;
};

// Custom Leaflet DivIcon generator
const createCustomIcon = (isHq: boolean, isSelected: boolean) => {
  const bgColor = isHq ? '#f59e0b' : isSelected ? '#3b82f6' : '#1e293b';
  const borderColor = isHq ? '#ffffff' : isSelected ? '#60a5fa' : '#f59e0b';
  const size = isHq ? 32 : 26;

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${bgColor};
        border: 2px solid ${borderColor};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 15px ${isHq ? 'rgba(245, 158, 11, 0.6)' : 'rgba(0,0,0,0.5)'};
        cursor: pointer;
        transition: transform 0.2s ease;
      ">
        <div style="
          width: ${size / 2.5}px;
          height: ${size / 2.5}px;
          background-color: #ffffff;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
};

interface CoverageMapProps {
  onOpenConsultation?: (serviceTitle?: string) => void;
}

export const CoverageMap: React.FC<CoverageMapProps> = ({ onOpenConsultation }) => {
  const [selectedHub, setSelectedHub] = useState<ServiceHub>(BANGLADESH_HUBS[0]);
  const [searchFilter, setSearchFilter] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredHubs = BANGLADESH_HUBS.filter((hub) => {
    const matchesSearch =
      hub.district.toLowerCase().includes(searchFilter.toLowerCase()) ||
      hub.division.toLowerCase().includes(searchFilter.toLowerCase()) ||
      hub.hubName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      hub.specialties.some((s) => s.toLowerCase().includes(searchFilter.toLowerCase()));
    const matchesType =
      filterType === 'all' ||
      (filterType === 'hq' && hub.chamberType === 'Headquarters') ||
      (filterType === 'regional' && hub.chamberType === 'Regional Hub') ||
      (filterType === 'industrial' && hub.chamberType === 'Industrial Desk');
    return matchesSearch && matchesType;
  });

  return (
    <section id="coverage-map" className="py-20 bg-slate-950 text-white relative border-b border-slate-800">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Globe className="w-4 h-4 text-amber-400" />
            <span>Nationwide Bangladesh Legal Network</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white">
            Serving All 64 Districts Across Bangladesh
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            From the <span className="text-amber-400 font-semibold">RJSC Head Office in Kawran Bazar, Dhaka</span> to regional chambers in Chattogram, Sylhet, and Khulna — our lawyers provide seamless local and online statutory representation.
          </p>
        </div>

        {/* Coverage Statistics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 p-2 border-r border-slate-800/80 last:border-r-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white font-serif">64 Districts</div>
              <div className="text-[11px] text-slate-400">Full Nationwide Legal Coverage</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 border-r border-slate-800/80 last:border-r-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-amber-400 font-serif">11 Hubs</div>
              <div className="text-[11px] text-slate-400">Regional Chambers & EPZ Desks</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 border-r border-slate-800/80 last:border-r-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-emerald-400 font-serif">4 RJSC Zones</div>
              <div className="text-[11px] text-slate-400">Direct Filing Proximity</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-blue-300 font-serif">24/7 Helpline</div>
              <div className="text-[11px] text-slate-400">+880 1711-223344</div>
            </div>
          </div>
        </div>

        {/* MAP & INTERACTIVE SIDEBAR WRAPPER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden">
          
          {/* Left Sidebar: Filterable District Hub List */}
          <div className="lg:col-span-5 space-y-4 flex flex-col h-[520px]">
            <div className="space-y-3 shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>Regional Service Hubs</span>
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  Showing {filteredHubs.length} Locations
                </span>
              </div>

              {/* Search Box */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search district, division or service..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
                {[
                  { id: 'all', label: 'All Locations' },
                  { id: 'hq', label: 'HQ' },
                  { id: 'regional', label: 'Regional Hubs' },
                  { id: 'industrial', label: 'Industrial Desks' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setFilterType(t.id)}
                    className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      filterType === t.id
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Hub List */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1.5 scrollbar-thin scrollbar-thumb-slate-800">
              {filteredHubs.map((hub) => {
                const isSelected = selectedHub.id === hub.id;
                return (
                  <div
                    key={hub.id}
                    onClick={() => setSelectedHub(hub)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-950'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white font-serif">{hub.district}</span>
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                              hub.chamberType === 'Headquarters'
                                ? 'bg-amber-500 text-slate-950'
                                : hub.chamberType === 'Regional Hub'
                                ? 'bg-blue-900 text-blue-200 border border-blue-700'
                                : 'bg-slate-800 text-slate-300 border border-slate-700'
                            }`}
                          >
                            {hub.chamberType}
                          </span>
                        </div>
                        <p className="text-[11px] text-amber-400 font-medium mt-0.5">{hub.hubName}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                          {hub.activeClients} Active Clients
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-2 line-clamp-1">
                      <MapPin className="w-3 h-3 text-amber-400 inline mr-1" />
                      {hub.address}
                    </p>
                  </div>
                );
              })}

              {filteredHubs.length === 0 && (
                <div className="text-center py-10 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-400">
                  No regional hubs match your search term.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: React Leaflet Map Container */}
          <div className="lg:col-span-7 h-[520px] rounded-2xl overflow-hidden border border-slate-800 relative z-0 shadow-inner">
            <MapContainer
              center={[selectedHub.lat, selectedHub.lng]}
              zoom={7}
              scrollWheelZoom={false}
              className="w-full h-full"
              style={{ background: '#090d16' }}
            >
              {/* Fly to controller */}
              <MapController targetLat={selectedHub.lat} targetLng={selectedHub.lng} zoom={selectedHub.chamberType === 'Headquarters' ? 9 : 8} />

              {/* Dark Styled Tile Layer */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />

              {/* Pulsing Radius Circle around Bangladesh Center / HQ */}
              <CircleMarker
                center={[23.8103, 90.4125]}
                radius={35}
                pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.15, weight: 1.5, dashArray: '4,4' }}
              />

              {/* Render Markers for each Hub */}
              {BANGLADESH_HUBS.map((hub) => {
                const isSelected = selectedHub.id === hub.id;
                const isHq = hub.chamberType === 'Headquarters';

                return (
                  <Marker
                    key={hub.id}
                    position={[hub.lat, hub.lng]}
                    icon={createCustomIcon(isHq, isSelected)}
                    eventHandlers={{
                      click: () => setSelectedHub(hub)
                    }}
                  >
                    <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                      <div className="text-xs font-bold text-slate-900 font-serif">
                        {hub.district} ({hub.chamberType})
                      </div>
                      <div className="text-[10px] text-amber-700 font-medium">
                        {hub.hubName}
                      </div>
                    </Tooltip>

                    <Popup className="custom-leaflet-popup">
                      <div className="p-1 space-y-2 text-slate-900 max-w-xs font-sans">
                        <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-1.5">
                          <div>
                            <h4 className="text-xs font-bold font-serif text-slate-900">{hub.district} Hub</h4>
                            <p className="text-[10px] text-amber-700 font-semibold">{hub.hubName}</p>
                          </div>
                          <span className="bg-amber-500 text-slate-950 font-bold text-[9px] px-1.5 py-0.5 rounded uppercase">
                            {hub.chamberType}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-600 leading-tight">
                          <strong>Address:</strong> {hub.address}
                        </p>

                        <div className="text-[11px] text-slate-700 bg-amber-50 p-1.5 rounded border border-amber-200">
                          <strong>Lead Lawyer:</strong> {hub.leadAdvocate}
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-slate-800 uppercase block">Primary Services:</span>
                          <div className="flex flex-wrap gap-1">
                            {hub.specialties.map((s, idx) => (
                              <span key={idx} className="bg-slate-100 text-slate-700 border border-slate-200 text-[9px] px-1.5 py-0.5 rounded">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onOpenConsultation?.(`Legal Consultation in ${hub.district} (${hub.hubName})`)}
                          className="w-full mt-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-1.5 rounded shadow-sm flex items-center justify-center gap-1 transition-all"
                        >
                          <span>Consult in {hub.district}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>

            {/* Selected Hub Floating Infobox overlay on map */}
            <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md border border-slate-800 p-3.5 rounded-2xl z-[1000] text-xs space-y-2 shadow-2xl">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="font-bold text-white font-serif">{selectedHub.district} Service Hub</span>
                  <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                    {selectedHub.chamberType}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenConsultation?.(`Consultation in ${selectedHub.district}`)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1 rounded-lg text-[11px] shadow transition-all flex items-center gap-1 shrink-0"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1 border-t border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[10px]">Office Address:</span>
                  <span className="font-medium text-white">{selectedHub.address}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">RJSC Proximity:</span>
                  <span className="font-semibold text-emerald-400">{selectedHub.rjscOfficeProximity}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
