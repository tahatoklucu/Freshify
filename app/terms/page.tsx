export default function TermsOfService() {
    return (
      <main className="min-h-screen bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black text-slate-900 mb-12">Terms of Service</h1>
          
          <div className="space-y-10 text-slate-600">
            <div className="border-l-4 border-orange-500 pl-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">1. Account Responsibility</h3>
              <p>By creating an account, you agree to maintain the security of your password and accept full responsibility for all activities that occur under your account.</p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">2. Intellectual Property</h3>
              <p>Freshify respects the creativity of its users. You retain full ownership of the recipes you post. By sharing content, you grant Freshify a non-exclusive license to display, distribute, and promote your work within our platform.</p>
            </div>
  
            <div className="border-l-4 border-orange-500 pl-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">3. Community Conduct</h3>
              <p>We foster a supportive environment. Harassment, hate speech, or the distribution of malicious software is strictly prohibited and will result in immediate account termination.</p>
            </div>
          </div>
        </div>
      </main>
    );
  }