import React from 'react';
import Logo from './Logo.tsx';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-950 pt-24 pb-12 px-6 border-t border-slate-900 text-slate-400">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6 text-white">
              <Logo className="h-8 text-white w-auto" />
            </div>
            <p className="text-sm mb-6 max-w-xs">
              Safe and efficient transport of liquid chemicals in Europe. Engineering the future of hazardous logistics.
            </p>
            <div className="text-[10px] text-slate-600 font-mono space-y-1 uppercase tracking-wider">
              <div>NIP: PL 5272918890</div>
              <div>REGON: 38543925200000</div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-mono text-xs uppercase mb-6 tracking-widest">Coordinates</h4>
            <address className="not-italic text-sm space-y-2">
              <p>Ul. Prosta 70/5p</p>
              <p>00-838, Warsaw</p>
              <p>Poland</p>
            </address>
          </div>

          <div>
            <h4 className="text-white font-mono text-xs uppercase mb-6 tracking-widest">Comm_Link</h4>
            <div className="text-sm space-y-2">
              <p>
                <a href="tel:+48570174577" className="hover:text-emerald-500 transition-colors">+48 570 174 577</a>
              </p>
              <p>
                <a href="mailto:hello@chemmio.com" className="hover:text-emerald-500 transition-colors">hello@chemmio.com</a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-mono text-xs uppercase mb-6 tracking-widest">Initialize Request</h4>
            <form className="flex flex-col gap-3">
               <input 
                 type="email" 
                 placeholder="EMAIL_ADDRESS" 
                 className="bg-slate-900 border border-slate-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono placeholder:text-slate-700"
               />
               <button className="bg-emerald-600 text-white px-4 py-3 text-xs font-mono font-bold hover:bg-emerald-500 transition-colors uppercase tracking-widest">
                 Send Transmission
               </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-900 text-[10px] text-slate-600">
          <div className="flex gap-6 mb-4 md:mb-0 uppercase tracking-wider">
            <span>© 2024 Chemmio Sp. z o.o.</span>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
          <div className="font-mono">
            SYSTEM STATUS: <span className="text-emerald-500">ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;