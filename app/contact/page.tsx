import { Mail, MessageSquare, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          <div>
            <h1 className="text-6xl font-black text-slate-900 mb-8">Let's build<br/> something <span className="text-orange-600">tasty</span>.</h1>
            <p className="text-xl text-slate-500 mb-12">Got a recipe inquiry, partnership proposal, or feedback? We are here to help you grow your cooking journey.</p>
            
            <div className="space-y-6">
              {[
                { icon: Mail, title: "Support", value: "hello@freshify.com" },
                { icon: MessageSquare, title: "Chat", value: "Join our discord channel" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 p-6 rounded-3xl bg-slate-50 hover:bg-orange-50 transition-all cursor-pointer group">
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white text-orange-600 shadow-sm">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.title}</p>
                    <p className="font-bold text-slate-900 text-lg">{item.value}</p>
                  </div>
                  <ArrowRight className="ml-auto text-slate-300 group-hover:text-orange-600" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-12 rounded-sm text-white">
            <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="w-full p-4 rounded-2xl bg-slate-800 border-none focus:ring-2 focus:ring-orange-500" />
                <input type="text" placeholder="Last Name" className="w-full p-4 rounded-2xl bg-slate-800 border-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full p-4 rounded-2xl bg-slate-800 border-none focus:ring-2 focus:ring-orange-500" />
              <select className="w-full p-4 rounded-2xl bg-slate-800 border-none focus:ring-2 focus:ring-orange-500">
                <option>General Inquiry</option>
                <option>Partnership</option>
                <option>Bug Report</option>
              </select>
              <textarea placeholder="Tell us how we can help..." rows={5} className="w-full p-4 rounded-2xl bg-slate-800 border-none focus:ring-2 focus:ring-orange-500 resize-none" />
              <button className="w-full bg-orange-600 text-white font-black py-5 rounded-2xl hover:bg-orange-700 transition-all text-sm shadow-xl cursor-pointer">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}